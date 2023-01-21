import Animate from "@/lib/Animate";

export default class DigitalHuarongRoad extends Animate {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }
  draw(): void {
    this.clear('#fff');
  }
}