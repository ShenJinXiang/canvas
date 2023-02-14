import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string;
  bodyColor: string;
  fixedPointColor: string;
}

class Element {

}

export default class WoodenManAnimation extends Animate {
  private option: IOption = {
    backgroundColor: '#fff',
    bodyColor: '#333',
    fixedPointColor: '#f1f1f1'
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
    this.context.fillStyle = '#084';
    this.context.fillRect(200, 200, 360, 200);
    this.context.restore();
  }
}