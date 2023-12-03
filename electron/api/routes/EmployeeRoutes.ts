import { Request, Response } from "express";
import { wrapper } from "..";
import { APIResponse } from "../../../src/interfaces/APIRequests";

const express = require('express');
const mongo = require('mongodb');
const router = express.Router();
const bcrypt = require('bcrypt');

const DATABASE = "employees";

// @ROUTE: PSOT api/employees/login
// @DESCRIPTION: Used for viewing logging a user into the system.
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

// @ROUTE: PSOT api/employees/generate-password
// @DESCRIPTION: Used for generating a password.
router.post('/generate-password', async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    console.log(req.body);
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

// @ROUTE: GET api/employees/view-all
// @DESCRIPTION: Used for viewing all Employees.
router.get('/', async (_: Request, res: Response) => {
  await wrapper(async (db: any) => {
    const collection = db.collection('employees');

    const data = await collection.find().toArray();
    res.json(data);
  })
});

// @ROUTE: GET api/employees/:id
// @DESCRIPTION: Used for viewing an Employee.
router.get('/:id', async (req: Request, res: Response) => {
  await wrapper(async (db: any) => {
    const collection = db.collection(DATABASE);
    const id = req.params.id;

    const data = await collection.findOne({ _id: new mongo.ObjectId(id) });
    res.json(data);
  })
});

// @ROUTE: DELETE api/employees/:id
// @DESCRIPTION: Used for deleting an Employee.
router.delete('/:id', async (req: Request, res: Response) => {
  await wrapper(async (db: any) => {
    const collection = db.collection(DATABASE);
    const id = req.params.id;

    await collection.deleteOne({ _id: new mongo.ObjectId(id) });
    res.json({ "status": true });
  })
});

// @ROUTE: DELETE api/employees/
// @DESCRIPTION: Used for deleting all Employees.
router.delete('/', async (_: Request, res: Response) => {
  await wrapper(async (db: any) => {
    const collection = db.collection(DATABASE);

    await collection.deleteMany({ _id: { $ne: new mongo.ObjectId('655bf70f3ee93eb2c723dc9d') } });
    
    res.json({ "status": true });
  })
});

// @ROUTE: POST api/employees/
// @DESCRIPTION: Used for creating an Employee.
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
      return res.json({ status: false })
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
      res.json({ status: false });
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

// @ROUTE: PATCH api/employees/:id
// @DESCRIPTION: Used for editing an Employee.
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