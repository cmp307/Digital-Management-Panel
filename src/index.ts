import { app, BrowserWindow } from 'electron';

const DEVELOPMENT = true;

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    return win;
}

app
    .whenReady()
    .then(() => {
        const window = createWindow();

        if(DEVELOPMENT) {
            window.loadFile('../html/index.html');
        } else {
            window.loadFile('./html/index.html');
        }
        window.removeMenu();
    });

app
    .on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

app
    .on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });