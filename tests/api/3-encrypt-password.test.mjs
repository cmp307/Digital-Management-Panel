import { DEMO_ACCOUNT_ID, fetchInternalAPI } from "./index.mjs";

export const NAME = "Encrypt Password";
export const PARENT_NAME = "api";

export default async () => new Promise(async (resolve, reject) => {
    try {
        const res = await fetchInternalAPI('POST', `employees/generate-password`, {
            password: 'password',
        });
        if(res.status) resolve(true);
        reject('Password not generated:', res);
    } catch (error) {
        reject(error)
    }
});