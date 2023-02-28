import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string
};

export default class RotateConstructionAnimation extends Animate {
  elementNumber: number;
  private option: IOption = {
    backgroundColor: '#000'
  };
  constructor(width: number, height: number, elementNumber: number) {
    super();
    this.initRect(width, height);
    this.elementNumber = elementNumber;
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.context.fillStyle = '#084';
    this.context.fillRect(400, 100, 320, 200);
    this.context.restore();
  }
}