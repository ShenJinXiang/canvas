import Animate from "@/lib/Animate";
import Circle from "@/lib/Circle";
import { random, randomColor, randomOne } from "@/lib/Kit";

interface IOption {
  background: string;
  maxRadius: number;
  minRadius: number;
  maxVelocity: number;
  minVelocity: number;
  bufWidth: number;
}
class Ball extends Circle {
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
  update() {
    this.balls.forEach((item) => item.update(this.width, this.height));
  }
  draw(): RunnerBall {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear(this.option.background);
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