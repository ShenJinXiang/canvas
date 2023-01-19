export default class Animate {
  canvas: HTMLCanvasElement | null = null;
  markCanvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;

  constructor() {
    this.createMarkCanvas('rgba(204, 204, 204, 0.5)', 300, 100);
  }

  run(): void {
    this.update();
    this.draw();
    this.drawMark();
    requestAnimationFrame(this.run.bind(this));
  }
  update(): void { }
  draw(): void { }

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

  private createMarkCanvas(fillStyle: string, width: number, height: number) {
    this.markCanvas = document.createElement('canvas');
    this.markCanvas.width = width;
    this.markCanvas.height = height;
    const context: CanvasRenderingContext2D | null = this.markCanvas.getContext('2d');

    if (context) {
      context.fillStyle = fillStyle;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.font = `${this.markCanvas.height * 0.4}px cursive`;
      context.fillText('shenjinxiang.com', this.markCanvas.width / 2, this.markCanvas.height / 2);
    }
  }
  private drawMark() {
    if (!this.context || !this.markCanvas) {
      return;
    }
    this.context.drawImage(this.markCanvas, this.context.canvas.width - this.markCanvas.width, this.context.canvas.height - this.markCanvas.height);
  }
}