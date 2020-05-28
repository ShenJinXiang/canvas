(() => {
    const option = {
        background: '#061928',
        elementStrokeColor: 'rgba(255, 255, 255, 0.5)',
        marksLength: 5000,
        cs: [
            {radius: 200, beginAngle: 0, angleStep: Math.PI / 360, counterclockwise: false},
            {radius: 100, beginAngle: 0, angleStep: Math.PI / 360, counterclockwise: false}
        ]
    };
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    class Element {
        constructor(radius, beginAngle, angleStep, counterclockwise) {
            this.radius = radius;
            this.beginAngle = beginAngle;
            this.angle = this.beginAngle;
            this.angleStep = angleStep;
            this.counterclockwise = !!counterclockwise;
        }
        setOrigin(origin) {
            this.origin = origin;
        }
        setNext(next) {
            this.next = next;
        }

    }

    const drawer = {
        start() {

        }
    };
    drawer.start();
})();
