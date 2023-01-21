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
  draw(): DesultoryBall {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear(this.option.background);
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
  public setRect(width: number, height: number): DesultoryBall {
    this.width = width;
    this.height = height;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
    return this;
  }
  public setBallNumber(ballNumber: number): DesultoryBall {
    this.ballNumber = ballNumber;
    this.initData();
    return this;
  }
}