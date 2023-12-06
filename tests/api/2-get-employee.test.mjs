import { DEMO_ACCOUNT_ID, fetchInternalAPI } from "./index.mjs";

export const NAME = "Get Employee";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('GET', `employees/${DEMO_ACCOUNT_ID}`);
        
        if(res._id == DEMO_ACCOUNT_ID) resolve(true);
        reject('Employee not found, got:', res);
    } catch (error) {
        reject(error)
    }
});