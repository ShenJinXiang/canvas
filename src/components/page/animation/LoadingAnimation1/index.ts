import Animate from "@/lib/Animate";

export default class LoadingAnimation extends Animate {

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
    this.context.translate(0.5 * this.width, 0.5 * this.height);
    this.context.fillStyle = 'red';
    this.context.fillRect(-140, -100, 280, 200);
    this.context.restore();
  }

}