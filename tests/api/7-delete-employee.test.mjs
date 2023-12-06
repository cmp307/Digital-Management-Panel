import { EMPLOYEE_ID } from "./4-create-employee.test.mjs";
import { fetchInternalAPI } from "./index.mjs";

export const NAME = "Delete Employee";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('DELETE', `employees/${EMPLOYEE_ID}`);
        const employee = await fetchInternalAPI('GET', `employees/${EMPLOYEE_ID}`);
        
        if(
            res.status == true &&
            !employee
        ) resolve(true);
        reject('Employee not deleted:', res);
    } catch (error) {
        reject(error)
    }
});