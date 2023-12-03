export const NAME = "View Employees Page";
export const PARENT_NAME = "main-app";

export default async (page) => new Promise(async (resolve, reject) => {
    try {
        const view_hardware = await page.waitForSelector('a::-p-text(View & Manage Employees)');
        await view_hardware.click();

        await page.waitForResponse(
            response =>
                response.url().endsWith("employees/") && response.status() === 200
        );
        
        resolve(true);
    } catch (error) {
        reject(error)
    }
});