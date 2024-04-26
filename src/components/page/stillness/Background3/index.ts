import BaseCanvas from "@/lib/BaseCanvas";

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
    this.clear();
    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(200, 200, 100, 80);
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
    this.draw();
  }
}