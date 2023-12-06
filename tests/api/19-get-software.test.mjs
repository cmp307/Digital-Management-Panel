import { SOFTWARE_ID } from "./17-create-software.test.mjs";
import { fetchInternalAPI } from "./index.mjs";

export const NAME = "Get Software Asset";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('GET', `assets/software/${SOFTWARE_ID}`);
        if(res._id  == SOFTWARE_ID) resolve(true);
        reject('Software Asset not fetched:', res);
    } catch (error) {
        reject(error)
    }
});