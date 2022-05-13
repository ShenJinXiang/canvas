import { random } from "@/lib/Kit";

interface IOption {
  background: string;
  ballNumber: number;
  maxRadius: number;
  minRadius: number;
  maxVelocity: number;
  bufWidth: number;
}
class Ball {
  ox: number;
  oy: number;
  radius: number;
  xVelocity: number;
  yVelocity: number;
  fillStyle: string;
  constructor(ox: number, oy: number, radius: number, xVelocity: number, yVelocity: number, fillStyle: string) {
    this.ox = ox;
    this.oy = oy;
    this.radius = radius;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.fillStyle = fillStyle;
  }
  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.ox, this.oy);
    context.scale(this.radius, this.radius);
    context.fillStyle = this.fillStyle;
    context.arc(0, 0, 1, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }
}
export default class RunnerBall {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  balls: Ball[] = [];
  option: IOption = {
    background: '#000',
    ballNumber: 80,
    minRadius: 10,
    maxRadius: 20,
    maxVelocity: 2,
    bufWidth: 10
  };

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  initData(): RunnerBall {
    this.balls = [];
    const { bufWidth, maxRadius, maxVelocity } = this.option;
    for (let i = 0; i < this.option.ballNumber; i++) {
      this.balls.push(new Ball(
        random(-bufWidth, this.width + bufWidth),
        random(-bufWidth, this.height + bufWidth),
        random(maxRadius),
        random(maxVelocity),
        random(maxVelocity),
        `hsla(${random(255)}, 60%, 40%, 1)`
      ));
    }
    return this;
  }
  initCanvas(canvas: HTMLCanvasElement): RunnerBall {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }
  private clear(): RunnerBall {
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
  public draw(): RunnerBall {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear();
    this.context.strokeStyle = 'red';
    this.context.arc(200, 200, 100, 0, 2 * Math.PI, false);
    this.context.stroke();
    return this;
  }

}