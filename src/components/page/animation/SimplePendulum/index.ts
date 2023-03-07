import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string;
  lineColor: string;
}
export default class SimplePendulum extends Animate {
  private option: IOption = {
    backgroundColor: '#000',
    lineColor: 'rgba(255, 255, 255, 0.5)'
  }
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.context.translate(0.5 * this.width, 0);
    this.context.beginPath();
    this.context.fillStyle = '#084';
    this.context.fillRect(-140, 200, 280, 180);
    this.context.restore();
  }
}