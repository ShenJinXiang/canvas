import Animate from "@/lib/Animate";

export default class ColorFireworks extends Animate {
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  update() { }
  draw() {
    if (!this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(100, 100, 320, 200);
    this.context.restore();
  }
}