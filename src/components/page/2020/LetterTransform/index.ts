import Animate from "@/lib/Animate";
import Point from '@/lib/Point';

export default class LetterTransform extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  shadeCanvas: HTMLCanvasElement | null = null;
  shadeContext: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  // 所有要打印的字母
  letters: string[];
  // 当前打印的字母的位标
  currentPosition: number;
  // 所有要打印的点
  particlePositions: Point[];
  // 刷新字母的时间
  refreshRate: number;
  cunrrentRate: number;
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.currentPosition = 0;
    this.refreshRate = 120;
    this.cunrrentRate = 0;
    this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'.split('');
    this.particlePositions = [];
  }

  initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    this.shadeCanvas = document.createElement('canvas');
    this.shadeCanvas.width = this.width;
    this.shadeCanvas.height = this.height;
    this.shadeContext = this.shadeCanvas.getContext('2d', { willReadFrequently: true });

    this.createParticlePostions();
    return this;
  }

  update(): void {
    this.cunrrentRate++;
    if (this.cunrrentRate >= this.refreshRate) {
      this.changeLetter();
      this.createParticlePostions();
      this.cunrrentRate = 0;
    }
  }

  private changeLetter() {
    this.currentPosition++;
    if (this.currentPosition >= this.letters.length) {
      this.currentPosition = 0;
    }
  }

  draw(): LetterTransform {
    this.clear();
    this.particlePositions.forEach((item) => this.drawRect(item.x, item.y));
    return this;
  }

  createParticlePostions(): LetterTransform {
    if (!this.shadeContext || !this.shadeCanvas) {
      return this;
    }
    this.shadeContext.textAlign = 'center';
    this.shadeContext.textBaseline = 'middle';
    this.shadeContext.fillStyle = 'red';
    this.shadeContext.font = 'italic bold 330px Noto Serif';
    this.shadeContext.fillText(this.letters[this.currentPosition], this.shadeCanvas.width / 2, this.shadeCanvas.height / 2);
    let imgData = this.shadeContext.getImageData(0, 0, this.shadeCanvas.width, this.shadeCanvas.height);
    let buffer32 = new Uint32Array(imgData.data.buffer);

    this.particlePositions = [];
    for (let y = 0; y < this.shadeCanvas.height; y += 6) {
      for (let x = 0; x < this.shadeCanvas.width; x += 6) {
        if (buffer32[y * this.shadeCanvas.width + x]) {
          this.drawRect(x, y);
          this.particlePositions.push({ x, y });
        }
      }
    }
    console.log(this.particlePositions.length);
    return this;
  }

  drawRect(x: number, y: number) {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.fillStyle = 'rgba(0, 255, 0, 0.5)';
    this.context.translate(x, y);
    this.context.fillRect(0, 0, 3.5, 3.5);
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