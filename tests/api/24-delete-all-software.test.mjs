import { NEW_SOFTWARE_ID } from "./23-recreate-software.test.mjs";
import { fetchInternalAPI } from "./index.mjs";

export const NAME = "Delete All Software";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('DELETE', `assets/software`);
        const software = await fetchInternalAPI('GET', `assets/software/${NEW_SOFTWARE_ID}`);
        if(
            res.status == true &&
            !software
        ) resolve(true);
        reject('All Software not deleted', res);
    } catch (error) {
        reject(error)
    }
});