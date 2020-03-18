(function(win) {
    var mosaicMaps = {
        option: {
            gridWidth: 100,
            lightColor: '#f1f1f1',
            darkColor: '#333'
        },
        init: function() {
            mosaicMaps.canvas = document.getElementById('canvas');
            mosaicMaps.w = mosaicMaps.canvas.width = win.innerWidth;
            mosaicMaps.h = mosaicMaps.canvas.height = win.innerHeight;
            mosaicMaps.context = mosaicMaps.canvas.getContext('2d');

            mosaicMaps.grid(100, 100);
        },
        grid: function(x, y) {
            mosaicMaps.mGrid(x, y, -1, -1);
            mosaicMaps.mGrid(x, y, 1, -1);
            mosaicMaps.mGrid(x, y, -1, 1);
            mosaicMaps.mGrid(x, y, 1, 1);
        },
        mGrid: function(x, y, scx, scy) {
            var ctx = mosaicMaps.context;
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
        }
    };

    win.mosaicMaps = mosaicMaps;
    mosaicMaps.init();
})(window);
