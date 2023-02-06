import Animate from "@/lib/Animate";

export class RotateLineAnimation extends Animate {
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  draw() {
    this.clear();
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(100, 100, 340, 200);
    this.context.restore();
  }
}