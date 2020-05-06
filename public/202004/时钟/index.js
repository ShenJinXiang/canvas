(function(){
	var config = {
		canvas : {
			width : window.innerWidth,
			height : window.innerHeight,
		},
		clock : {
			radius : 202,
			borderWidth : 12,
			origin : {
				radius : 8,
				color : '#333'
			},
			hand : {
				hour : {width : 5, length : 80},
				minute : {width : 2, length : 110},
				second : {length : 160}
			}
		}
	};

	window.onresize = function () {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};

	var canvas = document.getElementById('canvas');
	canvas.width = config.canvas.width;
	canvas.height = config.canvas.height;
	var context = canvas.getContext('2d');

	var currentDateObj;

	var img = new Image();
	img.src = './zq02.png';
	//img.src = './001.jpeg';

	img.onload = function () {
		setInterval(function(){
			update();
			draw();
		}, 500);
	};

	function update(){
		currentDateObj = getDateObj();

		function getDateObj() {
			var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
			var d = new Date();
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			var date = d.getDate();
			var day = d.getDay();
			var hour = d.getHours();
			var minute = d.getMinutes();
			var second = d.getSeconds();
			month = (month < 9) ? '0' + month : '' + month;
			date = (date < 9) ? '0' + date : '' + date;
			hour = (hour < 9) ? '0' + hour : '' + hour;
			minute = (minute < 9) ? '0' + minute : '' + minute;
			second = (second < 9) ? '0' + second : '' + second;
			var time = [hour, minute, second];
			var str = year + '-' + month + '-' + date + ' ' + week[day];
			return {
				dateStr: str,
				dateTime: time
			}
		}
	}

	function draw() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		drawBackgroundImage();
		drawBorder();
		drawScale();
		drawNumbers();
		drawTime();
		drawHand();
		drawOrigin();
		drawMarkCanvas();

		function drawBackgroundImage() {
			context.fillStyle = context.createPattern(img, 'repeat');
			context.fillRect(0, 0, canvas.width, canvas.height);
		}
		
		/**
		 * 绘制表盘边框
		 */
		function drawBorder() {
			context.beginPath();
			context.fillStyle = '#fff';
			context.arc(canvas.width / 2, canvas.height / 2, config.clock.radius, 0, 2 * Math.PI, false);
			context.shadowBlur = 20;
			context.shadowOffsetX = 5;
			context.shadowOffsetY = 5;
			context.fill();

			context.save();
			context.beginPath();
			context.arc(canvas.width / 2, canvas.height / 2, config.clock.radius, 0, 2 * Math.PI, false);
			context.arc(canvas.width / 2, canvas.height / 2, config.clock.radius - config.clock.borderWidth, 0, 2 * Math.PI, true);
			context.fillStyle = "#333";
			context.shadowColor = "#444";
			context.shadowBlur = 15;
			context.shadowOffsetX = 5;
			context.shadowOffsetY = 5;
			context.closePath();
			context.fill();
			context.restore();
		}

		/**
		 * 绘制中心圆点
		 */
		function drawOrigin() {
			context.save();
			context.beginPath();
			context.arc(canvas.width / 2, canvas.height / 2, config.clock.origin.radius, 0, 2 * Math.PI, false);
			context.fillStyle = config.clock.origin.color;
			context.shadowColor = "#444";
			context.shadowBlur = 3;
			context.shadowOffsetX = 2;
			context.shadowOffsetY = 2;
			context.closePath();
			context.fill();
			context.restore();
		}

		/**
		 * 绘制表盘刻度
		 */
		function drawScale() {
			for(var i = 0; i < 60; i++) {
				var obj = {
					sx : config.clock.radius - 15 - config.clock.borderWidth,
					sy : 0,
					ex : config.clock.radius - config.clock.borderWidth - 5,
					ey : 0,
					color : "#333",
					width : 1
				};
				context.save();
				context.translate(canvas.width / 2, canvas.height / 2);
				context.rotate(i * 6 * Math.PI / 180);
				context.beginPath();
				if(i % 5 == 0) {
					obj.width = 3;
					obj.color = "#000";
				}
				if(i % 15 == 0) {
					obj.sx = config.clock.radius - 20 - config.clock.borderWidth;
				}
				context.moveTo(obj.sx, obj.sy);
				context.lineTo(obj.ex, obj.ey);
				context.strokeStyle = obj.color;
				context.lineWidth = obj.width;
				context.closePath();
				context.stroke();
				context.restore();
			}
		}

		/**
		 * 获取1-12数字
		 */
		function drawNumbers() {
			var radius = config.clock.radius - config.clock.borderWidth - 40;
			for(var i = 0; i < 12; i++) {
				context.save();
				context.beginPath();
				context.translate(canvas.width / 2, canvas.height / 2);
				context.font = "normal 28px Arial";
				if((i + 1) % 3 == 0) {
					context.font = "normal 36px Arial";
				}
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillStyle = '#000';
				context.fillText(i + 1, -radius * Math.cos((-i * 30 - 120) * Math.PI  / 180), radius * Math.sin((-i * 30 - 120) * Math.PI / 180));
				context.closePath();
				context.restore();
			}
		}

		/**
		 * 绘制下方的文字
		 */
		function drawTime() {
			context.save();
			context.translate(canvas.width / 2, canvas.height / 2);
			drawDateStr();
			drawTimeBox();
			drawTime();
			context.restore();

			/**
			 * 绘制 年月日星期信息
			 */
			function drawDateStr() {
				context.beginPath();
				context.font = "bold 14px Arial";
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.shadowColor = '#ccc';
				context.shadowBlur = 2;
				context.fillStyle = '#444';
				context.closePath();
				context.fillText(currentDateObj.dateStr, 0, 40);
			}

			/**
			 * 绘制显示时分秒的背景盒子
			 */
			function drawTimeBox() {
				context.beginPath();
				context.fillStyle = "#555";
				context.shadowColor = "#444";
				context.shadowBlur = 3;
				context.shadowOffsetX = 2;
				context.shadowOffsetY = 2;
				context.closePath();
				context.fillRect(-47, 60, 30, 30);
				context.fillRect(-15, 60, 30, 30);
				context.fillRect(17, 60, 30, 30);
			}

			/**
			 * 绘制时分秒数字
			 */
			function drawTime() {
				context.beginPath();
				context.font = "normal 14px Arial";
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillStyle = "#fff";
				context.closePath();
				context.fillText(currentDateObj.dateTime[0], -32, 75);
				context.fillText(currentDateObj.dateTime[1], 0, 75);
				context.fillText(currentDateObj.dateTime[2], 32, 75);
			}

		}

		/**
		 * 绘制时分秒针
		 */
		function drawHand() {

			var _hour = currentDateObj.dateTime[0] % 12;
			var _minute = currentDateObj.dateTime[1];
			var _second = currentDateObj.dateTime[2];
			drawHourHand();
			drawMinuteHand();
			drawSecondHand();

			// 时针
			function drawHourHand() {
				context.save();
				context.translate(canvas.width / 2, canvas.height / 2);
				context.rotate(((_hour + _minute / 60) - 3) * 30 * Math.PI / 180);
				context.beginPath();
				context.moveTo(-12, 0);
				context.lineTo(config.clock.hand.hour.length, 0);
				context.lineWidth = config.clock.hand.hour.width;
				context.strokeStyle = config.clock.origin.color;
				context.lineCap = "round";
				context.shadowColor = "#999";
				context.shadowBlur = 5;
				context.shadowOffsetX = 5;
				context.shadowOffsetY = 5;
				context.stroke();
				context.stroke();
				context.closePath();
				context.restore();
			}

			// 分针
			function drawMinuteHand() {
				context.save();
				context.translate(canvas.width / 2, canvas.height / 2);
				context.rotate((_minute - 15) * 6 * Math.PI / 180);
				context.beginPath();
				context.moveTo(-18, 0);
				context.lineTo(config.clock.hand.minute.length, 0);
				context.lineWidth = config.clock.hand.minute.width;
				context.strokeStyle = config.clock.origin.color;
				context.lineCap = "round";
				context.shadowColor = "#999";
				context.shadowBlur = 5;
				context.shadowOffsetX = 5;
				context.shadowOffsetY = 5;
				context.stroke();
				context.closePath();
				context.restore();
			}

			// 秒针
			function drawSecondHand() {
				context.save();
				context.translate(canvas.width / 2, canvas.height / 2);
				context.rotate((_second - 15) * 6 * Math.PI / 180);
				context.beginPath();
				context.moveTo(-35, 1.5);
				context.lineTo(0, 1.5);
				context.lineTo(config.clock.hand.second.length, 0.5);
				context.lineTo(config.clock.hand.second.length, -0.5);
				context.lineTo(0, -1.5);
				context.lineTo(-35, -1.5);
				context.closePath();
				context.fillStyle = "#f60";
				context.shadowColor = "#999";
				context.shadowBlur = 5;
				context.shadowOffsetX = 5;
				context.shadowOffsetY = 5;
				context.fill();
				context.restore();
			}

		}

		function drawMarkCanvas() {
			var markCanvas = getMarkCanvas();
			context.drawImage(markCanvas, canvas.width - markCanvas.width, canvas.height - markCanvas.height);
			function getMarkCanvas() {
				var markCanvas = document.createElement('canvas');
				markCanvas.width = 240;
				markCanvas.height = 60;
				var ctx = markCanvas.getContext('2d');
			
				ctx.fillStyle = 'rgba(250, 250, 250, 0.5)';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.font = '30px cursive';
				ctx.fillText('shenjinxiang.com', markCanvas.width / 2, markCanvas.height / 2, 380);
				return markCanvas;
			}
		}
	}
}());
