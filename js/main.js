
const {app, BrowserWindow, Tray, Menu} = require('electron')
const path = require('path')
const url = require('url')
var cp = require('child_process');

var handleSquirrelEvent = function() {
    if (process.platform != 'win32') {
       return false;
    }

    function executeSquirrelCommand(args, done) {
       var updateDotExe = path.resolve(path.dirname(process.execPath), 
          '..', 'update.exe');
       var child = cp.spawn(updateDotExe, args, { detached: true });

       child.on('close', function(code) {
          done();
       });
    };

    function install(done) {
       var target = path.basename(process.execPath);
       executeSquirrelCommand(["--createShortcut", target], done);
    };
 
    function uninstall(done) {
       var target = path.basename(process.execPath);
       executeSquirrelCommand(["--removeShortcut", target], done);
    };
 
    var squirrelEvent = process.argv[1];
 
    switch (squirrelEvent) {
 
       case '--squirrel-install':
          install(app.quit);
          return true;
 
       case '--squirrel-updated':
          install(app.quit);
          return true;
 
       case '--squirrel-obsolete':
          app.quit();
          return true;
 
       case '--squirrel-uninstall':
          uninstall(app.quit);
          return true;
    }
    return false;
};

if (handleSquirrelEvent()) {
    return;
}

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