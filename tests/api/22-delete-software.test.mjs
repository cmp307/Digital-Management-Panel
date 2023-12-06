import { HARDWARE_ID } from "./10-create-hardware.test.mjs";
import { SOFTWARE_ID } from "./17-create-software.test.mjs";
import { EMPLOYEE_ID } from "./4-create-employee.test.mjs";
import { fetchInternalAPI } from "./index.mjs";

export const NAME = "Delete Software";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('DELETE', `assets/software/${SOFTWARE_ID}`);
        const software = await fetchInternalAPI('GET', `assets/software/${SOFTWARE_ID}`);
        
        if(
            res.status == true &&
            !software
        ) resolve(true);
        reject('Software not deleted:', res);
    } catch (error) {
        reject(error)
    }
});