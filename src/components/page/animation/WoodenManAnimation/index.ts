import Animate from "@/lib/Animate";

export default class WoodenManAnimation extends Animate {
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.context.fillStyle = '#084';
    this.context.fillRect(200, 200, 360, 200);
    this.context.restore();
  }
}