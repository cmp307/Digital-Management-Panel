import chalk from 'chalk';
import electron from 'electron';
import puppeteer from 'puppeteer-core';
import figlet from 'figlet';
import { glob } from 'glob';

const delay = ms =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

(async () => {
    try {
        const app = await puppeteer.launch({
            executablePath: electron,
            args: ["."],
            headless: false,
        });
        const pages = await app.pages();
        const [page] = pages;
        await page.setViewport({ height: 1000, width: 1800 })

        figlet('Automatic Testing').then((data) => {
            console.log('\n\n');
            console.log(chalk.redBright(data))
            console.log(chalk.redBright(`                           Created by: Liam Townsley (2301060)`))
            console.log('\n\n');
        });

        const categoryFiles = await glob('tests/**/index.mjs');

        // Ensure init tests run FIRST. This stages the environment and ensures all tests can run. (Currently just logs in.)
        const index = categoryFiles.findIndex(x => x.includes("init"));
        if (index !== -1) {
            const obj = categoryFiles.splice(index, 1)[0];
            categoryFiles.unshift(obj);
        }

        const testFiles = await glob('tests/**/*.test.mjs');

        for (const categoryFile of categoryFiles) {
            const _category = await import('./' + categoryFile);

            // sort function created by chatgpt adapted by myself: https://chat.openai.com/share/103fa9ba-be5a-4f35-ba0d-55c25666d3b0
            const categoryTests = testFiles.filter(x => x.split('\\')[1] == _category.CODE_NAME).sort((a, b) => {
                const pathA = a.split('\\')[2].split('-')[0] || NaN;
                const pathB = b.split('\\')[2].split('-')[0] || NaN;
                if (isNaN(pathA) && isNaN(pathB)) return 0;
                if (isNaN(pathA)) return 1;
                if (isNaN(pathB)) return -1;
                else {
                    return pathB - pathA;
                }
            });

            console.log(`${chalk.blueBright('►')} ${chalk.bold.blueBright('Executing Testing Category')}${chalk.cyan(`: ${_category.NAME}`)}`)
            for (const testFile of categoryTests) {
                const _test = await import('./' + testFile);
                try {
                    await _test.default(page)
                    console.log(`   `, chalk.green(`✅ ${_test.NAME}`))
                } catch (error) {
                    console.log(`   `, chalk.red(`❌ ${_test.NAME}: ${chalk.redBright(error)}`))
                }
            }
            console.log('\n');
        }

        // await app.close();
    } catch (error) {
        console.error(error);
    }
})();