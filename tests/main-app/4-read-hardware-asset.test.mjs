import { INSERTED_HARDWARE_ASSET_ID } from "./3-create-hardware-asset.test.mjs";

export const NAME = "Read Hardware Asset";
export const PARENT_NAME = "main-app";

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

        await page.waitForSelector(`table td::-p-text(${ASSET_ID})`);
        await page.waitForSelector('table td::-p-text(B460HD3)');
        await page.waitForSelector('table td::-p-text(Windows 10)');

        return resolve(true);
    } catch (error) {
        reject(error)
    }
});