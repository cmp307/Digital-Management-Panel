export const NAME = "View Employees Page";
export const PARENT_NAME = "main-app";

export default async (page) => new Promise(async (resolve, reject) => {
    try {
        const view_employees = await page.waitForSelector('a::-p-text(View & Manage Employees)');
        await view_employees.click();

        const software_title = await page.waitForSelector('div.hero h2');
        const text = await software_title.evaluate(el => el.textContent);
        
        if (text.trim().toLowerCase() == 'action buttons') {
            return resolve(true);
        } else {
            throw new Error("Employee Page not loading!");
        }
    } catch (error) {
        reject(error)
    }
});