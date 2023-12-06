import { DEMO_ACCOUNT_ID, fetchInternalAPI } from "./index.mjs";

export const NAME = "Create Hardware Asset";
export const PARENT_NAME = "api";
export let HARDWARE_ID = undefined;

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('POST', `assets/hardware`, {
            name: 'Automatic Asset',
            type: 'Laptop',
            ip: '2.2.2.2',
            parent_employee: DEMO_ACCOUNT_ID,
            model: 'Lenovo',
            manufacturer: 'Factory Inc.',
        });
        if(res.id) HARDWARE_ID = res.id; resolve(true);
        reject('Hardware Asset not inserted:', res);
    } catch (error) {
        reject(error)
    }
});