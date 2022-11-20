(function () {
    let letterParticle = {
        Particle: function (x, y) {
            this.x = x;
            this.y = y;
            this.fillStyle = '#fff';
            this.w = 3.5;
            this.h = 3.5;
            this.draw = function (ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fillStyle = this.fillStyle;
                ctx.fillRect(0, 0, this.w, this.h);
                ctx.restore();
            }
        },
        init: function () {
            letterParticle.canvas = document.getElementById('canvas');
            letterParticle.canvas.width = window.innerWidth;
            letterParticle.canvas.height = window.innerHeight;
            letterParticle.context = letterParticle.canvas.getContext('2d');
            letterParticle.tempCanvas = document.createElement('canvas');
            letterParticle.tempCanvas.width = window.innerWidth;
            letterParticle.tempCanvas.height = window.innerHeight;
            letterParticle.tempContext = letterParticle.tempCanvas.getContext('2d');
            letterParticle.markCanvas = getMarkCanvas();
            letterParticle.particles = [];
            letterParticle.particlePositions = [];
            letterParticle.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890".split("");
            letterParticle.currentPos = 0;

            letterParticle.createParticles();
            letterParticle.animate();
            letterParticle.createParticlePostions();
            setInterval(function () {
                letterParticle.changeLetter();
                letterParticle.createParticlePostions();
            }, 1200);

            $(window).resize(function () {
                letterParticle.canvas.width = window.innerWidth;
                letterParticle.canvas.height = window.innerHeight;
                letterParticle.tempCanvas.width = window.innerWidth;
                letterParticle.tempCanvas.height = window.innerHeight;
            });

        },
        changeLetter: function () {
            letterParticle.currentPos++;
            if (letterParticle.currentPos >= letterParticle.letters.length) {
                letterParticle.currentPos = 0;
            }
        },
        createParticlePostions: function () {
            letterParticle.tempContext.clearRect(0, 0, letterParticle.tempCanvas.width, letterParticle.tempCanvas.height);
            letterParticle.tempContext.textAlign = 'center';
            letterParticle.tempContext.textBaseline = 'middle';
            letterParticle.tempContext.fillStyle = 'red';
            letterParticle.tempContext.font = 'italic bold 330px Noto Serif';
            letterParticle.tempContext.fillText(letterParticle.letters[letterParticle.currentPos], letterParticle.tempCanvas.width / 2, letterParticle.tempCanvas.height / 2);
            let imgData = letterParticle.tempContext.getImageData(0, 0, letterParticle.tempCanvas.width, letterParticle.tempCanvas.height);
            let buffer32 = new Uint32Array(imgData.data.buffer);
            letterParticle.particlePositions = [];

            for (let y = 0; y < letterParticle.tempCanvas.height; y += 6) {
                for (let x = 0; x < letterParticle.tempCanvas.width; x += 6) {
                    if (buffer32[y * letterParticle.tempCanvas.width + x]) {
                        letterParticle.particlePositions.push({ x: x, y: y });
                    }
                }
            }
        },
        createParticles: function () {
            for (let i = 0; i < 1000; i++) {
                let p = new letterParticle.Particle(letterParticle.canvas.width / 2 - 200 + Math.random() * 400, letterParticle.canvas.height / 2 - 200 + Math.random() * 400);
                letterParticle.particles.push(p);
            }
        },
        animate: function () {
            requestAnimationFrame(letterParticle.animate);
            letterParticle.context.clearRect(0, 0, letterParticle.canvas.width, letterParticle.canvas.height);
            letterParticle.context.fillStyle = 'rgba(10, 10, 10, .8)';
            letterParticle.context.fillRect(0, 0, letterParticle.canvas.width, letterParticle.canvas.height);
            let p, pPos;
            for (let i = 0; i < letterParticle.particles.length; i++) {
                p = letterParticle.particles[i];
                pPos = letterParticle.particlePositions[i];
                if (letterParticle.particles.indexOf(p) === letterParticle.particlePositions.indexOf(pPos)) {
                    p.x += (pPos.x - p.x) * .3;
                    p.y += (pPos.y - p.y) * .3;
                    p.draw(letterParticle.context);
                }
            }
            letterParticle.context.drawImage(letterParticle.markCanvas, letterParticle.canvas.width - letterParticle.markCanvas.width, letterParticle.canvas.height - letterParticle.markCanvas.height);
        }
    };
    letterParticle.init();
})();
