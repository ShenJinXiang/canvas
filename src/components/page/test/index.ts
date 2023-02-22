import Animate from "@/lib/Animate";

export default class Test extends Animate {
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
    // this.context.fillStyle = '#084';
    // this.context.fillRect(100, 100, 340, 220);

    this.context.restore();
  }
}

/*
T = 2 * Math.PI * Math.sqrt(radius / g);

w = 2 * Math.PI / T = 1 / Math.sqrt(radius / g);


*/