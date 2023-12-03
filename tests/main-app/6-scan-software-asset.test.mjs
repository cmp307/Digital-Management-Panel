import { INSERTED_SOFTWARE_ASSET_ID } from "./3-create-software-asset.test.mjs";

export const NAME = "Scan Software Asset";
export const PARENT_NAME = "main-app";

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
        const view_software_asset = await page.waitForSelector(`a[href="#/software/${ASSET_ID}/scan"]`);
        await view_software_asset.click();
        
        await page.waitForSelector(`h1::-p-text(Vulnerability Scan Complete!)`, { timeout: 1 * 1000 * 60 * 2 }); // 2 minutes
        
        return resolve(true);
    } catch (error) {
        reject(error)
    }
});