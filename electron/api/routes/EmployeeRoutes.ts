import { Request, Response } from "express";
import { wrapper } from "..";
import { APIResponse } from "../../../src/interfaces/APIRequests";

const express = require('express');
const mongo = require('mongodb');
const router = express.Router();
const bcrypt = require('bcrypt');

const DATABASE = "employees";

// @ROUTE: GET api/assets/employees/login
// @DESCRIPTION: Used for viewing all Employees.
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

// @ROUTE: GET api/assets/employees/view-all
// @DESCRIPTION: Used for viewing all Employees.
router.get('/view-all', async (_: Request, res: Response) => {
  await wrapper(async (db: any) => {
    const collection = db.collection('employees');

    const data = await collection.find().toArray();
    res.json(data);
  })
});

// @ROUTE: GET api/assets/employees/:id
// @DESCRIPTION: Used for viewing an Employee.
router.get('/api/employee/:id', async (req: Request, res: Response) => {
  await wrapper(async (db: any) => {
    const collection = db.collection('employees');
    const id = req.params.id;

    const data = await collection.findOne({ _id: new mongo.ObjectId(id) });
    res.json(data);
  })
});

// @ROUTE: POST api/assets/employees/
// @DESCRIPTION: Used for creating an Employee.
router.post('/', async (req: Request, res: Response) => {
  await wrapper(async (db: any) => {

    const collection = db.collection('employees');
    const { forename, surname, department, password, confirmPassword }:APIResponse.CreateEmployee = req.query as any as APIResponse.CreateEmployee;

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

    collection.insertOne({
      forename,
      surname,
      department,
      email: `${forename[0]}.${surname}@scottishglen.co.uk`,
      password
    })
  })
});

export default router;