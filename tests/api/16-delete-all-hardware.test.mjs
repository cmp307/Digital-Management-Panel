import { NEW_HARDWARE_ID } from "./15-recreate-hardware.test.mjs";
import { DEMO_ACCOUNT_ID, fetchInternalAPI } from "./index.mjs";

export const NAME = "Delete All Hardware";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('DELETE', `assets/hardware`);
        const hardware = await fetchInternalAPI('GET', `assets/hardware/${NEW_HARDWARE_ID}`);
        if(
            res.status == true &&
            !hardware
        ) resolve(true);
        reject('All Hardware not deleted', res);
    } catch (error) {
        reject(error)
    }
});