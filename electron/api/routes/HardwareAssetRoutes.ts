import { Request, Response } from "express";
import { wrapper } from "..";

const express = require('express');
const mongo = require('mongodb');
const router = express.Router();

const DATABASE = "hardware";
const LINK_COLLECTION_DATABASE = "asset-links";

const ipRegex = /\b(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b|\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b/;

router.get('/view-all', async (_: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);

        const data = await collection.find().toArray();
        res.json(data);
    })
});

router.get('/view-all/:id', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);
        const id = req.params.id;

        const data = await collection.find({ parent_employee: new mongo.ObjectId(id) }).toArray();
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

router.delete('/', async (_: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);

        await collection.deleteMany({});

        const _linkCollection = db.collection(LINK_COLLECTION_DATABASE);
        await _linkCollection.deleteMany({});
        res.send({ "status": true });
    })
});

router.delete('/delete-all/:id', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);
        const id = req.params.id;
        if(!id) return res.sendStatus(400);
        await collection.deleteMany({ parent_employee: new mongo.ObjectId(id) });

        const _linkCollection = db.collection(LINK_COLLECTION_DATABASE);
        await _linkCollection.deleteMany({});
        res.send({ "status": true });
    })
});

router.delete('/:id', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);
        const id = req.params.id;

        await collection.deleteOne({ _id: new mongo.ObjectId(id) });

        const _linkCollection = db.collection(LINK_COLLECTION_DATABASE);
        await _linkCollection.deleteMany({});
        res.json({ "status": true });
    })
});

router.post('/', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);
        const { name, type, model, manufacturer, ip, date, note, parent_employee } = req.body;
        const _employee = (parent_employee) ? new mongo.ObjectId(parent_employee) : undefined;

        const isFound = await collection.find({ name, model, manufacturer, ip }).toArray();
        if (isFound.length > 0) return res.send({ status: false });
        if (!ipRegex.test(ip)) return res.send({ status: false })

        const resp = await collection.insertOne({
            name,
            type,
            model,
            manufacturer,
            ip,
            date,
            note,
            parent_employee: _employee
        })

        return res.json({ status: true, id: resp.insertedId });
    })
})

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