export const NAME = "Create Software Asset";
export const PARENT_NAME = "main-app";

export let INSERTED_SOFTWARE_ASSET_ID = undefined;

export default async (page) => new Promise(async (resolve, reject) => {
    try {
        const view_hardware = await page.waitForSelector('a::-p-text(View & Manage Software Assets)');
        await view_hardware.click();

        const create_asset = await page.waitForSelector('a[href="#/software/create"]');
        await create_asset.click();

        const name = await page.waitForSelector('input#name_input');
        await name.click();
        await name.type('Windows 10');

        const manufacturer = await page.waitForSelector('input#manufacturer_input');
        await manufacturer.click();
        await manufacturer.type("Microsoft");

        const model = await page.waitForSelector('input#version');
        await model.click();
        await model.type("19536");

        const submit = await page.waitForSelector('input[type="submit"]');
        await submit.click();

        const response = await page.waitForResponse(
            response =>
                response.url().endsWith("/assets/software") && response.status() === 200
        );

        const res_json = await response.json();
        if (res_json.status == true) { INSERTED_SOFTWARE_ASSET_ID = res_json.id }
        else { reject("Asset not inserted into database!") }
        resolve(true);
    } catch (error) {
        reject(error)
    }
});