
import { INSERTED_SOFTWARE_ASSET_ID } from "./3-create-software-asset.test.mjs";
import { INSERTED_HARDWARE_ASSET_ID } from "./3-create-hardware-asset.test.mjs";


export const NAME = "Create Asset Link";
export const PARENT_NAME = "main-app";

const delay = ms =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

export default async (page) => new Promise(async (resolve, reject) => {
    try {
        const view_hardware = await page.waitForSelector('a::-p-text(View & Manage Hardware Assets)');
        await view_hardware.click();

        await page.waitForResponse(
            response =>
                response.url().endsWith("/hardware/view-all") && response.status() === 200
        );

        const ASSET_ID = INSERTED_HARDWARE_ASSET_ID;
        if (!ASSET_ID) return reject('Unable to execute. Previous asset not inserted within Test 3.')
        const view_hardware_asset = await page.waitForSelector(`a[href="#/hardware/${ASSET_ID}"]`);
        await view_hardware_asset.click();

        const install_software = await page.waitForSelector(`a[href="#/hardware/${ASSET_ID}/install"]`);
        await install_software.click();

        const software = await page.waitForSelector(`select#software_asset`);
        await software.select(INSERTED_SOFTWARE_ASSET_ID);

        const submit = await page.waitForSelector('input[type="submit"]');
        await submit.click();

        await delay(2000);

        return resolve(true);
    } catch (error) {
        reject(error)
    }
});