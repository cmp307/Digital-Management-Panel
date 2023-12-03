import { INSERTED_SOFTWARE_ASSET_ID } from "./3-create-software-asset.test.mjs";

export const NAME = "Edit Software Asset";
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
        if(!ASSET_ID) return reject('Unable to execute. Previous asset not inserted within Test 8.')
        const edit_hardware_asset = await page.waitForSelector(`a[href="#/software/${ASSET_ID}/edit"]`);
        await edit_hardware_asset.click();
        
        const name = await page.waitForSelector('input#version');
        await name.click({ clickCount: 3 });
        await name.type('19045');

        const submit = await page.waitForSelector('input[type="submit"]');
        await submit.click();

        await page.waitForResponse(
            response =>
                response.url().endsWith(`/software/${ASSET_ID}`) && response.status() === 200
        );

        await page.waitForSelector(`table td::-p-text(${ASSET_ID})`);
        await page.waitForSelector(`table td::-p-text(19045)`);
        return resolve(true);
    } catch (error) {
        reject(error)
    }
});