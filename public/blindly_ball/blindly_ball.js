(function() {
    colors = [
        "#ffff00", "#ffff33", "#ffff66", "#ffff99", "#ffffcc", "#ffffff",  "#ccffff", "#ccffcc", "#ccff99", "#ccff66", "#ccff33", "#ccff00", 
        "#ffcc00", "#ffcc33", "#ffcc66", "#ffcc99", "#ffcccc", "#ffccff",  "#ccccff", "#cccccc", "#cccc99", "#cccc66", "#cccc33", "#cccc00", 
        "#ff9900", "#ff9933", "#ff9966", "#ff9999", "#ff99cc", "#ff99ff",  "#cc99ff", "#cc99cc", "#cc9999", "#cc9966", "#cc9933", "#cc9900", 
        "#ff6600", "#ff6633", "#ff6666", "#ff6699", "#ff66cc", "#ff66ff",  "#cc66ff", "#cc66cc", "#cc6699", "#cc6666", "#cc6633", "#cc6600", 
        "#ff3300", "#ff3333", "#ff3366", "#ff3399", "#ff33cc", "#ff33ff",  "#cc33ff", "#cc33cc", "#cc3399", "#cc3366", "#cc3333", "#cc3300", 
        "#ff0000", "#ff0033", "#ff0066", "#ff0099", "#ff00cc", "#ff00ff",  "#cc00ff", "#cc00cc", "#cc0099", "#cc0066", "#cc0033", "#cc0000", 
    
        "#660000", "#660033", "#660066", "#660099", "#6600cc", "#6600ff",  "#9900ff", "#9900cc", "#990099", "#990066", "#990033", "#990000", 
        "#663300", "#663333", "#663366", "#663399", "#6633cc", "#6633ff",  "#9933ff", "#9933cc", "#993399", "#993366", "#993333", "#993300", 
        "#666600", "#666633", "#666666", "#666699", "#6666cc", "#6666ff",  "#9966ff", "#9966cc", "#996699", "#996666", "#996633", "#996600", 
        "#669900", "#669933", "#669966", "#669999", "#6699cc", "#6699ff",  "#9999ff", "#9999cc", "#999999", "#999966", "#999933", "#999900", 
        "#66cc00", "#66cc33", "#66cc66", "#66cc99", "#66cccc", "#66ccff",  "#99ccff", "#99cccc", "#99cc99", "#99cc66", "#99cc33", "#99cc00", 
        "#66ff00", "#66ff33", "#66ff66", "#66ff99", "#66ffcc", "#66ffff",  "#99ffff", "#99ffcc", "#99ff99", "#99ff66", "#99ff33", "#99ff00", 
    
        "#33ff00", "#33ff33", "#33ff66", "#33ff99", "#33ffcc", "#33ffff",  "#00ffff", "#00ffcc", "#00ff99", "#00ff66", "#00ff33", "#00ff00", 
        "#33cc00", "#33cc33", "#33cc66", "#33cc99", "#33cccc", "#33ccff",  "#00ccff", "#00cccc", "#00cc99", "#00cc66", "#00cc33", "#00cc00", 
        "#339900", "#339933", "#339966", "#339999", "#3399cc", "#3399ff",  "#0099ff", "#0099cc", "#009999", "#009966", "#009933", "#009900", 
        "#336600", "#336633", "#336666", "#336699", "#3366cc", "#3366ff",  "#0066ff", "#0066cc", "#006699", "#006666", "#006633", "#006600", 
        "#333300", "#333333", "#333366", "#333399", "#3333cc", "#3333ff",  "#0033ff", "#0033cc", "#003399", "#003366", "#003333", "#003300", 
        "#330000", "#330033", "#330066", "#330099", "#3300cc", "#3300ff",  "#0000ff", "#0000cc", "#000099", "#000066", "#000033", "#000000"
    ];
    var option = {
        num: 80,
        minR: 10,
        maxR: 20,
        maxV: 0.8,
        bufWidth: 10
    }

	var canvas = document.getElementById('canvas');
	var markCanvas = getMarkCanvas();
	var context = canvas.getContext('2d');

    var balls = [];
    var timer;
    start();

    $(window).resize(function() {
        if (timer) {
            clearInterval(timer);
        }
        start();
    });

    function start() {
        balls = [];
        canvas.width = window.innerWidth;
        canvas.height = window. innerHeight;
        loadBalls();

        timer = setInterval(function() {
            draw();
            update();
        }, 20);
    }
    
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#000';
        context.fillRect(0, 0, canvas.width, canvas.height);
        balls.forEach(function(item) {
            context.beginPath();
            context.fillStyle = item.color;
            context.arc(item.x, item.y, item.r, 0, 2 * Math.PI, false);
            context.fill();
        });
		context.drawImage(markCanvas, canvas.width - markCanvas.width, canvas.height - markCanvas.height);
    }
    function update() {
        balls.forEach(function(item) {
            item.x += item.vx;
            item.y += item.vy;
            if (item.x < 0 || item.x > canvas.width) {
                item.vx = -item.vx;
            }
            if (item.y < 0 || item.y > canvas.height) {
                item.vy = -item.vy;
            }
        });
    }

    function loadBalls() {
        for (var i = 0; i < option.num; i++) {
            balls.push({
                x: random(-option.bufWidth, canvas.width + option.bufWidth),
                y: random(-option.bufWidth, canvas.height + option.bufWidth),
                r: random(option.minR, option.maxR),
                vx: random(-option.maxV, option.maxV),
                vy: random(-option.maxV, option.maxV),
                color: colors[randomInt(colors.length)]
            });
        }
    }

    function randomOne() {
        return random(-1, 1) >= 0 ? 1 : -1;
    }
})();
