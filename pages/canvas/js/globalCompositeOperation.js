var canvas1 = document.createElement("canvas");
var canvas2 = document.createElement("canvas");
var gco = ['source-over', 'source-in', 'source-out', 'source-atop',
    'destination-over', 'destination-in', 'destination-out', 'destination-atop',
    'lighter', 'copy', 'xor', 'multiply', 'screen', 'overlay', 'darken',
    'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light',
    'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'
].reverse();
var gcoText = [
    '这是默认设置，并在现有画布上下文之上绘制新图形。',
    '新图形只在新图形和目标画布重叠的地方绘制。其他的都是透明的。',
    '在不与现有画布内容重叠的地方绘制新图形。',
    '新图形只在与现有画布内容重叠的地方绘制。',
    '在现有的画布内容后面绘制新的图形。',
    '现有的画布内容保持在新图形和现有画布内容重叠的位置。其他的都是透明的。',
    '现有内容保持在新图形不重叠的地方。',
    '现有的画布只保留与新图形重叠的部分。',
    '新的图形是在画布内容后面绘制的。',
    '两个重叠图形的颜色是通过颜色值相加来确定的。',
    '只显示新图形。',
    '图像中，那些重叠和正常绘制之外的其他地方是透明的。',
    '将顶层像素与底层相应像素相乘。结果是一幅更黑暗的图片（picture）。',
    '像素被倒转，相乘，再倒转。',
    '一个较亮的图片是“相反相乘（opposite of multiply）”的结果。',
    '屏幕相乘的组合（A combination of multiply and screen）。基部的暗部分变暗，浅色部分变浅。',
    '保留两个图层中最暗的像素。',
    '保留两个图层中最轻的像素。',
    '将底层除以倒置顶层。',
    '将倒置的底层除以顶层，然后将结果倒过来。',
    '屏幕相乘（A combination of multiply and screen）类似于叠加，但上下图层互换了。',
    '一个柔和版本的强光（hard-light）。纯黑或纯白不会导致纯黑或纯白。',
    '近似差异（Like difference），但对比度较低。',
    '保留了底层的亮度（luma）和色度（chroma），同时采用了顶层的色调。',
    '保留底层的亮度（luma）和色调，同时采用顶层的色度。',
    '保留了底层的亮度（luma），同时采用了顶层的色相和色度。',
    '保持底层的色相和色度，同时采用顶层的亮度（luma）。'
].reverse();
var width = 320;
var height = 340;
window.onload = function () {
    // resize canvas
    canvas1.width = width;
    canvas1.height = height;
    canvas2.width = width;
    canvas2.height = height;
    lightMix()
    colorSphere();
    runComposite();
    return;
};

function createCanvas() {
    var canvas = document.createElement("canvas");
    canvas.style.background = "url(" + op_8x8.data + ")";
    canvas.style.border = "1px solid #000";
    canvas.style.margin = "5px";
    canvas.width = width / 2;
    canvas.height = height / 2;
    return canvas;
}

function runComposite() {
    var dl = document.createElement("dl");
    var main = document.getElementById('main');
    main.appendChild(dl);
    while (gco.length) {
        var pop = gco.pop();
        var dt = document.createElement("dt");
        dt.textContent = pop;
        dl.appendChild(dt);
        var dd = document.createElement("dd");
        var p = document.createElement("p");
        p.textContent = gcoText.pop();
        dd.appendChild(p);

        var canvasToDrawOn = createCanvas();
        var canvasToDrawFrom = createCanvas();
        var canvasToDrawResult = createCanvas();

        var ctx = canvasToDrawResult.getContext('2d');
        ctx.clearRect(0, 0, width, height)
        ctx.save();
        ctx.drawImage(canvas1, 0, 0, width / 2, height / 2);
        ctx.globalCompositeOperation = pop;
        ctx.drawImage(canvas2, 0, 0, width / 2, height / 2);
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0, height / 2 - 20, width / 2, 20);
        ctx.fillStyle = "#FFF";
        ctx.font = "14px arial";
        ctx.fillText(pop, 5, height / 2 - 5);
        ctx.restore();

        var ctx = canvasToDrawOn.getContext('2d');
        ctx.clearRect(0, 0, width, height)
        ctx.save();
        ctx.drawImage(canvas1, 0, 0, width / 2, height / 2);
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0, height / 2 - 20, width / 2, 20);
        ctx.fillStyle = "#FFF";
        ctx.font = "14px arial";
        ctx.fillText('old', 5, height / 2 - 5);
        ctx.restore();

        var ctx = canvasToDrawFrom.getContext('2d');
        ctx.clearRect(0, 0, width, height)
        ctx.save();
        ctx.drawImage(canvas2, 0, 0, width / 2, height / 2);
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0, height / 2 - 20, width / 2, 20);
        ctx.fillStyle = "#FFF";
        ctx.font = "14px arial";
        ctx.fillText('new', 5, height / 2 - 5);
        ctx.restore();

        dd.appendChild(canvasToDrawOn);
        dd.appendChild(canvasToDrawFrom);
        dd.appendChild(canvasToDrawResult);

        var hr = document.createElement("hr");

        dl.appendChild(dd);
        dl.appendChild(hr);
    }
};

var lightMix = function () {
    var ctx = canvas2.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "#f00";
    ctx.fillRect(80, 80, 160, 160)
    ctx.fill();
};
var colorSphere = function () {
    var ctx = canvas1.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "#00f";
    ctx.fillRect(0, 0, 160, 160)
    ctx.fill();
    return ctx.canvas;
};

var createInterlace = function (size, color1, color2) {
    var proto = document.createElement("canvas").getContext("2d");
    proto.canvas.width = size * 2;
    proto.canvas.height = size * 2;
    proto.fillStyle = color1; // top-left
    proto.fillRect(0, 0, size, size);
    proto.fillStyle = color2; // top-right
    proto.fillRect(size, 0, size, size);
    proto.fillStyle = color2; // bottom-left
    proto.fillRect(0, size, size, size);
    proto.fillStyle = color1; // bottom-right
    proto.fillRect(size, size, size, size);
    var pattern = proto.createPattern(proto.canvas, "repeat");
    pattern.data = proto.canvas.toDataURL();
    return pattern;
};

var op_8x8 = createInterlace(40, "#FFF", "#eee");