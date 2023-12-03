import { INSERTED_SOFTWARE_ASSET_ID } from "./3-create-software-asset.test.mjs";

export const NAME = "Read Software Asset";
export const PARENT_NAME = "main-app";

const delay = ms =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
    
export default async (page) => new Promise(async (resolve, reject) => {
    try {
        const view_hardware = await page.waitForSelector('a::-p-text(View & Manage Software Assets)');
        await view_hardware.click();
        
        await page.waitForResponse(
            response =>
                response.url().endsWith("/software/view-all") && response.status() === 200
        );
        
        const ASSET_ID = INSERTED_SOFTWARE_ASSET_ID;
        if(!ASSET_ID) return reject('Unable to execute. Previous asset not inserted within Test 8.')
        const view_software_asset = await page.waitForSelector(`a[href="#/software/${ASSET_ID}"]`);
        await view_software_asset.click();
        
        await page.waitForSelector(`table td::-p-text(${ASSET_ID})`);
        await page.waitForSelector('table td::-p-text(Windows 10)');
        await page.waitForSelector('table td::-p-text(19536)');

        return resolve(true);
    } catch (error) {
        reject(error)
    }
});