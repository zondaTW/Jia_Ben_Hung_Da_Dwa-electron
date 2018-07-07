const setting_storage = require('electron-json-storage-sync');

var default_value = {
    "dinbendon_time": ["10", "10"],
    "lunch_time": ["12", "00"],
    "dessert_time": ["15", "10"],
    "dinbendon_url": "https://dinbendon.net/do/"
}

function setTime() {
    let dinbendon_time = document.getElementById("dinbendon_time").value.split(":");
    let lunch_time = document.getElementById("lunch_time").value.split(":");
    let dessert_time = document.getElementById("dessert_time").value.split(":");
    let dinbendon_url = document.getElementById("dinbendon_url").value;
    
    if (dinbendon_time.length == 1 && dinbendon_time[0] == "") {
        dinbendon_time = default_value.dinbendon_time;
    }
    if (lunch_time.length == 1 && lunch_time[0] == "") {
        lunch_time = default_value.lunch_time;
    }
    if (dessert_time.length == 1 && dessert_time[0] == "") {
        dessert_time = default_value.dessert_time;
    }
    if (dinbendon_url == "") {
        dinbendon_url = default_value.dinbendon_url;
    }

    const result = setting_storage.set(
        "jia_ben_hung_da_dwa_info",
        {"dinbendon_time": {
            "hours" : dinbendon_time[0], 
            "minute": dinbendon_time[1]
        },
        "lunch_time": {
            "hours" : lunch_time[0], 
            "minute": lunch_time[1]
        },
        "dessert_time": {
            "hours" : dessert_time[0], 
            "minute": dessert_time[1]
        },
        "dinbendon_url": dinbendon_url
    });

    if (result.status) {
        console.log("Time settings saved");
    } else {
        console.log("Error: ", result.error);
    }
    
    let send_message = {
        "Status": "Set",
        "Value": {
            'dinbendon_time': dinbendon_time,
            'lunch_time': lunch_time,
            'dessert_time': dessert_time,
            "dinbendon_url": dinbendon_url
        }
    }
    return send_message
}

function loadTimeToHtml(time_info) {
    const time_info_format = setting_storage.get("jia_ben_hung_da_dwa_info");
    let time_format;

    if (time_info_format.status) {
        time_format = time_info_format.data[time_info.name]["hours"] + ":" + 
            time_info_format.data[time_info.name]["minute"] + ":00";
    } else {
        time_format = time_info.default_time;
    }

    document.getElementById(time_info.name).value = time_format;
}

function getTime() {
    let time_infos = [
        {
            "name": "dinbendon_time",
            "default_time": "10:10:00"
        },
        {
            "name": "lunch_time",
            "default_time": "12:00:00"
        },
        {
            "name": "dessert_time",
            "default_time": "15:10:00"
        }
    ]
    time_infos.forEach(loadTimeToHtml);
}

function getURL() {
    const dinbendon_url = setting_storage.get("jia_ben_hung_da_dwa_info");

    let url;
    if (dinbendon_url.status) {
        url = dinbendon_url.data["dinbendon_url"];
    } else {
        url = default_value.dinbendon_url;
    }

    document.getElementById("dinbendon_url").value = url;
}

function init() {
    getTime();
    getURL();
}

window.addEventListener("load", init);

document.addEventListener("DOMContentLoaded", function() {
    var save = document.getElementById("save");
    // onClick"s logic below:
    save.addEventListener("click", function() {
        setTime();
    });
});