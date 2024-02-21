import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string;
};

export default class FractalImage extends Animate {
  private option: IOption = {
    backgroundColor: '#000',
  };
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }
  initData() {

  }
  draw(): void {
    if (!this.context) {
        return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
}