(function() {
    let drawer = {
        option: {
        },
        init: function() {
            this.c = document.getElementById("canvas");
            this.ctx = this.c.getContext('2d');
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            // requestAnimationFrame(drawer.animate);
        },
        update: function() {
        },
        draw: function() {
        }
    };
    drawer.init();
})();
