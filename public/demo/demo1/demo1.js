(function() {
    let canvas = document.getElementById("canvas");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let context = canvas.getContext('2d');

    for (var i = 0; i <= w; i+=2) {
        for (var j = 0; j <= h; j+=2) {
            drawRect(i, j);
        }
    }

    function drawRect(x, y) {
		let d = getDistance(canvas.width / 2, x, h / 2, y);
		context.beginPath();
		context.fillStyle = 'hsla(' + d + ' , 50%, 30%, 1)';
        context.fillRect(x - 1, y - 1, 2, 2);
    }
    
    function getDistance(x1, x2, y1, y2) {
        let a = x1 - x2,
            b = y1 - y2;
        return Math.sqrt(a * a + b * b);
    }
})();
