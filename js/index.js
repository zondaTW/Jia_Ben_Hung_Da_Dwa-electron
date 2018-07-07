const remote = require('electron').remote;

function minimize_window(){
    var window = remote.getCurrentWindow();
    window.minimize();  
}

function close_window(){
    var window = remote.getCurrentWindow();
    window.close();  
}