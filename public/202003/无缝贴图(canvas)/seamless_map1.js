(function(win) {
    var mosaicMaps = {
        option: {
            gridWidth: 100,
            lightColor: '#fff',
            darkColor: '#048'
        },
        init: function() {
            mosaicMaps.canvas = document.getElementById('canvas');
            mosaicMaps.w = mosaicMaps.canvas.width = win.innerWidth;
            mosaicMaps.h = mosaicMaps.canvas.height = win.innerHeight;
            mosaicMaps.context = mosaicMaps.canvas.getContext('2d');

            mosaicMaps.tempCanvas = document.createElement('canvas');
            mosaicMaps.tempCanvas.width = mosaicMaps.option.gridWidth;
            mosaicMaps.tempCanvas.height = mosaicMaps.option.gridWidth;
            mosaicMaps.tempContext = mosaicMaps.tempCanvas.getContext('2d');

            mosaicMaps.grid(mosaicMaps.tempContext, mosaicMaps.tempCanvas.width / 2, mosaicMaps.tempCanvas.height / 2);
            mosaicMaps.background();

            $(window).resize(function() {
                mosaicMaps.w = mosaicMaps.canvas.width = win.innerWidth;
                mosaicMaps.h = mosaicMaps.canvas.height = win.innerHeight;
                mosaicMaps.background();
            });

        },
        grid: function(ctx, x, y) {
            mosaicMaps.mGrid(ctx, x, y, -1, -1);
            mosaicMaps.mGrid(ctx, x, y, 1, -1);
            mosaicMaps.mGrid(ctx, x, y, -1, 1);
            mosaicMaps.mGrid(ctx, x, y, 1, 1);
        },
        mGrid: function(ctx, x, y, scx, scy) {
            var gw = mosaicMaps.option.gridWidth / 2;
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(scx, scy);
            ctx.fillStyle = mosaicMaps.option.lightColor;
            ctx.fillRect(0, 0, gw, gw);
            ctx.fillStyle = mosaicMaps.option.darkColor;
            ctx.fillRect(0, 0, gw * .5, gw * .1);
            ctx.fillRect(0, 0, gw * .1, gw * .5);
            ctx.fillRect(gw * .3, gw * .3, gw * .2, gw * .2);
            ctx.fillRect(gw * .0, gw * .7, gw * .1, gw * .2);
            ctx.fillRect(gw * .7, gw * .0, gw * .2, gw * .1);
            ctx.fillRect(gw * .7, gw * .3, gw * .2, gw * .6);
            ctx.fillRect(gw * .3, gw * .7, gw * .6, gw * .2);
            ctx.restore();
        },
        background: function() {
            var ctx = mosaicMaps.context;
            ctx.fillStyle = ctx.createPattern(mosaicMaps.tempCanvas, 'repeat');
            ctx.fillRect(0, 0, mosaicMaps.canvas.width, mosaicMaps.canvas.height);
        }
    };

    win.mosaicMaps = mosaicMaps;
    mosaicMaps.init();
})(window);
