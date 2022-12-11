import Animate from "@/lib/Animate";

export default class Starry extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }
  public initCanvas(canvas: HTMLCanvasElement): this {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }

  private clear(): this {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const clg = this.context.createLinearGradient(this.width / 2, this.height, this.width / 2, 0);
    clg.addColorStop(0, '#001339');
    clg.addColorStop(1, '#06080E');
    this.context.fillStyle = clg;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
    return this;
  }

  update() {

  }

  draw() {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear();
    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(100, 100, 200, 120);
    this.context.restore();
  }

}
