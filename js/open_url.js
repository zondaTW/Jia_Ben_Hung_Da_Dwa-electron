const {shell} = require('electron')
const open_url_storage = require('electron-json-storage-sync');

var default_url = "https://dinbendon.net/do/";

document.addEventListener("DOMContentLoaded", function() {
    var open_url = document.getElementById("open_url");
    // onClick"s logic below:
    open_url.addEventListener("click", (event) => {
        let dinbendon_url = open_url_storage.get('dinbendon_url');
        if (dinbendon_url.status) {
            shell.openExternal(dinbendon_url.data)
        } else {
            shell.openExternal(default_url)
        }
    })
});
