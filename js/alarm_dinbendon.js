const notifier = require('node-notifier')
const moment = require('moment')
const path = require('path')

var whenToRing = {
    "dinbendon_time": new Date().setHours(10, 10, 00),
    "lunch_time": new Date().setHours(12, 00, 00),
    "dessert_time": new Date().setHours(15, 10, 00)
};
var dinbendon_url = "https://dinbendon.net/do/";
var dinbendon_icon = path.join(__dirname, '../icon/menu.png');
var lunch_icon = path.join(__dirname, '../icon/rice.png');
var dessert_icon = path.join(__dirname, '../icon/creme-caramel.png');

let now_time;
let alarm_time;
let alarm_notice;

const elDinbendon = document.querySelector('#dinbendon_time');
const elLunch = document.querySelector('#lunch_time');
const elDessert = document.querySelector('#dessert_time');
const elUrl = document.querySelector('#dinbendon_url');
elDinbendon.addEventListener('change', onDinbendonHtmlChange);
elLunch.addEventListener('change', onLunchHtmlChange);
elDessert.addEventListener('change', onDessertHtmlChange);
elUrl.addEventListener('change', onUrlHtmlChange);

function get_time_and_url() {
    let time;
    time = elDinbendon.value.split(":");
    whenToRing.dinbendon_time = new Date().setHours(time[0], time[1], 00);

    time = elLunch.value.split(":");
    whenToRing.lunch_time = new Date().setHours(time[0], time[1], 00);

    time = elDessert.value.split(":");
    whenToRing.dessert_time = new Date().setHours(time[0], time[1], 00);

    dinbendon_url = elUrl.value;
}

function onDinbendonHtmlChange(event) {
    let time = event.target.value.split(":");
    whenToRing.dinbendon_time = new Date().setHours(time[0], time[1], 00);
    set_alarm_time();
}

function onLunchHtmlChange(event) {
 let time = event.target.value.split(":");
    whenToRing.lunch_time = new Date().setHours(time[0], time[1], 00);
    set_alarm_time();
}

function onDessertHtmlChange(event) {
 let time = event.target.value.split(":");
    whenToRing.dessert_time = new Date().setHours(time[0], time[1], 00);
    set_alarm_time();
}

function onUrlHtmlChange(event) {
    dinbendon_url = event.target.value;
}

function set_alarm_time() {
    let now_time = new Date().getTime();
    if (now_time < whenToRing.dinbendon_time) {
        alarm_time = moment(whenToRing.dinbendon_time).format('HH:mm:ss');
        alarm_notice = dinbendon_notice;
    } else if (now_time < whenToRing.lunch_time) {
        alarm_time = moment(whenToRing.lunch_time).format('HH:mm:ss');
        alarm_notice = lunch_notice;
    } else if (now_time < whenToRing.dessert_time) {
        alarm_time = moment(whenToRing.dessert_time).format('HH:mm:ss');
        alarm_notice = dessert_notice;
    } else {
        alarm_time = moment(whenToRing.dinbendon_time).format('HH:mm:ss');
        alarm_notice = dinbendon_notice;
    }
}

function timer() {
    time = moment().format('HH:mm:ss');

    now_time = time;

    check_time();
    setTimeout(() => {
        timer();
    }, 1000);
}

function check_time() {
    const diff = moment(now_time, 'HH:mm:ss').diff(moment(alarm_time, 'HH:mm:ss'));
    if (0 <= diff && diff <= 59 * 1000) {
        alarm_notice();
        setTimeout(() => {
            set_alarm_time();
        }, 1 * 1000);
    }
}

function dinbendon_notice() {
    notifier.notify({
        title: '甲奔皇帝大',
        message: "DinBenDon瞜~~~~~",
        icon: dinbendon_icon,
        sound: true,
        wait: true
    })
    notifier.on('click', function(notifierObject, options) {
        // Triggers if `wait: true` and user clicks notification
        shell.openExternal(dinbendon_url)
    });
}

function lunch_notice() {
    notifier.notify({
        title: '甲奔皇帝大',
        message: "領便當瞜~~~~~",
        icon: lunch_icon,
        sound: true,
        wait: true
    })
    notifier.on('click', function(notifierObject, options) {
        // Triggers if `wait: true` and user clicks notification
        shell.openExternal(dinbendon_url)
    });
}

function dessert_notice() {
    notifier.notify({
        title: '甲奔皇帝大',
        message: "拿點心瞜~~~~~",
        icon: dessert_icon,
        sound: true,
    })
}

function main(){
    get_time_and_url();
    set_alarm_time();
    timer();
}

setTimeout(() => {
    main();
}, 1 * 1000);
