"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
<<<<<<< HEAD
const DEVELOPMENT = true;
=======
>>>>>>> 842b5e4d8b067db9d35546f86c9c1a81a49c7fe9
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    return win;
}
electron_1.app
    .whenReady()
    .then(() => {
    const window = createWindow();
<<<<<<< HEAD
    if (DEVELOPMENT) {
        window.loadFile('../html/index.html');
    }
    else {
        window.loadFile('./html/index.html');
    }
=======
    window.loadFile('../html/index.html');
>>>>>>> 842b5e4d8b067db9d35546f86c9c1a81a49c7fe9
    window.removeMenu();
});
electron_1.app
    .on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
electron_1.app
    .on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
