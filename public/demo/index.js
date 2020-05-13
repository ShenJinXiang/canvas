(() => {
    const option = {
        deepNum: 6,
        timeStep: 20,
        sleepTime: 20,
        color: '#0075c9',
    };
    class Element {
        constructor(sx, sy, width, angle, color, time, move, counterclockwise) {
            this.sx = sx;
            this.sy = sy;
            this.width = width;
            this.angle = angle;
            this.color = color;
            this.time = time;
            this.move = move;
            this.counterclockwise = counterclockwise;
        }
        draw(ctx) {
            
        }
    }
})();
