(function() {
    let config = {
		width: window.innerWidth,
		height: window.innerHeight,
		background: '#fefefe',
		ballColor: 'rgba(200, 200, 200, 0.4)',
		min: 0.5,
		max: 20,
		maxV: 1,
		size: 70,
		maxLine: 200,
		lineColor: 'rgba(220, 220, 220, 0.5)'
    };
    var canvas = document.getElementById("canvas");
    let w = canvas.width = config.width;
    let h = canvas.height = config.height;
    var context = canvas.getContext('2d');
    var markCanvas = getMarkCanvas();
    
    var balls = [];

    $(window).resize(function() {
        config.width = canvas.width = window.innerWidth;
        config.height = canvas.height = window.innerHeight;
    });
    initBalls();
    animate();

    function animate() {
        drawBalls();
        context.drawImage(markCanvas, canvas.width - markCanvas.width, canvas.height - markCanvas.height);
        update();
        requestAnimationFrame(animate);
    }


    function drawBalls() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = config.background;
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = config.ballColor;
        context.strokeStyle = config.lineColor;
        for (let i = 0 ; i < balls.length; i++) {
            let b = balls[i];
            context.beginPath();
            context.arc(b.x, b.y, b.r, 0, 2 * Math.PI, false);
            context.closePath();
            context.fill();

            for (let j = i + 1; j < balls.length; j++) {
                let d = balls[j];
                if (distance(b, d) < config.maxLine) {
                    context.beginPath();
                    context.lineWidth = 1;
                    context.moveTo(b.x, b.y);
                    context.lineTo(d.x, d.y);
                    context.stroke();
                }
            }

        }
    }

    function update() {
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            b.x += b.vx;
            b.y += b.vy;
            if (b.x <= 0) {
                b.x = 0;
                b.vx *= -1;
            } else if (b.x > canvas.width) {
                b.x = canvas.width;
                b.vx *= -1;
            }
            if (b.y <= 0) {
                b.y = 0;
                b.vy *= -1;
            } else if (b.y > canvas.height) {
                b.y = canvas.height;
                b.vy *= -1;
            }
        }
    }

    function initBalls() {
        for (let i = 0; i < config.size; i++) {
            let ball = new Ball(
                random(0, canvas.width),
                random(0, canvas.height),
                random(config.min, config.max),
                random(-config.maxV, config.maxV),
                random(-config.maxV, config.maxV)
            );
            balls.push(ball);
        }
    }

    function Ball(x, y, r, vx, vy) {
        this.x = x;	
        this.y = y;	
        this.r = r;	
        this.vx = vx;	
        this.vy = vy;	
    }

    function distance(b1, b2) {
        let d = (b1.x - b2.x) * (b1.x - b2.x) + (b1.y - b2.y) * (b1.y - b2.y);
        return Math.sqrt(d);
    }

})();
