import { SOFTWARE_ID } from "./17-create-software.test.mjs";
import { fetchInternalAPI } from "./index.mjs";

export const NAME = "Scan Software";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('GET', `assets/software/${SOFTWARE_ID}/scan`);
        if(res.totalResults) resolve(true);
        reject('Software Asset not scanned:', res);
    } catch (error) {
        reject(error)
    }
});