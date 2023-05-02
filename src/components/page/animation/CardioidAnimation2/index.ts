import Animate from "@/lib/Animate";

export default class CardioidAnimation extends Animate {

  private baseRadius: number;

  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  private initData() {
    const base = Math.min(this.width, this.height);
    this.baseRadius = base * 0.4 / 16;
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.fillHeart()
    this.context.restore();
  }

  fillHeart() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.translate(0.5 * this.width, 0.5 * this.height);
    this.context.fillStyle = 'red';
    this.context.beginPath();
    for (let angle = 0; angle < 2 * Math.PI; angle += 0.01 ) {
        this.context.lineTo(
            this.baseRadius * 16 * Math.pow(Math.sin(angle), 3),
            -this.baseRadius * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle))
        );
    }
    this.context.fill();
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }

}