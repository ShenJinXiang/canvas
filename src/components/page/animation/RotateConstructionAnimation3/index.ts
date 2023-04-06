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
    this.context.fillStyle = '#048';
    this.context.fillRect(200, 200, 200, 140);
    this.context.restore();
  }

}