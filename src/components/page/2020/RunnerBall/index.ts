import Animate from "@/lib/Animate";
import { random, randomColor, randomOne } from "@/lib/Kit";
import Particle from "@/lib/Particle";

interface IOption {
  background: string;
  maxRadius: number;
  minRadius: number;
  maxVelocity: number;
  minVelocity: number;
  bufWidth: number;
}
// class Ball {
//   ox: number;
//   oy: number;
//   radius: number;
//   xVelocity: number;
//   yVelocity: number;
//   fillStyle: string;
//   constructor(ox: number, oy: number, radius: number, xVelocity: number, yVelocity: number, fillStyle: string) {
//     this.ox = ox;
//     this.oy = oy;
//     this.radius = radius;
//     this.xVelocity = xVelocity;
//     this.yVelocity = yVelocity;
//     this.fillStyle = fillStyle;
//   }
//   draw(context: CanvasRenderingContext2D | null) {
//     if (!context) {
//       return;
//     }
//     context.save();
//     context.translate(this.ox, this.oy);
//     context.scale(this.radius, this.radius);
//     context.fillStyle = this.fillStyle;
//     context.beginPath();
//     context.arc(0, 0, 1, 0, 2 * Math.PI, false);
//     context.closePath();
//     context.fill();
//     context.restore();
//   }
//   update(width: number, height: number) {
//     this.ox += this.xVelocity;
//     this.oy += this.yVelocity;
//     if (this.ox < this.radius) {
//       this.ox = this.radius;
//       this.xVelocity = -this.xVelocity;
//     }
//     if (this.ox > width - this.radius) {
//       this.ox = width - this.radius;
//       this.xVelocity = -this.xVelocity;
//     }
//     if (this.oy < this.radius) {
//       this.oy = this.radius;
//       this.yVelocity = -this.yVelocity;
//     }
//     if (this.oy > height - this.radius) {
//       this.oy = height - this.radius;
//       this.yVelocity = -this.yVelocity;
//     }
//   }
// }
class Ball extends Particle {
  fillStyle: string;
  constructor(ox: number, oy: number, radius: number, xVelocity: number, yVelocity: number, fillStyle: string) {
    super(ox, oy, radius, xVelocity, yVelocity);
    this.fillStyle = fillStyle;
  }
  draw(context: CanvasRenderingContext2D | null) {
    super.draw(context, { fillStyle: this.fillStyle });
  }

  update(width: number, height: number): Ball {
    super.update(0, 0, width, height);
    return this;
  }
}
export default class RunnerBall extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  ballNumber: number;
  balls: Ball[] = [];
  option: IOption = {
    background: '#000',
    minRadius: 10,
    maxRadius: 20,
    maxVelocity: 2,
    minVelocity: 0.5,
    bufWidth: 10
  };

  constructor(width: number, height: number, ballNumber: number) {
    super();
    this.width = width;
    this.height = height;
    this.ballNumber = ballNumber;
    this.initData();
  }
  initData(): RunnerBall {
    this.balls = [];
    for (let i = 0; i < this.ballNumber; i++) {
      this.balls.push(this.randomBall());
    }
    return this;
  }

  randomBall(): Ball {
    const { bufWidth, minRadius, maxRadius, minVelocity, maxVelocity } = this.option;
    return new Ball(
      random(-bufWidth, this.width + bufWidth),
      random(-bufWidth, this.height + bufWidth),
      random(minRadius, maxRadius),
      randomOne() * random(minVelocity, maxVelocity),
      randomOne() * random(minVelocity, maxVelocity),
      randomColor()
    )

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

  update() {
    this.balls.forEach((item) => item.update(this.width, this.height));
  }
  draw(): RunnerBall {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear();
    this.context.save();
    this.balls.forEach((item) => {
      item.draw(this.context);
    });
    this.context.stroke();
    return this;
  }

  public setRect(width: number, height: number): RunnerBall {
    this.width = width;
    this.height = height;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
    return this;
  }

  public setBallNumber(ballNumber: number): RunnerBall {
    console.log('this ballNumber:', this.ballNumber, "ball number: ", ballNumber);
    if (this.ballNumber > ballNumber) {
      this.balls.splice(ballNumber);
    } else {
      for (let i = this.ballNumber; i < ballNumber; i++) {
        this.balls.push(this.randomBall());
      }
    }
    this.ballNumber = this.balls.length;
    console.log('after', this.balls.length, 'this ballNumber:', this.ballNumber, "ball number: ", ballNumber);
    return this;
  }

}