import Animate from "@/lib/Animate";

export default class ColoredRotatingLines extends Animate {

  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear('#000');
    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(100, 100, 270, 140);
    this.context.restore();
  }

}