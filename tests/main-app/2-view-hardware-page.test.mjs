export const NAME = "View Hardware Page";
export const PARENT_NAME = "main-app";

export default async (page) => new Promise(async (resolve, reject) => {
    try {
        const view_hardware = await page.waitForSelector('a::-p-text(View & Manage Hardware Assets)');
        await view_hardware.click();

        const hardware_title = await page.waitForSelector('div.hero h2');
        const text = await hardware_title.evaluate(el => el.textContent);

        if (text.trim().toLowerCase() == 'action buttons') {
            return resolve(true);
        } else {
            throw new Error("Hardware Asset List page not loading!");
        }
    } catch (error) {
        reject(error)
    }
});