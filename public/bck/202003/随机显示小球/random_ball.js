(function (){
	// 配置信息
	var config = {
		num: 20,
		minr: 20,
		maxr: 40,
		bcolor: '#059',
		ccolor: 'red'
	};

	var canvas = document.getElementById('canvas');
	var markCanvas = getMarkCanvas();
	canvas.width = window.innerWidth;
	canvas.height = window. innerHeight;
	var context = canvas.getContext('2d');

	var balls = [];
	var box = canvas.getBoundingClientRect();

	init();

	// 初始化
	function init() {
		for (var i = 0; i < config.num; i++) {
            if (i == 0) {
                balls[0] = randomBall();
            } else {
                var flag = true;
                while(flag) {
                    var obj = randomBall();
                    flag = !checkBall(obj, i);
                }
                balls[i] = obj;
            }
		}
		draw();

        function checkBall(obj, i) {
            var flag = true;
            for (var j = 0; j < i; j++) {
                var xydis = Math.pow((balls[j].x - obj.x), 2) + Math.pow((balls[j].y - obj.y), 2);
                var rdis = Math.pow(balls[j].r + obj.r, 2);

                if (xydis <= rdis) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }

        function randomBall() {
            return {
				x: config.maxr + Math.random() * (canvas.width - 2 * config.maxr),
				y: config.maxr + Math.random() * (canvas.height - 2 * config.maxr),
				r: Math.random() * (config.maxr - config.minr) + config.minr
            };
        }
	}

	// 绑定事件
	canvas.addEventListener('mousemove', draw, false);
	window.onresize = function () {
		init();
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
        draw()
	};

	function draw(e) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		var x = -1000, y = -1000;
		if (e) {
			x = e.clientX - box.left;
			y = e.clientY - box.top;
		}
		for (var i = 0; i < balls.length; i++) {
			context.beginPath();
			context.arc(balls[i].x, balls[i].y, balls[i].r, 0, 2 * Math.PI, false);
			if (context.isPointInPath(x, y)) {
				context.fillStyle = config.ccolor;
			} else {
				context.fillStyle = config.bcolor;
			}
			context.fill();
			context.closePath();
		}
		context.drawImage(markCanvas, canvas.width - markCanvas.width, canvas.height - markCanvas.height);
	}

	function getMarkCanvas() {
		var markCanvas = document.createElement('canvas');
		markCanvas.width = 400;
		markCanvas.height = 100;
		var ctx = markCanvas.getContext('2d');
		
		ctx.fillStyle = 'rgba(204, 204, 204, 0.5)';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.font = '40px cursive';
		ctx.fillText('canvas.shenjinxiang.com', markCanvas.width / 2, markCanvas.height / 2, 340);
		return markCanvas;
	}
})();
