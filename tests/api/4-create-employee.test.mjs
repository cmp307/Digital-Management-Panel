import { DEMO_ACCOUNT_ID, fetchInternalAPI } from "./index.mjs";

export const NAME = "Create Employee";
export const PARENT_NAME = "api";
export let EMPLOYEE_ID = undefined;

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('POST', `employees`, {
            forename: 'Unit',
            surname: 'Test',
            department: 'Finance',
            password: 'password',
            confirmPassword: 'password'
        });
        if(res.id) EMPLOYEE_ID = res.id; resolve(true);
        reject('Employee not inserted:', res);
    } catch (error) {
        reject(error)
    }
});