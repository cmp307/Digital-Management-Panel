import { Request, Response } from "express";
import { wrapper } from "..";

const express = require('express');
const mongo = require('mongodb');
const router = express.Router();

const DATABASE = "assets";

// @ROUTE: GET api/assets/software/view-all
// @DESCRIPTION: Used for viewing all Software Assets.
router.get('/view-all', async (_: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);

        const data = await collection.find().toArray();
        res.json(data);
    })
});

// @ROUTE: GET api/assets/software/view-all
// @DESCRIPTION: Used for viewing all Software Assets.
router.get('/view-all/:id', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);
        const id = req.params.id;

        const data = await collection.find({ parent_employee: new mongo.ObjectId(id) }).toArray();
        res.json(data);
    })
});

// @ROUTE: DELETE api/assets/software/delete-all
// @DESCRIPTION: Used for deleting a Software Asset.
router.delete('/delete-all', async (_: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);

        await collection.deleteMany({});
        res.send({ "status": true });
    })
});

// @ROUTE: GET api/assets/software/:id
// @DESCRIPTION: Used for getting a Software Asset.
router.get('/:id', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);
        const id = req.params.id;

        const data = await collection.findOne({ _id: new mongo.ObjectId(id) });

        res.json(data);
    })
});

// @ROUTE: DELETE api/assets/software/:id
// @DESCRIPTION: Used for deleting a Software Asset.
router.delete('/:id', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);
        const id = req.params.id;

        await collection.deleteOne({ _id: new mongo.ObjectId(id) });
        res.json({ "status": true });
    })
});

// @ROUTE: POST api/assets/software
// @DESCRIPTION: Used for creating a Software Asset.
router.post('/', async (req: Request, _: Response) => {
    await wrapper(async (db: any) => {
        console.log(req.body);
        const collection = db.collection(DATABASE);
        const { name, type, model, manufacturer, ip, date, note, parent_employee } = req.body;
        const _employee = new mongo.ObjectId(parent_employee);

        collection.insertOne({
            name,
            type,
            model,
            manufacturer,
            ip,
            date,
            note,
            parent_employee: _employee
        })
    })
})

// @ROUTE: PATCH api/assets/software/:id
// @DESCRIPTION: Used for editing a Software Asset.
router.patch('/:id', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);
        const id = req.params.id;
        const { name, type, model, manufacturer, ip, date, note, parent_employee } = req.body;
        const _employee = new mongo.ObjectId(parent_employee);

        await collection.replaceOne({ _id: new mongo.ObjectId(id) }, {
            name,
            type,
            model,
            manufacturer,
            ip,
            date,
            note,
            parent_employee: _employee
        }, { upsert: true });

        res.send({ status: true })
    })
})


export default router;