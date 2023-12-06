import { EMPLOYEE_ID } from "./4-create-employee.test.mjs";
import { DEMO_ACCOUNT_ID, fetchInternalAPI } from "./index.mjs";

export const NAME = "Login to Account";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const employee = await fetchInternalAPI('GET', `employees/${EMPLOYEE_ID}`);
        const res = await fetchInternalAPI('POST', `employees/login`, {
            email: employee.email,
            password: 'password',
        });
        
        if(res.status) resolve(true);
        reject('Employee login not successful:', res);
    } catch (error) {
        reject(error)
    }
});