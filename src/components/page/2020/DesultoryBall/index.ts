import Animate from "@/lib/Animate";
import Circle from "@/lib/Circle";
import { FillOption } from "@/lib/DrawOption";
import { distance, random, randomOne } from "@/lib/Kit";
import Line from "@/lib/Line";

interface IOption {
  background: string;
  ballColor: string;
  lineColor: string;
  maxRadius: number;
  minRadius: number;
  maxVelocity: number;
  minVelocity: number;
  connectDistance: number;
}
class Ball extends Circle {
  constructor(ox: number, oy: number, radius: number, xVelocity: number, yVelocity: number) {
    super(ox, oy, radius, xVelocity, yVelocity);
  }
  draw(context: CanvasRenderingContext2D | null, { fillStyle }: FillOption) {
    super.draw(context, { fillStyle });
  }

  update(width: number, height: number): Ball {
    super.update(0, 0, width, height);
    return this;
  }
}
export default class DesultoryBall extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  ballNumber: number;
  private option: IOption = {
    background: '#fefefe',
    ballColor: 'rgba(200, 200, 200, 0.4)',
    lineColor: 'rgba(220, 220, 220, 0.5)',
    maxRadius: 20,
    minRadius: 5,
    maxVelocity: 1.0,
    minVelocity: 0.3,
    connectDistance: 200
  };
  private balls: Ball[] = [];
  private lines: Line[] = [];

  constructor(width: number, height: number, ballNumber: number) {
    super();
    this.width = width;
    this.height = height;
    this.ballNumber = ballNumber;
    this.initData();
  }
  initData(): DesultoryBall {
    this.balls = [];
    for (let i = 0; i < this.ballNumber; i++) {
      this.balls.push(this.randomBall());
    }
    this.refreshLines();
    return this;
  }
  randomBall(): Ball {
    const { minRadius, maxRadius, minVelocity, maxVelocity } = this.option;
    return new Ball(
      random(maxRadius, this.width - maxRadius),
      random(maxRadius, this.height - maxRadius),
      random(minRadius, maxRadius),
      randomOne() * random(minVelocity, maxVelocity),
      randomOne() * random(minVelocity, maxVelocity)
    )
  }
  initCanvas(canvas: HTMLCanvasElement): DesultoryBall {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }
  refreshLines(): void {
    this.lines = [];
    for (let i = 0; i < this.balls.length - 1; i++) {
      for (let j = i + 1; j < this.balls.length; j++) {
        const p1 = this.balls[i];
        const p2 = this.balls[j];
        const dis = distance({ x: p1.ox, y: p1.oy }, { x: p2.ox, y: p2.oy });
        if (dis <= this.option.connectDistance) {
          const alpha = 1 - (dis / this.option.connectDistance);
          this.lines.push(new Line(
            p1.ox,
            p1.oy,
            p2.ox,
            p2.oy
          ));
        }
      }
    }
  }
  private clear(): DesultoryBall {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.option.background;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
    return this;
  }
  draw(): DesultoryBall {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear();
    this.context.save();
    this.balls.forEach((ball) => ball.draw(this.context, { fillStyle: this.option.ballColor }));
    this.lines.forEach((line) => line.stroke(this.context, { strokeStyle: this.option.lineColor }));
    this.context.restore();
    return this;
  }
  update() {
    this.balls.forEach((item) => item.update(this.width, this.height));
    this.refreshLines();
  }
}