function addEvent(obj, type, handle) {
    try { // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        obj.addEventListener(type,handle,false);
    } catch(e){
        try { // IE8.0及其以下版本
            obj.attachEvent('on' + type,handle);
        } catch(e) { // 早期浏览器
            obj['on' + type] = handle;
        }
    }
}

function addClass(obj, name) {
    var cn = obj.className;
    var reg = /\S+/g
    var arr = cn.match(reg);
    if (arr.indexOf(name) < 0) {
        arr.push(name);
        obj.className = arr.join(' ');
    }
}

function removeClass(obj, name) {
    var cn = obj.className;
    var reg = /\S+/g
    var arr = cn.match(reg);
    obj.className = arr.filter(function(val) {
        return name != val;
    }).join(' ');
}

function random() {
    if (arguments.length == 0) {
        return Math.random();
    }
    if (arguments.length == 1) {
        return Math.random() * arguments[0];
    }
    var min = Math.min(...arguments);
    var max = Math.max(...arguments);
    return (max - min) * Math.random() + min;
}

function randomInt() {
    return Math.floor(random(...arguments));
}

function getMarkCanvas(style) {
    var markCanvas = document.createElement('canvas');
    markCanvas.width = 340;
    markCanvas.height = 100;
    var ctx = markCanvas.getContext('2d');
    
    ctx.fillStyle = style || 'rgba(204, 204, 204, 0.5)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '40px cursive';
    ctx.fillText('shenjinxiang.com', markCanvas.width / 2, markCanvas.height / 2 );
    return markCanvas;
}

const CanvasUtil = {
    createCanvas(width, height) {
        let canvas = document.createElement('canvas'),
            w = canvas.width = width,
            h = canvas.height = height,
            context = canvas.getContext('2d');
        return {canvas, w, h, context }
    },
    distance(sx, sy, ex, ey) {
        return Math.sqrt(Math.pow(sx - ex, 2) + Math.pow(sy - ey, 2));
    },
    line(ctx, sx, sy, ex, ey, color, width) {
        ctx.save();
        ctx.strokeStyle = !color ? '#000': color;
        ctx.lineWidth = !width ? 1 : width;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.restore();
    },
    getMarkCanvas(fillStyle) {
        let markCanvas = document.createElement('canvas');
        markCanvas.width = 240;
        markCanvas.height = 60;
        let ctx = markCanvas.getContext('2d');

        ctx.fillStyle = fillStyle ? fillStyle : 'rgba(250, 250, 250, 0.5)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '30px cursive';
        ctx.fillText('shenjinxiang.com', markCanvas.width / 2, markCanvas.height / 2 );
        return markCanvas;
    },
    drawMark(ctx, mark) {
        ctx.drawImage(mark, ctx.canvas.width - mark.width, ctx.canvas.height - mark.height);
    },
    windowToCanvas(canvas, x, y) {
        let box = canvas.getBoundingClientRect();
        return {
            x: x - box.left,
            y: y - box.top
        };
    },
    fillHeart(ctx, ox, oy, radius, fillStyle) {
        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = fillStyle;
        this.pathHeart(ctx, radius);
        ctx.fill();
        ctx.restore();
    },
    strokeHeart(ctx, ox, oy, radius, lineWidth, strokeStyles) {
        ctx.save();
        ctx.translate(ox, oy);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyles;
        this.pathHeart(ctx, radius);
        ctx.stroke();
        ctx.restore();
    },
    pathHeart(ctx, radius) {
        ctx.beginPath();
        for (let angle = 0; angle < 2 * Math.PI; angle += 0.01 ) {
            ctx.lineTo(
                radius * 16 * Math.pow(Math.sin(angle), 3),
                -radius * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle))
            );
        }
    }
};
