
const {app, BrowserWindow, Tray, Menu} = require('electron')
const path = require('path')
const url = require('url')

let win;
let appIcon;
const iconPath = path.join(__dirname, '../icon/chef.png');
const indexPath = path.join(__dirname, '../html/index.html');

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 200,
        height: 400,
        icon: iconPath,
        transparent: true,
        frame: false,
        resizable: false
    });

    win.loadFile(indexPath);

    createTray();

    win.on('minimize', () => {
        win.hide();
    });

    win.on('closed', () => {
        win = null;
    });
}

function createTray() {
    const contextMenu = Menu.buildFromTemplate([{
            label: 'Setting',
            click() {
                win.show();
            }
        },
        {
            label: 'Quit',
            click() {
                win.removeAllListeners('close');
                win.close();
            }
        }
    ]);

    appIcon = new Tray(iconPath);
    appIcon.setToolTip('甲奔皇帝大');
    appIcon.setContextMenu(contextMenu);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    // darwin = MacOS
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    // Dock
    if (win === null) {
        createWindow();
    }
})