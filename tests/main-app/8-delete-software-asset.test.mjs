import { INSERTED_SOFTWARE_ASSET_ID } from "./3-create-software-asset.test.mjs";

export const NAME = "Delete Software Asset";
export const PARENT_NAME = "main-app";

const delay = ms =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

export default async (page) => new Promise(async (resolve, reject) => {
    try {
        const view_software = await page.waitForSelector('a::-p-text(View & Manage Software Assets)');
        await view_software.click();

        await page.waitForResponse(
            response =>
                response.url().endsWith("/software/view-all") && response.status() === 200
        );

        const ASSET_ID = INSERTED_SOFTWARE_ASSET_ID;
        if (!ASSET_ID) return reject('Unable to execute. Previous asset not inserted within Test 8.')

        const delete_software_asset = await page.waitForSelector(`button[data-test-id="delete-${ASSET_ID}"]`);
        await delete_software_asset.click();

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