(function() {
    let option = {
        lineNum: 5,
        outer: 10,
        minStep: 15,
        maxStep: 30,
        lineColor: 'rgba(255, 255, 255, 0.6)'
    };
    let canvas = document.getElementById('canvas'),
        markCanvas = getMarkCanvas(),
        w = canvas.width = window.innerWidth, 
        h = canvas.height = window.innerHeight, 
        context = canvas.getContext('2d'), 
        maxLength = Math.sqrt(w * w + h * h) + 10, 
        minLength = maxLength * 0.8, 
        lines = [];
    const deg = Math.PI / 6;

    $(window).resize(function() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    loadLines(3);

    draw();
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        lines.forEach(function(item) {
            item.index = item.index | 0;
            context.save();
            context.strokeStyle = option.lineColor;
            context.translate(item.sx, item.sy);
            context.rotate(item.ro);
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(item.index, 0);
            context.stroke();
            context.restore();
            item.index += item.step;
        });
        lines = lines.filter(function(item) {
            return item.index <= item.length;
        });
        if (option.lineNum > lines.length) {
            lines.push(randomLine());
        }
        drawMark();
        requestAnimationFrame(draw);
    }

    function loadLines(num) {
        for (let i = 0; i < num; i++) {
            lines.push(randomLine());
        }
    }

    function randomLine() {
        let sx, sy;
        let ro = random(2 * Math.PI);
        if (ro > 0 && ro <= 1 * deg) {
            sx = random(-option.outer, 0);
            sy = random(0, h / 2);
        } else if (ro > 1 * deg && ro <= 2 * deg) {
            sx = random(-option.outer, 0);
            sy = random(-option.outer, 0);
        } else if (ro > 2 * deg && ro <= 3 * deg) {
            sx = random(0, w / 2);
            sy = random(-option.outer, 0);
        } else if (ro > 3 * deg && ro <= 4 * deg) {
            sx = random(w / 2, w);
            sy = random(-option.outer, 0);
        } else if (ro > 4 * deg && ro <= 5 * deg) {
            sx = random(w, w + option.outer);
            sy = random(-option.outer, 0);
        } else if (ro > 5 * deg && ro <= 6 * deg) {
            sx = random(w, w + option.outer);
            sy = random(0, h / 2);
        } else if (ro > 6 * deg && ro <= 7 * deg) {
            sx = random(w, w + option.outer);
            sy = random(h / 2, h);
        } else if (ro > 7 * deg && ro <= 8 * deg) {
            sx = random(w, w + option.outer);
            sy = random(h, h + option.outer);
        } else if (ro > 8 * deg && ro <= 9 * deg) {
            sx = random(w / 2, w);
            sy = random(h, h + option.outer);
        } else if (ro > 9 * deg && ro <= 10 * deg) {
            sx = random(0, w / 2);
            sy = random(h, h + option.outer);
        } else if (ro > 10 * deg && ro <= 11 * deg) {
            sx = random(-option.outer, 0);
            sy = random(h, h + option.outer);
        } else if (ro > 11 * deg && ro <= 12 * deg) {
            sx = random(-option.outer, 0);
            sy = random(h / 2, h);
        }

        return {
            sx: sx,
            sy: sy,
            length: random(minLength, maxLength),
            ro: ro,
            step: random(option.minStep, option.maxStep)
        };
    }
    function drawMark() {
        context.drawImage(markCanvas, w - markCanvas.width, h - markCanvas.height);
    }
})();
