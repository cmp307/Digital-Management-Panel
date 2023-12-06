import { DEMO_ACCOUNT_ID, fetchInternalAPI } from "./index.mjs";

export const NAME = "Create Software Asset";
export const PARENT_NAME = "api";
export let SOFTWARE_ID = undefined;

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('POST', `assets/software`, {
            name: 'Windows 10',
            manufacturer: 'Microsoft',
            version: '19045'
        });
        if(res.id) SOFTWARE_ID = res.id; resolve(true);
        reject('Software Asset not inserted:', res);
    } catch (error) {
        reject(error)
    }
});