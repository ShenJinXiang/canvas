import Animate from "@/lib/Animate";
import { FillOption, StrokeOption } from "@/lib/DrawOption";
import { Polygon, PolygonOption } from "@/lib/Polygon";

const PI = Math.PI;

interface IOption {
  backgroundColor: string;
  polygonNumber: number;
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
    polygonNumber: 40,
    time: 600,
    beginAngle: -PI / 2
  }
  private elements: RotatePolygon[] = [];
  private count: number = 0;
  private angleStep: number = 0;
  private sideAngle: number = 0;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    this.count = 0;
    this.angleStep = 2 * PI / RotateConstructionAnimation.OPTION.polygonNumber / RotateConstructionAnimation.OPTION.time;
    this.sideAngle = (RotateConstructionAnimation.OPTION.polygonNumber - 2) * PI / RotateConstructionAnimation.OPTION.polygonNumber / 2;
    const radius = Math.min(this.width, this.height) * 0.45;
    this.elements = [];
    for (let i = 0; i < RotateConstructionAnimation.OPTION.polygonNumber; i++) {
      this.elements.push(new RotatePolygon({
        ox: this.width / 2,
        oy: this.height / 2,
        radius: radius,
        rotate: RotateConstructionAnimation.OPTION.beginAngle,
        sideNum: 5,
        style: 'hsla(' + (i * 15) + ', 100%, 60%, 1)'
      }));
    }
  }

  update() {
    // const angle: number = this.count * this.angleStep;
    // const bl = Math.sin(this.sideAngle) / Math.sin(Math.PI - this.sideAngle - angle);
    // this.elements.forEach((item, index) => {
    //   item.setRotate(index * angle + RotateConstructionAnimation.OPTION.beginAngle);
    //   if (index > 0) {
    //     item.setRadius(this.elements[index - 1].getRadius() * bl);
    //   }
    // });
    // this.count++;
    // if (this.count > RotateConstructionAnimation.OPTION.time) {
    //     this.count = 0;
    // }

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
}