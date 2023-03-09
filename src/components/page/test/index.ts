import Animate from "@/lib/Animate";

class Element {
  x: number;
  y: number;
  radius: number;
  angleStep: number;
  current: number;
  ballColor: string;
  constructor(x: number, y: number, radius: number, angleStep: number, ballColor: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angleStep = angleStep;
    this.current = 0;
    this.ballColor = ballColor;
  }
  update() {
    this.current += this.angleStep;
  }
  draw(context: CanvasRenderingContext2D | null, ballRadius: number) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.x, this.y);
    context.fillStyle = this.ballColor;
    context.beginPath();
    context.arc(this.radius * Math.cos(this.current), 0, ballRadius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }
}

export default class Test extends Animate {
  private elementNumber: number = 24;
  private elements: Element[] = [];
  private ballRadius: number = 0;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }
  private initData() {
    this.elements = [];
    const baseAngle = Math.PI / 360;
    this.ballRadius = this.height * 0.015;
    const colorStep = 360 / this.elementNumber;
    for (let i = 0; i < this.elementNumber; i++) {
      this.elements.push(new Element(
        0.5 * this.width,
        this.height - (i * this.ballRadius),
        this.width * 0.3,
        Math.PI / 180 + (i * baseAngle),
        `hsla(${i * colorStep}, 80%, 60%, 1)`,
      ));
    }
  }

  update() {
    this.elements.forEach((item) => item.update());
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear();
    this.context.save();
    // this.context.fillStyle = '#084';
    // this.context.fillRect(100, 100, 340, 220);
    this.elements.forEach((item) => item.draw(this.context, this.ballRadius));

    this.context.restore();
  }
}

/*
T = 2 * Math.PI * Math.sqrt(radius / g);

w = 2 * Math.PI / T = 1 / Math.sqrt(radius / g);


*/