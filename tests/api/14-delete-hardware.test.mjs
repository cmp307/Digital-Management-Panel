import { HARDWARE_ID } from "./10-create-hardware.test.mjs";
import { EMPLOYEE_ID } from "./4-create-employee.test.mjs";
import { fetchInternalAPI } from "./index.mjs";

export const NAME = "Delete Hardware";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('DELETE', `assets/hardware/${HARDWARE_ID}`);
        const hardware = await fetchInternalAPI('GET', `assets/hardware/${HARDWARE_ID}`);
        
        if(
            res.status == true &&
            !hardware
        ) resolve(true);
        reject('Hardware not deleted:', res);
    } catch (error) {
        reject(error)
    }
});