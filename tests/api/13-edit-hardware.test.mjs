import { HARDWARE_ID } from "./10-create-hardware.test.mjs";
import { EMPLOYEE_ID } from "./4-create-employee.test.mjs";
import { fetchInternalAPI } from "./index.mjs";

export const NAME = "Edit Hardware";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('PATCH', `assets/hardware/${HARDWARE_ID}`, {
            name: 'Edited Asset',
            type: 'Workstation',
            ip: '3.3.3.3',
            parent_employee: EMPLOYEE_ID,
            model: 'JBX23',
            manufacturer: 'Factory Ltd.',
            date: undefined,
            note: undefined,
        });
        
        const hardware = await fetchInternalAPI('GET', `assets/hardware/${HARDWARE_ID}`);
        if(
            res.status == true &&
            hardware.name == 'Edited Asset' &&
            hardware.type == 'Workstation' &&
            hardware.ip == '3.3.3.3',
            hardware.model == 'JBX23',
            hardware.manufacturer == 'Factory Ltd.'
        ) resolve(true);
        reject('Hardware not edited:', res);
    } catch (error) {
        reject(error)
    }
});