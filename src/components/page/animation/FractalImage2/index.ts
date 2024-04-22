import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string;
}

export default class FractalImage extends Animate {
  private static readonly OPTION: IOption = {
    backgroundColor: '#f1f1f1',
  }
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {}

  draw(): void {
    if (!this.context) {
        return;
    }
    this.clear(FractalImage.OPTION.backgroundColor);
    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(100, 100, 300, 220);
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
}