let WIDTH = 400,
    HEIGHT = 400,
    R1 = 180,
    R2 = 170;

let Color = net.brehaut.Color,
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    image = new Image();

image.src = '../../../img/ring.png';

canvas.width = WIDTH;
canvas.height = HEIGHT;

image.onload = function () {
    // changeColor1(image, 'yellow', 'pink');
    changeColor2(image, 'yellow', 'pink');
    downloadCanvas(a, canvas);
}

function downloadCanvas(a, canvas) {
    a.href = canvas.toDataURL("image/png");
    a.setAttribute('download', 'canvas.png');
}

function changeColor1(image, color, bgColor) {
    let itColor, colorC, bgColorC, imageData, data, i;
    ctx.save();
    ctx.drawImage(image, 0, 0);
    itColor;
    colorC = Color(color);
    bgColor = bgColor || 'rgba(0,0,0,0)';
    bgColorC = Color(bgColor);
    imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    data = imageData.data;
    for (i = 0; i < data.length; i += 4) {
        if (data[i + 3] == 0) {
            itColor = bgColorC;
        } else {
            itColor = colorC;
        }
        data[i] = 255 * itColor.getRed();
        data[i + 1] = 255 * itColor.getGreen();
        data[i + 2] = 255 * itColor.getBlue();
        data[i + 3] = 255 * itColor.getAlpha();
    }
    ctx.putImageData(imageData, 0, 0);
    ctx.restore();
}

function changeColor2(image, color, bgColor) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(image, 0, 0);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = bgColor || 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();
}