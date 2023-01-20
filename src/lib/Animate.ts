import MarkCanvas from "./MarkCanvas";

export default class Animate {
  canvas: HTMLCanvasElement | null = null;
  markCanvas: MarkCanvas
  context: CanvasRenderingContext2D | null = null;
  showMark: boolean;

  constructor() {
    this.markCanvas = new MarkCanvas('rgba(204, 204, 204, 0.5)', 300, 100);
    this.showMark = true;
  }

  run(): void {
    this.update();
    this.draw();
    if (this.showMark) {
      this.markCanvas.draw(this.context);
    }
    requestAnimationFrame(this.run.bind(this));
  }
  update(): void { }
  draw(): void { }

  hideMark(): this {
    this.showMark = false;
    return this;
  }

  protected clear(fillStyle: string | CanvasGradient | CanvasPattern | null): this {
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