import MarkCanvas from "./MarkCanvas";

export default class BaseCanvas {
  canvas: HTMLCanvasElement | null = null;
  markCanvas: MarkCanvas
  context: CanvasRenderingContext2D | null = null;

  width: number = 0;
  height: number = 0;
  showMark: boolean;

  constructor() {
    this.markCanvas = new MarkCanvas('rgba(204, 204, 204, 0.5)', 300, 100);
    this.showMark = true;
  }

  initRect(width: number, height: number): this {
    this.width = width;
    this.height = height;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
    return this;
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
  draw(): void { }

  drawMark(): void {
    if (this.showMark) {
      this.markCanvas.draw(this.context);
    }
  }

  hideMark(): this {
    this.showMark = false;
    return this;
  }

  protected clear(fillStyle?: string | CanvasGradient | CanvasPattern | null): this {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (fillStyle) {
      this.context.fillStyle = fillStyle;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.context.restore();
    return this;
  }
}