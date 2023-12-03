import { INSERTED_HARDWARE_ASSET_ID } from "./3-create-hardware-asset.test.mjs";

export const NAME = "Delete Hardware Asset";
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

        const delete_hardware_asset = await page.waitForSelector(`button[data-test-id="delete-${ASSET_ID}"]`);
        await delete_hardware_asset.click();
        
        try {
            await delay(2000);
            await page.waitForXPath(`//*[contains(text(), "${ASSET_ID}")]`, { timeout: 3000 });
            // If the above line does not error, below will be executed.
            return reject("Asset has not been deleted.");
        } catch (error) {
            return resolve(true);
        }

    } catch (error) {
        reject(error)
    }
});