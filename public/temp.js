window.onload = function () {
    //functions definition

    //class definition
    class segm {
        constructor(x, y, l) {
            this.b = Math.random()*1.9+0.1;
            this.x0 = x;
            this.y0 = y;
            this.a = Math.random() * 2 * Math.PI;
            this.x1 = this.x0 + l * Math.cos(this.a);
            this.y1 = this.y0 + l * Math.sin(this.a);
            this.l = l;
        }
        update(x, y) {
            this.x0 = x;
            this.y0 = y;
            this.a = Math.atan2(this.y1 - this.y0, this.x1 - this.x0);
            this.x1 = this.x0 + this.l * Math.cos(this.a);
            this.y1 = this.y0 + this.l * Math.sin(this.a);
        }
    }
    class rope {
        constructor(tx, ty, l, b, slq, typ) {
            if(typ == "l"){
                this.res = l / 2;
            }else{
                this.res = l / slq;
            }
            this.type = typ;
            this.l = l;
            this.segm = [];
            this.segm.push(new segm(tx, ty, this.l / this.res));
            for (let i = 1; i < this.res; i++) {
                this.segm.push(
                    new segm(this.segm[i - 1].x1, this.segm[i - 1].y1, this.l / this.res)
                );
            }
            this.b = b;
        }
        update(t) {
            this.segm[0].update(t.x, t.y);
            for (let i = 1; i < this.res; i++) {
                this.segm[i].update(this.segm[i - 1].x1, this.segm[i - 1].y1);
            }
        }
        show() {
            if(this.type == "l"){
                c.beginPath();
                for (let i = 0; i < this.segm.length; i++) {
                    c.lineTo(this.segm[i].x0, this.segm[i].y0);
                }
                c.lineTo(
                    this.segm[this.segm.length - 1].x1,
                    this.segm[this.segm.length - 1].y1
                );
                c.strokeStyle = "white";
                c.lineWidth = this.b;
                c.stroke();

                c.beginPath();
                c.arc(this.segm[0].x0, this.segm[0].y0, 1, 0, 2 * Math.PI);
                c.fillStyle = "white";
                c.fill();

                c.beginPath();
                c.arc(
                    this.segm[this.segm.length - 1].x1,
                    this.segm[this.segm.length - 1].y1,
                    2,
                    0,
                    2 * Math.PI
                );
                c.fillStyle = "white";
                c.fill();
            }else{
                for (let i = 0; i < this.segm.length; i++) {
                    c.beginPath();
                    c.arc(this.segm[i].x0, this.segm[i].y0, this.segm[i].b, 0, 2*Math.PI);
                    c.fillStyle = "white";
                    c.fill();
                }
                c.beginPath();
                c.arc(
                    this.segm[this.segm.length - 1].x1,
                    this.segm[this.segm.length - 1].y1,
                    2, 0, 2*Math.PI
                );
                c.fillStyle = "white";
                c.fill();
            }
        }
    }

    //setting up canvas
    let c = init("canvas").c,
        canvas = init("canvas").canvas,
        w = (canvas.width = window.innerWidth),
        h = (canvas.height = window.innerHeight),
        ropes = [];

    //variables definition
    let nameOfVariable = "value",
        mouse = {},
        last_mouse = {},
        rl = 50,
        randl = [],
        target = { x: w/2, y: h/2 },
        last_target = {},
        t = 0,
        q = 10,
        da = [],
        type = "l";

    for (let i = 0; i < 100; i++) {
        if(Math.random() > 0.25){
            type = "l";
        }else{
            type = "o";
        }
        ropes.push(
            new rope(
                w / 2,
                h / 2,
                (Math.random() * 1 + 0.5) * 500,
                Math.random() * 0.4 + 0.1,
                Math.random()*15+5,
                type
            )
        );
        randl.push(Math.random() * 2 - 1);
        da.push(0);
    }

    //place for objects in animation
    function draw() {

        if (mouse.x) {
            target.errx = mouse.x - target.x;
            target.erry = mouse.y - target.y;
        } else {
            target.errx =
                w / 2 +
                (h / 2 - q) *
                Math.sqrt(2) *
                Math.cos(t) /
                (Math.pow(Math.sin(t), 2) + 1) -
                target.x;
            target.erry =
                h / 2 +
                (h / 2 - q) *
                Math.sqrt(2) *
                Math.cos(t) *
                Math.sin(t) /
                (Math.pow(Math.sin(t), 2) + 1) -
                target.y;
        }

        target.x += target.errx / 10;
        target.y += target.erry / 10;

        t += 0.01;

        for (let i = 0; i < ropes.length; i++) {
            if (randl[i] > 0) {
                da[i] += (1 - randl[i]) / 10;
            } else {
                da[i] += (-1 - randl[i]) / 10;
            }
            ropes[i].update({
                x:
                    target.x +
                    randl[i] * rl * Math.cos((i * 2 * Math.PI) / ropes.length + da[i]),
                y:
                    target.y +
                    randl[i] * rl * Math.sin((i * 2 * Math.PI) / ropes.length + da[i])
            });
            ropes[i].show();
        }
        last_target.x = target.x;
        last_target.y = target.y;
    }

    //mouse position
    canvas.addEventListener(
        "mousemove",
        function (e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        },
        false
    );

    canvas.addEventListener("mouseleave", function(e) {
        mouse.x = false;
        mouse.y = false;
    });

    //animation frame
    function loop() {
        window.requestAnimFrame(loop);
        c.clearRect(0, 0, w, h);
        draw();
    }

    //window resize
    window.addEventListener("resize", function () {
        (w = canvas.width = window.innerWidth),
            (h = canvas.height = window.innerHeight);
        loop();
    });

    //animation runner
    loop();
    setInterval(loop, 1000 / 60);
};