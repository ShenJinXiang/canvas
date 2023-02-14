import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string;
  bodyColor: string;
  fixedPointColor: string;
}

class FixedPoint {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  draw(context: CanvasRenderingContext2D | null, radius: number, style: string) {
    if (!context) {
      return;
    }
    context.save();
    context.beginPath();
    context.fillStyle = style;
    context.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }
}

class Element {
  // rotate: number;
  // fixedPoints: FixedPoint[];
  constructor() {

  }

}

export default class WoodenManAnimation extends Animate {
  private option: IOption = {
    backgroundColor: '#f1f1f1',
    bodyColor: '#333',
    fixedPointColor: '#e1e1e1'
  };
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.context.fillStyle = '#084';
    this.context.fillRect(200, 200, 360, 200);
    this.context.restore();
  }
}