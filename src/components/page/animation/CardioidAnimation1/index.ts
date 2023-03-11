import Animate from "@/lib/Animate"

interface IOption {
  backgroundColor: string
}

export default class CardioidAnimation extends Animate {

  private option: IOption = {
    backgroundColor: ''
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
    this.context.fillRect(200, 200, 260, 120);
    this.context.restore();
  }
}