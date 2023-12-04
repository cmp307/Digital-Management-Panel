export const NAME = "View Software Page";
export const PARENT_NAME = "main-app";

export default async (page) => new Promise(async (resolve, reject) => {
    try {
        const view_software = await page.waitForSelector('a::-p-text(View & Manage Software Assets)');
        await view_software.click();

        await page.waitForResponse(
            response =>
                response.url().endsWith("software/view-all") && response.status() === 200
        );

        resolve(true);
    } catch (error) {
        reject(error)
    }
});