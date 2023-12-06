import { Request, Response } from "express";
import { wrapper } from "..";
import { APIResponse } from "../../../src/interfaces/APIRequests";

const express = require('express');
const mongo = require('mongodb');
const router = express.Router();
const bcrypt = require('bcrypt');

const DATABASE = "employees";

router.get('/', async (_: Request, res: Response) => {
  await wrapper(async (db: any) => {
    const collection = db.collection('employees');

    const data = await collection.find().toArray();
    res.json(data);
  })
});

router.get('/:id', async (req: Request, res: Response) => {
  await wrapper(async (db: any) => {
    const collection = db.collection(DATABASE);
    const id = req.params.id;

    const data = await collection.findOne({ _id: new mongo.ObjectId(id) });
    res.json(data);
  })
});

router.delete('/:id', async (req: Request, res: Response) => {
  await wrapper(async (db: any) => {
    const collection = db.collection(DATABASE);
    const id = req.params.id;

    await collection.deleteOne({ _id: new mongo.ObjectId(id) });
    res.json({ "status": true });
  })
});

router.delete('/', async (_: Request, res: Response) => {
  await wrapper(async (db: any) => {
    const collection = db.collection(DATABASE);

    await collection.deleteMany({ _id: { $ne: new mongo.ObjectId('655bf70f3ee93eb2c723dc9d') } });

    res.json({ "status": true });
  })
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    await wrapper(async (db: any) => {
      const collection = db.collection(DATABASE);

      let body = undefined;
      if (req.body.email) { body = req.body; }
      else { body = JSON.parse(Object.keys(req.body)[0]); }

      const email = body.email;
      const password = body.password;
      if (!email || !password) throw new Error("Required fields not provided.");

      const data = await collection.findOne({ email });
      if (!data) throw new Error("User not found in database.");

      const crypt = await bcrypt.compare(password, data.password);
      if (!crypt) {
        res.status(400)
        return res.json({ status: false })
      }
      return res.json({ status: true, data })
    })
  } catch (error) {
    console.log(error);
    res.status(400);
    return res.json({ status: false })
  }
});

router.post('/generate-password', async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    if (!password) throw new Error("Required fields not provided.");

    const crypt = await bcrypt.hashSync(password, 10);
    if (!crypt) {
      res.status(400)
      return res.json({ status: false })
    }
    return res.json({ status: true, password: crypt })
  } catch (error) {
    console.log(error);
    res.status(400);
    return res.json({ status: false })
  }
});

router.post('/', async (req: Request, res: Response) => {
  await wrapper(async (db: any) => {

    const collection = db.collection(DATABASE);
    const { forename, surname, department, password, confirmPassword }: APIResponse.CreateEmployee = req.body as any as APIResponse.CreateEmployee;

    const isPasswordValid = (password == confirmPassword);
    if (
      !isPasswordValid ||
      !forename ||
      !surname ||
      !department
    ) {
      res.status(400)
      return res.json({ status: false, message: ['isvalid', isPasswordValid, 'forename', forename, 'surname', surname, 'department', department].join(' - ') })
    }

    const passwordRequest = await fetch('http://127.0.0.1:3001/api/employees/generate-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "password": password })
    })
      .then((res) => res.json())
    if (!passwordRequest) {
      res.status(500)
      res.json({ status: false, message: "Internal Error: Password generation request not successful" });
    }

    const resp = await collection.insertOne({
      forename,
      surname,
      department,
      email: `${forename[0]}.${surname}@scottishglen.co.uk`,
      password: passwordRequest.password
    })
    return res.json({ status: true, id: resp.insertedId })
  })
});

router.patch('/:id', async (req: Request, res: Response) => {
  await wrapper(async (db: any) => {
    const collection = db.collection(DATABASE);
    const id = req.params.id;
    const { forename, surname, department } = req.body;

    await collection.updateOne({ _id: new mongo.ObjectId(id) }, {
      $set: {
        forename,
        surname,
        department,
        email: `${forename[0]}.${surname}@scottishglen.co.uk`
      }
    });

    res.send({ status: true })
  })
})

export default router;