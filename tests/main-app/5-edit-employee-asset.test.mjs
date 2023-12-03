import { INSERTED_EMPLOYEE_ASSET_ID } from "./3-create-employee.test.mjs";

export const NAME = "Edit Employee";
export const PARENT_NAME = "main-app";

const delay = ms =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
export default async (page) => new Promise(async (resolve, reject) => {
    try {
        const view_employee = await page.waitForSelector('a::-p-text(View & Manage Employees)');
        await view_employee.click();

        await page.waitForResponse(
            response =>
                response.url().endsWith("employees/") && response.status() === 200
        );

        const ASSET_ID = INSERTED_EMPLOYEE_ASSET_ID;
        if (!ASSET_ID) return reject('Unable to execute. Previous asset not inserted within Test 3.')
        const edit_employee = await page.waitForSelector(`a[href="#/employees/${ASSET_ID}/edit"]`);
        await edit_employee.click();
        await delay(100);
        const forename = await page.waitForSelector('input#forename');
        await forename.click({ clickCount: 3 });
        await forename.type('Edited');
        await delay(100);

        const surname = await page.waitForSelector('input#surname');
        await surname.click({ clickCount: 3 });
        await surname.type('User');
        
        const department = await page.waitForSelector('select#department');
        await department.select('Operations');
        
        const submit = await page.waitForSelector('input[type="submit"]');
        await submit.click();

        await page.waitForResponse(
            response =>
                response.url().endsWith(`/employees/${ASSET_ID}`) && response.status() === 200
        );
        await page.waitForSelector(`table td::-p-text(${ASSET_ID})`);
        await page.waitForSelector(`table td::-p-text(Edited)`);
        await page.waitForSelector(`table td::-p-text(User)`);
        await page.waitForSelector(`table td::-p-text(Operations)`);
        return resolve(true);
    } catch (error) {
        reject(error)
    }
});