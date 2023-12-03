export const NAME = "Index Page Loaded";
export const PARENT_NAME = "main-app";

export default async (page) => new Promise(async (resolve, reject) => {
    try {
        await page.waitForSelector('p::-p-text(From here you can manage the)');
        resolve(true);
    } catch (error) {
        reject(error)
    }
});