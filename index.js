
const cookieButton = document.getElementById("cookieButton");
const cookieCounter = document.getElementById("cookieCounter");
const highScoreDisplay = document.getElementById("highScore");
const cookieRateDislay = document.getElementById("cookieRate");
const upgradeButtons = document.getElementsByClassName("upgradeBtn");
const upgradeLabels = document.getElementsByClassName("upgradeLabel");
const INTERVAL = 50;


var updgradeList = {
    "x1": 0.1,
    "x2": 1,
    "x3": 10,
    "x4": 100,
}
var priceList = {
    "x1": 10,
    "x2": 100,
    "x3": 1000,
    "x4": 10000,
}

var nameList = {
    "x1": "Auto Clicker",
    "x2": "Grandma",
    "x3": "Cookie Factory",
    "x4": "Cookie Mine",
}

var highScore = 0;
var cookieRate = 0;
var cookies = 0;


function format_number(number, num_decimals, include_comma){
    return number.toLocaleString('en-US', {
        useGrouping: include_comma,
        minimumFractionDigits: num_decimals,
        maximumFractionDigits: num_decimals
    });
}

function frmt(num, decimal_places){
    return format_number(num, decimal_places, true);
}


function updateUgradeLabels(){
    for (let i = 0; i < upgradeLabels.length; i++){
        let label = upgradeLabels.item(i);
        let price = priceList[label.parentElement.id];
        let upgradeAmt = updgradeList[label.parentElement.id];
        let name = nameList[label.parentElement.id];
        label.textContent = `${name}: +${frmt(upgradeAmt, 1)} cookies/second; (${frmt(price, 0)} cookies)`;
    }
}

function updateDisplay () {
    highScoreDisplay.textContent = `Highest Number Of cookies: ${frmt(highScore, 0)}`;
    cookieCounter.textContent = `cookies: ${frmt(cookies, 0)}`;
    cookieRateDislay.textContent = `cookies per second: ${frmt(cookieRate, 1)}`;
    updateUgradeLabels();
}

function autoClick (){
    cookies += cookieRate * (INTERVAL/1000);
    highScore = Math.max(highScore, cookies);
    updateDisplay();
}


function purchaseUpgrade (id){
    let price = priceList[id];
    let canAfford = price <= cookies;
    let canPurchase = price && canAfford;

    if (!canPurchase){
        return;
    }

    cookies -= priceList[id];
    priceList[id] += Math.ceil(price * 0.05);
    upgrade(id);
}

function upgrade(id){
    if (!updgradeList[id]) {
        console.log(`Failed To Find ${id} In Upgrade List.`);
        return;
    }
    cookieRate += updgradeList[id];
}


function cookieClick (){
    cookies += cookieRate + 1;
    highScore = Math.max(highScore, cookies);
    updateDisplay();
}


for (let i = 0; i < upgradeButtons.length; i++){
    let button = upgradeButtons.item(i);
    button.onclick = function(){
        purchaseUpgrade(button.id);
    }
}

cookieButton.onclick = cookieClick;

updateDisplay();
setInterval(autoClick, INTERVAL)