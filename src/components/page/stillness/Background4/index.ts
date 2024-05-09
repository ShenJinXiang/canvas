import BaseCanvas from "@/lib/BaseCanvas";

interface IOption {
  backgroundColor: string;
  showColor: string;
  minSize: number;
}

class Element {
  private x: number;
  private y: number;
  private size: number;
  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
}

export default class Background extends BaseCanvas {
  private static readonly OPTION: IOption = {
    backgroundColor: '#000',
    showColor: '#f1f1f1',
    minSize: 50
  }
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear(Background.OPTION.backgroundColor);
    this.context.save();
    this.context.fillStyle = Background.OPTION.showColor;
    this.context.fillRect(100, 100, 300, 220);
    this.drawMark();
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
    this.draw();
  }
}