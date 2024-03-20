import Animate from "@/lib/Animate";
import { FillOption, StrokeOption } from "@/lib/DrawOption";
import { Polygon, PolygonOption } from "@/lib/Polygon";

const PI = Math.PI;

interface IOption {
  backgroundColor: string;
  time: number;
  beginAngle: number;
}

interface RotatePolygonOption extends PolygonOption {
  style: string;
}

class RotatePolygon extends Polygon {

  private style: string;

  constructor(options: RotatePolygonOption) {
    super(options);
    this.style = options.style;
  }

  stroke(context: CanvasRenderingContext2D | null, { lineWidth, strokeStyle = this.style }: StrokeOption): void {
      super.stroke(context, { lineWidth, strokeStyle });
  }

  fill(ctx: CanvasRenderingContext2D | null, { fillStyle = this.style }: FillOption): void {
      super.fill(ctx, { fillStyle });
  }

}

export default class RotateConstructionAnimation extends Animate {
  private static readonly OPTION: IOption = {
    backgroundColor: '#000',
    time: 600,
    beginAngle: -PI / 2
  }
  private elements: RotatePolygon[] = [];
  private count: number = 0;
  private angleStep: number = 0;
  private sideNumber: number = 0;
  private sideAngle: number = 0;
  private polygonNumber: number = 0;
  constructor(width: number, height: number, sideNumber: number) {
    super();
    this.initRect(width, height);
    this.sideNumber = sideNumber;
    this.initData();
  }

  initData() {
    this.count = 0;
    this.angleStep = 2 * PI / this.sideNumber / RotateConstructionAnimation.OPTION.time;
    this.sideAngle = (this.sideNumber - 2) * PI / this.sideNumber / 2;
    this.polygonNumber = this.sideNumber * 10;
    const radius = Math.min(this.width, this.height) * 0.45;
    this.elements = [];
    const colorSetp = 720 / this.polygonNumber;
    for (let i = 0; i < this.polygonNumber; i++) {
      this.elements.push(new RotatePolygon({
        ox: this.width / 2,
        oy: this.height / 2,
        radius: radius,
        rotate: RotateConstructionAnimation.OPTION.beginAngle,
        sideNum: this.sideNumber,
        style: 'hsla(' + (i * colorSetp) + ', 100%, 60%, 1)'
      }));
    }
  }

  update() {
    const angle: number = this.count * this.angleStep;
    const bl = Math.sin(this.sideAngle) / Math.sin(PI - this.sideAngle - angle);
    this.elements.forEach((item, index) => {
      item.setRotate(index * angle + RotateConstructionAnimation.OPTION.beginAngle);
      if (index > 0) {
        item.setRadius(this.elements[index - 1].getRadius() * bl);
      }
    });
    this.count++;
    if (this.count > RotateConstructionAnimation.OPTION.time) {
        this.count = 0;
    }

  }

  draw() {
    if (!this.context) {
        return;
    }
    this.clear(RotateConstructionAnimation.OPTION.backgroundColor);
    this.context.save();
    this.elements.forEach((element) => element.stroke(this.context, { lineWidth: 1 }));
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }

  public setSideNumber(sideNumber: number) {
    this.sideNumber = sideNumber;
    this.initData();
  }
}