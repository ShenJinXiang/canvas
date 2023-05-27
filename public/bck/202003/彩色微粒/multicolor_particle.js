(function() {
    const option = {
        num: 400,
        radius: 3,
        connect_distance: 80,
        min_velocity: 0.5,
        max_velocity: 1.5
    };
    let canvas = document.getElementById('canvas');
    let particles = [],
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        context = canvas.getContext('2d'),
        markCanvas = getMarkCanvas();

    loadParticles();
    animate(); 

    $(window).resize(function() {
        width = context.canvas.width = window.innerWidth;
        height = context.canvas.height = window.innerHeight;
    });

    function loadParticles() {
        for (let i = 0; i < option.num; i++){
            particles.push({
                x: random(0 + option.radius, width - option.radius),
                y: random(0 + option.radius, height - option.radius),
                vx: randomOne() * random(option.min_velocity, option.max_velocity),
                vy: randomOne() * random(option.min_velocity, option.max_velocity)
            });
        }
    }

    function animate() {
        draw();
        update();
        requestAnimationFrame(animate);
    }

    function draw() {
        drawParticles();
        drawConnectLines();
        drawMark();

        function drawParticles() {
            context.clearRect(0, 0, width, height);
            particles.forEach(function(item) {
                let distance = getDistance(width / 2, height, item.x, item.y);
                item.distance = distance;
                context.beginPath();
                context.fillStyle = 'hsla(' + distance  + ', 30%, 30%, 1)';
                context.arc(item.x, item.y, option.radius, 0, 2 * Math.PI, false);
                context.fill();
            });
        }

        function drawConnectLines() {
            let p1, p2, distance;
            for (let i = 0; i < option.num - 1; i++) {
                p1 = particles[i];
                for (let j = i + 1; j < option.num; j++) {
                    p2 = particles[j];
                    distance = getDistance(p1.x, p1.y, p2.x, p2.y);
                    if (distance < option.connect_distance) {
                        context.strokeStyle = 'hsla(' + p1.distance + ', 50%, 50%, ' + (1 - distance / option.connect_distance) + ')';
                        context.beginPath();
                        context.moveTo(p1.x, p1.y);
                        context.lineTo(p2.x, p2.y);
                        context.stroke();
                    }
                }
            }
        }

        function drawMark() {
            context.drawImage(markCanvas, width - markCanvas.width, height - markCanvas.height);
        }
    }

    function update() {
        particles.forEach(function(item) {
            item.x += item.vx;
            item.y += item.vy;
            if (item.x <= 0) {
                item.x = 0;
                item.vx *= -1;
            } else if (item.x > width) {
                item.x = width;
                item.vx *= -1;
            }
            if (item.y <= 0) {
                item.y = 0;
                item.vy *= -1;
            } else if (item.y > height) {
                item.y = height;
                item.vy *= -1;
            }
        });
    }

    function getDistance(sx, sy, ex, ey) {
        return Math.sqrt(Math.pow(sx - ex, 2) + Math.pow(sy - ey, 2));
    }

    function randomOne() {
        return random(-1, 1) >= 0 ? 1 : -1;
    }

})();
