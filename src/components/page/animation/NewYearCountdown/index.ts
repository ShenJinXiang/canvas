import Animate from "@/lib/Animate";
import { random } from "@/lib/Kit";

interface IOption {
  maxVelocityX: number;
  maxVelocityY: number;
  minVelocityX: number;
  minVelocityY: number;
  maxRadius: number;
  minRadius: number;
  maxAlpha: number;
  minAlpha: number;
  fontColor: string;
}
interface ElOption {
  velocityX: number;
  velocityY: number;
  radius: number;
  alpha: number;
}
class Element {
  x: number;
  y: number;
  velocityX: number = 0;
  velocityY: number = 0;
  radius: number = 0;
  alpha: number = 0;

  constructor(x: number, y: number, option: ElOption) {
    this.x = x;
    this.y = y;
    this.setOption(option);
  }

  setOption(option: ElOption) {
    this.velocityX = option.velocityX;
    this.velocityY = option.velocityY;
    this.radius = option.radius;
    this.alpha = option.alpha;
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.beginPath();
    context.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }
}
export default class NewYearCountdown extends Animate {
  private option: IOption = {
    maxVelocityX: 3,
    minVelocityX: -3,
    maxVelocityY: 5,
    minVelocityY: 2,
    maxRadius: 4,
    minRadius: 1,
    maxAlpha: 0.9,
    minAlpha: 0.1,
    fontColor: '#d99c3b',
  };
  private elements: Element[] = [];
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.initData();
  }

  update() {
    this.elements.forEach((item) => {
      item.x += item.velocityX;
      item.y += item.velocityY;
      if (item.y + item.radius > this.height) {
        item.setOption(this.randomElOption());
        item.y = -item.radius;
      }
    });
  }
  draw() {
    if (!this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.elements.forEach((item) => item.draw(this.context));
    this.context.restore();
  }

  private initData() {
    this.elements = [];
    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        if (Math.round(random(4000)) === 1) {
          this.elements.push(new Element(x, y, this.randomElOption()));
        }
      }
    }
    console.log(this.elements.length);
  }

  private randomElOption(): ElOption {
    return {
      velocityX: random(this.option.minVelocityX, this.option.maxVelocityX),
      velocityY: random(this.option.minVelocityY, this.option.maxVelocityY),
      radius: random(this.option.minRadius, this.option.maxRadius),
      alpha: random(this.option.minAlpha, this.option.maxAlpha)
    };
  }
}