import { HARDWARE_ID } from "./10-create-hardware.test.mjs";
import { DEMO_ACCOUNT_ID, fetchInternalAPI } from "./index.mjs";

export const NAME = "Get Hardware Asset";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('GET', `assets/hardware/${HARDWARE_ID}`);
        if(res._id  == HARDWARE_ID) resolve(true);
        reject('Hardware Asset not fetched:', res);
    } catch (error) {
        reject(error)
    }
});