import { INSERTED_EMPLOYEE_ASSET_ID } from "./3-create-employee.test.mjs";

export const NAME = "Read Employee";
export const PARENT_NAME = "main-app";
    
export default async (page) => new Promise(async (resolve, reject) => {
    try {
        const view_employees = await page.waitForSelector('a::-p-text(View & Manage Employees)');
        await view_employees.click();
        
        await page.waitForResponse(
            response =>
                response.url().endsWith("employees/") && response.status() === 200
        );
        
        const ASSET_ID = INSERTED_EMPLOYEE_ASSET_ID;
        if(!ASSET_ID) return reject('Unable to execute. Previous asset not inserted within Test 3.')
        const view_employee_page = await page.waitForSelector(`a[href="#/employees/${ASSET_ID}"]`);
        await view_employee_page.click();
        
        await page.waitForSelector(`table td::-p-text(${ASSET_ID})`);
        await page.waitForSelector('table td::-p-text(Automatic)');
        await page.waitForSelector('table td::-p-text(Employee)');

        return resolve(true);
    } catch (error) {
        reject(error)
    }
});