import { SOFTWARE_ID } from "./17-create-software.test.mjs";
import { fetchInternalAPI } from "./index.mjs";

export const NAME = "Edit Software";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('PATCH', `assets/software/${SOFTWARE_ID}`, {
            name: 'Linux',
            manufacturer: 'Linus',
            version: '1'
        });

        const software = await fetchInternalAPI('GET', `assets/software/${SOFTWARE_ID}`);
        if (
            res.status == true &&
            software.name == 'Linux' &&
            software.manufacturer == 'Linus' &&
            software.version == '1'
        ) resolve(true);
        reject(res);
    } catch (error) {
        reject(error)
    }
});