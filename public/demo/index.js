(function() {
    let drawer = {
        option: {
            darkColor: '#000',
            lightColor: '#fff',
            innerTimes: 200,
            outerTimes: 1000,
            innerRadius: 0.25,
            innerPRadius: 0.25 / 3,
            rectWidth: 0.25 / 3,
            rectHeight: 0.25 / 15,
            outerRadius: 0.3,
            outerTextSize: 0.05,
            outerArr: [
                {txt: '坎', val: '010', type: 1},
                {txt: '艮', val: '001', type: 0},
                {txt: '坤', val: '000', type: 0},
                {txt: '震', val: '100', type: 0},
                {txt: '离', val: '101', type: 0},
                {txt: '兑', val: '110', type: 1},
                {txt: '乾', val: '111', type: 1},
                {txt: '巽', val: '011', type: 1}
            ]
        },
        init: function() {
            this.c = document.getElementById("canvas");
            this.ctx = this.c.getContext('2d');
            this.innerRorate = this.outerRorate = 0;
            this.innerStep = 2 * Math.PI / this.option.innerTimes;
            this.outerStep = 2 * Math.PI / this.option.outerTimes;
            this.animate();
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.outer = Math.min(drawer.w, drawer.h);
            drawer.innerRorate += drawer.innerStep;
            drawer.outerRorate -= drawer.outerStep;
        },
        draw: function() {
            let ctx = drawer.ctx;
            ctx.save();
            ctx.translate(drawer.w / 2, drawer.h / 2);
            drawer.drawInner();
            drawer.drawerOuter();
            ctx.restore();

        },
        drawInner: function() {
            let ctx = drawer.ctx,
                rotate = drawer.innerRorate,
                outer = drawer.outer,
                radius = drawer.option.innerRadius * outer,
                pRadius = drawer.option.innerPRadius * outer,
                darkColor = drawer.option.darkColor,
                lightColor = drawer.option.lightColor;
            ctx.save();
            ctx.rotate(rotate);

            ctx.beginPath();
            ctx.fillStyle = lightColor;
            ctx.arc(0, 0, radius, 0, Math.PI, true);
            ctx.arc(-radius / 2, 0, radius / 2, Math.PI, 0, false);
            ctx.arc(radius / 2, 0, radius / 2, Math.PI, 0, true);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = darkColor;
            ctx.arc(0, 0, radius, 0, Math.PI, false);
            ctx.arc(-radius / 2, 0, radius / 2, Math.PI, 0, false);
            ctx.arc(radius / 2, 0, radius / 2, Math.PI, 0, true);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = lightColor;
            ctx.arc(-radius / 2, 0, pRadius / 2, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = darkColor;
            ctx.arc(radius / 2, 0, pRadius / 2, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.restore();
        },
        drawerOuter: function() {
            debugger
            let ctx = drawer.ctx,
                rotate = drawer.outerRorate,
                outer = drawer.outer,
                radius = drawer.option.outerRadius * outer,
                darkColor = drawer.option.darkColor,
                lightColor = drawer.option.lightColor,
                rectWidth = drawer.option.rectWidth * outer,
                rectHeight = drawer.option.rectHeight * outer,
                arr = drawer.option.outerArr,
                outerTextSize = drawer.option.outerTextSize * outer,
                step = Math.PI / 4;

            arr.forEach(function(item, index) {
                ctx.save();
                ctx.rotate(rotate + step * index);
                let valArr = item.val.split('');
                valArr.forEach(function(val, index) {
                    let x = radius + 2 * index * rectHeight;
                    if (val == '1') {
                        ctx.beginPath();
                        ctx.fillStyle = lightColor;
                        ctx.fillRect(x, -rectWidth / 2, rectHeight, rectWidth);
                    } else if (val == '0') {
                        ctx.beginPath();
                        ctx.fillStyle = darkColor;
                        ctx.fillRect(x, -rectWidth / 2, rectHeight, 0.4 * rectWidth);

                        ctx.beginPath();
                        ctx.fillStyle = darkColor;
                        ctx.fillRect(x, 0.1 * rectWidth, rectHeight, 0.4 * rectWidth);
                    }
                });

                ctx.save();
                ctx.rotate(-Math.PI / 2);
                ctx.beginPath();
                ctx.fillStyle = item.type == 1 ? '#fff' : '#000';
                ctx.font = outerTextSize + 'px cursive';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(item.txt, 0, radius + 6 * rectHeight);

                ctx.restore();
                ctx.restore();
            });

        }

    };
    drawer.init();
})();
