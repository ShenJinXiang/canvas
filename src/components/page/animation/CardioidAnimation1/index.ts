import Animate from "@/lib/Animate";

interface IOption {
  minRoundTime: number;
  maxRoundTime: number;
  elementColors: string[];
  elementNumberRatio: number;
}

export default class CardioidAnimation extends Animate {

  private option: IOption = {
    minRoundTime: 50,
    maxRoundTime: 100,
    elementColors: ['#0f628b', '#ccdff0', '#66ebff', '#ffffff', '#f0ff00'],
    elementNumberRatio: 1,
  };
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
    this.context.fillStyle = 'red';
    this.context.fillRect(200, 200, 260, 120);
    this.context.restore();
  }
}