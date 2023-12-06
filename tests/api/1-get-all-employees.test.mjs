import { DEMO_ACCOUNT_ID, fetchInternalAPI } from "./index.mjs";

export const NAME = "Get All Employees";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('GET', 'employees');
        
        if(res.filter(x => x._id == DEMO_ACCOUNT_ID)) resolve(true);
        reject('Employees not found, got:', res);
    } catch (error) {
        reject(error)
    }
});