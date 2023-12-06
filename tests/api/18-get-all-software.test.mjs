import { SOFTWARE_ID } from "./17-create-software.test.mjs";
import { DEMO_ACCOUNT_ID, fetchInternalAPI } from "./index.mjs";

export const NAME = "Get All Software Assets";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('GET', `assets/software/view-all`);
        if(res.filter(x => x._id == SOFTWARE_ID)) resolve(true);
        reject('Software Assets not fetched:', res);
    } catch (error) {
        reject(error)
    }
});