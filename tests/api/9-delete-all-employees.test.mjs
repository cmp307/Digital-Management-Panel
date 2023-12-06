import { DEMO_ACCOUNT_ID, fetchInternalAPI } from "./index.mjs";

export const NAME = "Delete All Employees";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('DELETE', `employees`);
        const employees = await fetchInternalAPI('GET', `employees`);
        if(
            res.status == true &&
            employees.every(x => x._id == DEMO_ACCOUNT_ID)
        ) resolve(true);
        reject('All Employees not deleted', res);
    } catch (error) {
        reject(error)
    }
});