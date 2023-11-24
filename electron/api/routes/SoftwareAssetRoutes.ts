import { Request, Response } from "express";
import { wrapper } from "..";
import { SoftwareAsset } from "../../../src/components/assets/software/SoftwareAsset";

const express = require('express');
const mongo = require('mongodb');
const router = express.Router();

const DATABASE = "software";
const LINK_COLLECTION_DATABASE = "asset-links";

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
router.delete('/', async (_: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);

        await collection.deleteMany({});

        const _linkCollection = db.collection(LINK_COLLECTION_DATABASE);
        await _linkCollection.deleteMany({});
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

// @ROUTE: GET api/assets/hardware/:id
// @DESCRIPTION: Used for getting a Software Asset.
router.get('/:id/scan', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        try {
            const software_collection = db.collection(DATABASE);
            const id = req.params.id;

            const softwareAssetRes = await software_collection.findOne({ _id: new mongo.ObjectId(id) });
            if (!softwareAssetRes) return res.json({ status: false });
            const softwareAsset = new SoftwareAsset(softwareAssetRes);

            let manufacturer = softwareAsset.manufacturer.toLowerCase()
            let name = softwareAsset.name.toLowerCase();
            let version = softwareAsset.version.toLowerCase();

            const criticalURL = `https://services.nvd.nist.gov/rest/json/cves/2.0?cpeName=cpe:2.3:o:${manufacturer.toLowerCase().replace(' ', '_')}:${name.replace(' ', '_')}:${version}&cvssV3Severity=CRITICAL&isVulnerable`;
            const highURL = `https://services.nvd.nist.gov/rest/json/cves/2.0?cpeName=cpe:2.3:o:${manufacturer.toLowerCase().replace(' ', '_')}:${name.replace(' ', '_')}:${version}&cvssV3Severity=HIGH&isVulnerable`;

            console.log('Fetching NVD Response');
            const [criticalResponse, highResponse] = await Promise.all<any>([
                fetch(criticalURL, {
                    headers: {
                        apiKey: '09e94129-a4f0-402f-8cb2-1e619fd51eb3'
                    }
                }).then((res) => { console.log('Fetched', criticalURL); return res; }).then((res) => res.json()),
                fetch(highURL, {
                    headers: {
                        apiKey: '09e94129-a4f0-402f-8cb2-1e619fd51eb3'
                    }
                }).then((res) => { console.log('Fetched', highURL); return res; }).then((res) => res.json()),
            ]).catch(() => { }) as any[];

            const criticalResults = criticalResponse.totalResults ?? 0;
            const highResults = highResponse.totalResults ?? 0;

            res.json({
                totalResults: criticalResults + highResults,
                allVulnerabilitites: [...criticalResponse.vulnerabilities.reverse(), ...highResponse.vulnerabilities.reverse()],
                high: highResponse,
                critical: criticalResponse
            });

            if (criticalResults > 0) return await software_collection.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    risk_level: 'Critical'
                }
            });

            if (highResults > 0) return await software_collection.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    risk_level: 'High'
                }
            });

            return await software_collection.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    risk_level: 'N/A'
                }
            });
        } catch (error) {
            res.sendStatus(500);
        }
    })
});

// @ROUTE: DELETE api/assets/hardware/:id
// @DESCRIPTION: Used for deleting a Software Asset.
router.delete('/:id', async (req: Request, res: Response) => {
    await wrapper(async (db: any) => {
        const collection = db.collection(DATABASE);
        const id = req.params.id;

        await collection.deleteOne({ _id: new mongo.ObjectId(id) });

        const _linkCollection = db.collection(LINK_COLLECTION_DATABASE);
        await _linkCollection.deleteMany({ hardware_id: new mongo.ObjectId(id) });
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

        const isFound = await collection.find({ name, manufacturer, version }).toArray();
        if (isFound.length > 0) return res.send({ status: false });

        const resp = await collection.insertOne({
            name,
            manufacturer,
            version,
            risk_level: risk_level ?? 'N/A',
            created_at: new Date().toISOString(),
            last_edit_at: new Date().toISOString()
        })

        res.json({ status: true, id: resp.insertedId })
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