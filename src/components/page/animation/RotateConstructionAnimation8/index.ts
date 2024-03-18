import Animate from "@/lib/Animate";
import { FillOption, StrokeOption } from "@/lib/DrawOption";
import { Polygon, PolygonOption } from "@/lib/Polygon";

const PI = Math.PI;

interface IOption {
  backgroundColor: string;
  polygonNumber: number;
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
  }
  private elements: RotatePolygon[] = [];
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    const radius = Math.min(this.width, this.height) * 0.45;
    this.elements = [];
    for (let i = 0; i < RotateConstructionAnimation.OPTION.polygonNumber; i++) {
      this.elements.push(new RotatePolygon({
        ox: this.width / 2,
        oy: this.height / 2,
        radius: radius,
        rotate: PI / 2,
        sideNum: 5,
        style: 'hsla(' + (i * 15) + ', 100%, 60%, 1)'
      }));
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
}