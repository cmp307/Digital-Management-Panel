import { EMPLOYEE_ID } from "./4-create-employee.test.mjs";
import { fetchInternalAPI } from "./index.mjs";

export const NAME = "Edit Employee";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('PATCH', `employees/${EMPLOYEE_ID}`, {
            forename: 'Edit',
            surname: 'Testing',
            department: 'Operations',
        });
        
        const employee = await fetchInternalAPI('GET', `employees/${EMPLOYEE_ID}`);
        
        if(
            res.status == true &&
            employee.forename == 'Edit' &&
            employee.surname == 'Testing' &&
            employee.department == 'Operations'
        ) resolve(true);
        reject('Employee not edited:', res);
    } catch (error) {
        reject(error)
    }
});