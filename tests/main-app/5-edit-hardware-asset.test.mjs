import { INSERTED_HARDWARE_ASSET_ID } from "./3-create-hardware-asset.test.mjs";

export const NAME = "Edit Hardware Asset";
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
        if(!ASSET_ID) return reject('Unable to execute. Previous asset not inserted within Test 3.')
        const edit_hardware_asset = await page.waitForSelector(`a[href="#/hardware/${ASSET_ID}/edit"]`);
        await edit_hardware_asset.click();
        
        const name = await page.waitForSelector('input#name');
        await name.click({ clickCount: 3 });
        await name.type('Windows 11');

        const submit = await page.waitForSelector('input[type="submit"]');
        await submit.click();

        await page.waitForResponse(
            response =>
                response.url().endsWith(`/hardware/${ASSET_ID}`) && response.status() === 200
        );

        await page.waitForSelector(`table td::-p-text(${ASSET_ID})`);
        await page.waitForSelector(`table td::-p-text(Windows 11)`);
        return resolve(true);
    } catch (error) {
        reject(error)
    }
});