import Animate from "@/lib/Animate";

export default class LetterTransform extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  shadeCanvas: HTMLCanvasElement | null = null;
  shadeContext: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  letters: string[];
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'.split('');
  }

  initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    this.shadeCanvas = document.createElement('canvas');
    this.shadeCanvas.width = this.width;
    this.shadeCanvas.height = this.height;
    this.shadeContext = this.shadeCanvas.getContext('2d');
    return this;
  }

  update(): void {

  }

  draw(): LetterTransform {
    this.clear();
    this.draw1();
    return this;
  }

  draw1(): void {
    if (!this.context || !this.canvas) {
      return;
    }
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = 'red';
    this.context.font = 'italic bold 330px Noto Serif';
    this.context.fillText('A', this.canvas.width / 2, this.canvas.height / 2);
    let imgData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    console.log(imgData);
    console.log(imgData.data.buffer);
    let buffer32 = new Uint32Array(imgData.data.buffer);

    for (let y = 0; y < this.canvas.height; y += 8) {
      for (let x = 0; x < this.canvas.width; x += 8) {
        if (buffer32[y * this.canvas.width + x]) {
          this.drawRect(x, y);
        }
      }
    }
  }

  drawRect(x: number, y: number) {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.fillStyle = 'rgba(0, 255, 0, 0.5)';
    this.context.translate(x, y);
    this.context.fillRect(-3, -3, 6, 6);
    this.context.restore();
  }

  private clear(): LetterTransform {
    if (!this.canvas || !this.context || !this.shadeCanvas || !this.shadeContext) {
      return this;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shadeContext.clearRect(0, 0, this.shadeCanvas.width, this.shadeCanvas.height);
    return this;
  }

  private clearContext(context: CanvasRenderingContext2D): void {
    if (!context) {
      return;
    }
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }

}