export const NAME = "Create Hardware Asset";
export const PARENT_NAME = "main-app";

export let INSERTED_HARDWARE_ASSET_ID = undefined;

export default async (page) => new Promise(async (resolve, reject) => {
    try {
        const view_hardware = await page.waitForSelector('a::-p-text(View & Manage Hardware Assets)');
        await view_hardware.click();

        const create_asset = await page.waitForSelector('a[href="#/hardware/create"]');
        await create_asset.click();

        const name = await page.waitForSelector('input#name');
        await name.click();
        await name.type('Windows 10');

        const type = await page.waitForSelector('select#type');
        await type.select("Workstation");

        const model = await page.waitForSelector('input#model');
        await model.click();
        await model.type("B460HD3");

        const manufacturer = await page.waitForSelector('input#manufacturer')
        await manufacturer.click();
        await manufacturer.type('Gigabyte Technology Co., Ltd.')

        const ip = await page.waitForSelector('input#ip')
        await ip.click();
        await ip.type(`192.168.0.255`);

        const date = await page.waitForSelector('input#date')
        await date.type(new Date().toLocaleDateString('en-GB').split('/').join('-'))

        const note = await page.waitForSelector('textarea#note');
        await note.click();
        await note.type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices metus porttitor ullamcorper tempor. Vivamus euismod elit in magna rutrum, eget congue sem sodales. Aenean porta feugiat tempor. Fusce vehicula luctus enim, nec tristique sapien aliquet ac. Proin in vulputate velit.");

        const employee = await page.waitForSelector('select#parent_employee');
        await employee.select("Demo User (Information Technology)");

        const submit = await page.waitForSelector('input[type="submit"]');
        await submit.click();

        const response = await page.waitForResponse(
            response =>
                response.url().endsWith("/assets/hardware") && response.status() === 200
        );
        
        const res_json = await response.json();
        if(res_json.status == true) { INSERTED_HARDWARE_ASSET_ID = res_json.id }
        else { reject("Asset not inserted into database!") } 
        resolve(true);
    } catch (error) {
        reject(error)
    }
});