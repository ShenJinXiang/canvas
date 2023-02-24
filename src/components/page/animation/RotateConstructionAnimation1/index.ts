import Animate from "@/lib/Animate";

export default class RotateConstructionAnimation extends Animate {
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
    this.context.fillRect(300, 300, 240, 150);
    this.context.restore();
  }
}