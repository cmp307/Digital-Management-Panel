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
            console.log(`${chalk.blueBright('►')} ${chalk.bold.blueBright('Executing Testing Category')}${chalk.cyan(`: ${_category.NAME}`)}`)
            for (const testFile of testFiles) {
                const _test = await import('./' + testFile);
                if (_test.PARENT_NAME == _category.CODE_NAME) {
                    try {
                        await _test.default(page)
                        console.log(`   `, chalk.green(`✅ ${_test.NAME}`))
                    } catch (error) {
                        console.log(`   `, chalk.red(`❌ ${_test.NAME}: ${chalk.redBright(error)}`))
                    }
                }
            }
            console.log('\n');
        }

        // await app.close();
    } catch (error) {
        console.error(error);
    }
})();