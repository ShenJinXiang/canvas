import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string
};

export default class VisualErrorAnimation extends Animate {
  private option: IOption = {
    backgroundColor: '#ccc'
  };
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
    this.context.fillStyle = 'red';
    this.context.fillRect(200, 300, 320, 200);
    this.context.restore();
  }
  public setRect(width: number, height: number) {
    this.initRect(width, height);
  }
}