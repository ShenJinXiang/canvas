import Animate from "@/lib/Animate";
import { random, randomInt } from "@/lib/Kit";

interface IOption {
  // 星星半径
  maxStartRadius: number;
}

class Start {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  flag: number;
  constructor(x: number, y: number, radius: number, alpha: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.alpha = alpha;
    this.flag = random(-1, 1) > 0 ? 1 : -1;
  }
  update() {
    this.alpha += this.flag * (Math.random() * 0.04);
    if (this.alpha > 1 || this.alpha < 0) {
      this.flag = - this.flag;
      if (this.alpha > 1) {
        this.alpha = 1;
      }
      if (this.alpha < 0) {
        this.alpha = 0;
      }
    }
  }
  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.fillStyle = `rgba(255, 255, 255, ${this.alpha} )`;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }
}

export default class ColorFireworks extends Animate {
  background: CanvasGradient | null = null;
  private option: IOption = {
    maxStartRadius: 1
  };
  starts: Start[] = [];
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.initData();
  }

  private initData() {
    this.starts = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (randomInt(3000) === 1) {
          this.starts.push(new Start(x, y, random(this.option.maxStartRadius), random(1)));
        }
      }
    }
  }

  public initCanvas(canvas: HTMLCanvasElement): this {
    super.initCanvas(canvas);
    if (this.context) {
      this.background = this.context.createLinearGradient(this.width / 2, this.height, this.width / 2, 0);
      this.background.addColorStop(0, '#001339');
      this.background.addColorStop(1, '#06080E');
    }
    return this;
  }

  update() {
    this.starts.forEach((item) => item.update());
  }
  draw() {
    if (!this.context) {
      return;
    }
    if (this.background) {
      this.clear(this.background);
    } else {
      this.clear('#000');
    }
    this.context.save();
    this.starts.forEach((item) => item.draw(this.context));
    this.context.restore();
  }
}