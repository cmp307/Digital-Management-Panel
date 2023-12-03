export const NAME = "Login To Demo Account";
export const PARENT_NAME = "init";

export default async (page) => new Promise(async (resolve, reject) => {
    try {
        const email_input = await page.waitForSelector('input#email');
        await email_input.click();
        await email_input.type('demo@example.com');
    
        const password_input = await page.waitForSelector('input#password');
        await password_input.click();
        await password_input.type('demo');
    
        const submit_input = await page.waitForSelector('input[type="submit"]');
        await submit_input.click();
    
        const logged_in_user = await page.waitForSelector('span::-p-text(demo@example.com)');
        const text = await logged_in_user.evaluate(el => el.textContent);
        if(text == 'demo@example.com') return resolve(true);
        throw new Error("Login System not allowing for logging in as demo@example.com") 
    } catch (error) {
        reject(error)        
    }
});