import { Request, Response } from "express";
import { wrapper } from "..";
import { APIResponse } from "../../../src/interfaces/APIRequests";
import { Collection } from "mongodb";

const express = require('express');
const mongo = require('mongodb');
const router = express.Router();

const DATABASE = "asset-links";

// @ROUTE: GET api/asset-links/
// @DESCRIPTION: Used for getting ALL Asset Links.
router.get('/', async (_: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection: Collection = db.collection(DATABASE);
        const resp = await collection.find({}).toArray();
        return res.send(resp);
    });
});

// @ROUTE: POST api/asset-links/
// @DESCRIPTION: Used for creating an Asset Link.
router.post('/', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        console.log('request got at PSOT asset-links/')
        const { hardware_id, software_id, date, created_by }: APIResponse.CreateAssetLink = req.body as APIResponse.CreateAssetLink;
        const collection: Collection = db.collection(DATABASE);

        const HardwareID = new mongo.ObjectId(hardware_id);
        const SoftwareID = new mongo.ObjectId(software_id)

        const isExisting = await collection.find({
            hardware_id: HardwareID,
            software_id: SoftwareID
        }).toArray()
        
        if (isExisting.length > 0) {
            return res.send({ status: false })
        }

        const _date = new Date(date);
        const resp = await collection.insertOne({
            hardware_id: HardwareID,
            software_id: SoftwareID,
            date: _date,
            created_by
        })

        if (resp.acknowledged) return res.send(resp);
        return res.send({ status: false })
    });
});

// @ROUTE: GET api/asset-links/hardware/:id
// @DESCRIPTION: Used for getting ALL Asset Links for a specific Hardware Asset.
router.get('/hardware/:id/get-all', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection: Collection = db.collection(DATABASE);
        const id = req.params.id;

        const resp = await collection.find({ hardware_id: new mongo.ObjectId(id) }).toArray();

        let resp_arr = [];
        for (const [i, link] of resp.entries()) {
            const subresp = await db.collection('software').findOne({ _id: link.software_id }) ?? undefined;
            resp_arr.push({
                software: subresp,
                link: resp[i]
            });
        }
        return res.json(resp_arr.filter(x => !!x));
    });
});

// @ROUTE: GET api/asset-links/hardware/:id
// @DESCRIPTION: Used for getting ALL Asset Links for a specific Hardware Asset.
router.get('/software/:id/get-all', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection: Collection = db.collection(DATABASE);
        const id = req.params.id;

        const resp = await collection.find({ software_id: new mongo.ObjectId(id) }).toArray();

        let resp_arr = [];
        for (const [i, link] of resp.entries()) {
            const subresp = await db.collection('hardware').findOne({ _id: link.hardware_id }) ?? undefined;
            resp_arr.push({
                hardware: subresp,
                link: resp[i]
            });
        }
        return res.json(resp_arr.filter(x => !!x));
    });
});
// @ROUTE: DELETE api/asset-links/hardware/:id
// @DESCRIPTION: Used for getting ALL Asset Links for a specific Hardware Asset.
router.delete('/hardware/:hwid/:swid', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        console.log('api response recieved!!!!', req.params.link_id)
        const collection: Collection = db.collection(DATABASE);
        const hwid = req.params.hwid;
        const swid = req.params.swid;

        const resp = await collection.deleteMany({
            hardware_id: new mongo.ObjectId(hwid),
            software_id: new mongo.ObjectId(swid)
        });
        console.log(resp);
        return res.json(resp);
    });
});

// @ROUTE: GET api/asset-links/hardware/:id
// @DESCRIPTION: Used for getting ALL Asset Links for a specific Software Asset.
router.get('/software/:id', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection: Collection = db.collection(DATABASE);
        const id = req.params.id;

        const resp = await collection.find({ software_id: new mongo.ObjectId(id) }).toArray();
        return res.send(resp);
    });
});

export default router;