const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

const snowflakes = [];
let snow = [];
let qnty = 100;

function getSnowflakes() {
    for (let i = 0; i < qnty; i++) {
        const snowflake = {
            x: 0,
            y: 0
        };
        snowflake.x = Math.floor(Math.random() * cvs.width);
        snowflake.y = Math.floor(Math.random() * cvs.height);
        // snowflake.y = 0;
        snowflakes.push(snowflake);
    }
}

function clearSnow() {
    let maxSnow = 600;
    snow.forEach(s => {
        if (s.y < maxSnow) maxSnow = s.y;
    });
    const clearedSnow = snow.filter(s => s.y > maxSnow + 10);
    snow = clearedSnow;
}

function moreSnow() {
    qnty += 100;
    getSnowflakes();
}

function moveSnowflake(snowflake) {
    if (Math.random() < 0.5) {
        snowflake.x += Math.random() < 0.5 ? -1 : 1;
    }
    snowflake.y += Math.floor(Math.random() * (2 - 1)) + 1;
    if (snowflake.y == cvs.height) {
        insertSnow(snowflake.x, snowflake.y);
        snowflake.x = Math.floor(Math.random() * cvs.width);
        snowflake.y = 0;
    }
}

function insertSnow(x, y) {
    for (let i = 0; i < snow.length; i++) {
        if (snow[i].x == x) {
            y = snow[i].y - 1;
        }
    }
    snow.push({ x: x, y: y});
}

function draw() {
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for (let i = 0; i < snowflakes.length; i++) {        
        moveSnowflake(snowflakes[i]);
        ctx.fillRect(snowflakes[i].x, snowflakes[i].y, 1, 1);
    }
    for (let j = 0; j < snow.length; j++) {
        ctx.fillRect(snow[j].x, snow[j].y, 1, 1);
    }
}

const run = setInterval(draw, 50);