export default class Temp {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  initData(): Temp {
    return this;
  }
  initCanvas(canvas: HTMLCanvasElement): Temp {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }
  private clear(): Temp {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
    return this;
  }
}