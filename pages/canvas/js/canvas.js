let WIDTH = 400,
    HEIGHT = 400,
    R1 = 180,
    R2 = 170;

let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    a = document.getElementById('a');

canvas.width = WIDTH;
canvas.height = HEIGHT;


function drawRing1(fillColor = '#6cf') {
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(WIDTH / 2, HEIGHT / 2, R1, 0, Math.PI * 2);
    ctx.moveTo(WIDTH / 2 + R2, HEIGHT / 2);
    ctx.arc(WIDTH / 2, HEIGHT / 2, R2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
}
// drawRing1();

function drawRing2(fillColor = '#6cf') {
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(WIDTH / 2, HEIGHT / 2, R1, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(WIDTH / 2, HEIGHT / 2, R2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}
// drawRing2();

function drawRing3(strokeColor = '#6cf') {
    ctx.save();
    ctx.lineWidth = R1 - R2;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.arc(WIDTH / 2, HEIGHT / 2, (R1 + R2) / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}
drawRing3();


function downloadCanvas(a, canvas) {
    a.href = canvas.toDataURL("image/png");
    a.setAttribute('download', 'canvas.png');
}
downloadCanvas(a, canvas);



function drawRingByRate(rate = 100, strokeColor = '#6cf') {
    let start = -Math.PI / 2,
        end = start + 2 * Math.PI * (rate / 100);
    ctx.save();
    ctx.lineWidth = R1 - R2;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.arc(WIDTH / 2, HEIGHT / 2, (R1 + R2) / 2, start, end);
    ctx.stroke();
    ctx.restore();
}

function drawTextByRate(rate = 100, fillColor = '#6cf') {
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "center";
    ctx.fillText(rate + '%', WIDTH / 2, HEIGHT / 2);
    ctx.restore();
}


function drawProgressBar() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawRingByRate(point);
    drawTextByRate(point);
    point += 1;
    if (point > 100) {
        point -= 100;
    }
}

let point = 0;
function startDrawProgressBar(){
    drawProgressBar();
    setInterval(function () {
        drawProgressBar();
    }, 100);
}
// startDrawProgressBar();