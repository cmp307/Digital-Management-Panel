export const NAME = "Create Employee";
export const PARENT_NAME = "main-app";

export let INSERTED_EMPLOYEE_ASSET_ID = undefined;

export default async (page) => new Promise(async (resolve, reject) => {
    try {
        const view_employees = await page.waitForSelector('a::-p-text(View & Manage Employees)');
        await view_employees.click();

        const create_employee = await page.waitForSelector('a[href="#/employees/create"]');
        await create_employee.click();

        const forename = await page.waitForSelector('input#forename');
        await forename.click();
        await forename.type('Automatic');


        const surname = await page.waitForSelector('input#surname');
        await surname.click();
        await surname.type('Employee');

        const department = await page.waitForSelector('select#department');
        await department.select('Sales');

        const password = await page.waitForSelector('input#password');
        await password.click();
        await password.type('demo password');

        const confirmPassword = await page.waitForSelector('input#confirmPassword');
        await confirmPassword.click();
        await confirmPassword.type('demo password');

        const submit = await page.waitForSelector('input[type="submit"]');
        await submit.click();

        const response = await page.waitForResponse(
            response =>
                response.url().endsWith("/employees/") && response.status() === 200
        );

        const res_json = await response.json();
        if (res_json.status == true) { INSERTED_EMPLOYEE_ASSET_ID = res_json.id }
        else { reject("Employee not inserted into database!") }
        resolve(true);
    } catch (error) {
        reject(error)
    }
});