import Animate from "@/lib/Animate";
import { Polygon } from "@/lib/Polygon";

const PI = Math.PI;

interface IOption {
  backgroundColor: string;
  polygonNumber: number;
}

export default class RotateConstructionAnimation extends Animate {
  private static readonly OPTION: IOption = {
    backgroundColor: '#000',
    polygonNumber: 40,
  }
  private elements: Polygon[] = [];
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    const radius = Math.min(this.width, this.height) * 0.45;
    this.elements = [];
    for (let i = 0; i < RotateConstructionAnimation.OPTION.polygonNumber; i++) {
      this.elements.push(new Polygon({
        ox: this.width / 2,
        oy: this.height / 2,
        radius: radius,
        rotate: PI / 2,
        sideNum: 5,
      }));
    }
  }

  draw() {
    if (!this.context) {
        return;
    }
    this.clear(RotateConstructionAnimation.OPTION.backgroundColor);
    this.context.save();
    const p = new Polygon({
      ox: this.width / 2,
      oy: this.height / 2,
      radius: 140,
      rotate: PI / 2,
      sideNum: 5,
    });
    p.stroke(this.context, { lineWidth: 2, strokeStyle: 'red' });
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
}
}