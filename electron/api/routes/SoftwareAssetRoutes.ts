import { Request, Response } from "express";
import { wrapper } from "..";

const express = require('express');
const mongo = require('mongodb');
const router = express.Router();

const DATABASE = "software";

// @ROUTE: GET api/assets/hardware/view-all
// @DESCRIPTION: Used for viewing all Software Assets.
router.get('/view-all', async (_: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);

        const data = await collection.find().toArray();
        res.json(data);
    })
});

// @ROUTE: GET api/assets/hardware/view-all
// @DESCRIPTION: Used for viewing all Software Assets.
router.get('/view-all/:id', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);
        const id = req.params.id;

        const data = await collection.find({ 'parent_hardware.id': new mongo.ObjectId(id) }).toArray();
        res.json(data);
    })
});

// @ROUTE: DELETE api/assets/hardware/delete-all
// @DESCRIPTION: Used for deleting a Software Asset.
router.delete('/delete-all', async (_: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);

        await collection.deleteMany({});
        res.send({ "status": true });
    })
});

// @ROUTE: GET api/assets/hardware/:id
// @DESCRIPTION: Used for getting a Software Asset.
router.get('/:id', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);
        const id = req.params.id;

        const data = await collection.findOne({ _id: new mongo.ObjectId(id) });

        res.json(data);
    })
});

// @ROUTE: DELETE api/assets/hardware/:id
// @DESCRIPTION: Used for deleting a Software Asset.
router.delete('/:id', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);
        const id = req.params.id;

        await collection.deleteOne({ _id: new mongo.ObjectId(id) });
        res.json({ "status": true });
    })
});

// @ROUTE: POST api/assets/hardware
// @DESCRIPTION: Used for creating a Software Asset.
router.post('/', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        console.log(req.body);
        const collection = db.collection(DATABASE);
        const { name, manufacturer, version, risk_level } = req.body;

        collection.insertOne({
            name,
            manufacturer,
            version,
            risk_level: risk_level ?? 'N/A',
            created_at: new Date().toISOString(),
            last_edit_at: new Date().toISOString()
        })

        res.send({ status: true })
    })
})

// @ROUTE: PATCH api/assets/hardware/:id
// @DESCRIPTION: Used for editing a Software Asset.
router.patch('/:id', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        console.log(req.body);
        const collection = db.collection(DATABASE);
        const id = req.params.id;
        const { name, manufacturer, version, riskLevel, created_at } = req.body;

        await collection.replaceOne({ _id: new mongo.ObjectId(id) }, {
            name,
            manufacturer,
            version,
            risk_level: riskLevel ?? 'N/A',
            created_at,
            last_edit_at: new Date().toISOString()
        }, { upsert: true });

        res.send({ status: true })
    })
})


export default router;