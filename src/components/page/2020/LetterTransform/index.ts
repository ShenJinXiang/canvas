import Animate from "@/lib/Animate";
import { random } from "@/lib/Kit";
import Point from '@/lib/Point';

interface IOption {
  backgroundColor: string;
  letterColor: string;
  particleSize: number;
};
class Particle {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(context: CanvasRenderingContext2D | null, fillStyle: string = '#fff', width: number = 3, height: number = 3) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.x, this.y);
    context.fillStyle = fillStyle;
    context.fillRect(0, 0, width, height);
    context.restore();
  }
}
export default class LetterTransform extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  shadeCanvas: HTMLCanvasElement | null = null;
  shadeContext: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  option: IOption = {
    backgroundColor: '#303133',
    letterColor: '#67C23A',
    particleSize: 3.5
  };
  letterSize: number;
  // 所有要打印的字母
  letters: string[];
  // 当前打印的字母的位标
  currentPosition: number;
  // 所有要打印的点
  particlePositions: Point[];
  particles: Particle[];
  particleOuterSize: number;
  // 刷新字母的时间
  refreshRate: number;
  cunrrentRate: number;
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.currentPosition = 0;
    this.refreshRate = 100;
    this.cunrrentRate = 0;
    this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'.split('');
    this.letterSize = 0;
    this.particlePositions = [];
    this.particles = [];
    this.particleOuterSize = Math.round(this.option.particleSize * 1.6);
    this.initData();
  }

  private initData() {
    this.letterSize = Math.min(this.width, this.height) * 0.6;
    const particlesLength = Math.round(this.letterSize / this.particleOuterSize) * Math.round(this.letterSize * 0.5 / this.particleOuterSize);
    for (let i = 0; i < particlesLength; i++) {
      this.particles.push(new Particle(
        random(this.width * 0.4, this.width * 0.6),
        random(this.height * 0.4, this.height * 0.6)
      ));
    }
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
    for (let index = 0; index < this.particlePositions.length; index++) {
      const pPos = this.particlePositions[index];
      const p = this.particles[index];
      p.x += (pPos.x - p.x) * .25;
      p.y += (pPos.y - p.y) * .25;
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
    // this.particlePositions.forEach((item) => this.drawRect(item.x, item.y));
    for (let index = 0; index < this.particlePositions.length; index++) {
      const p = this.particles[index];
      p.draw(this.context, this.option.letterColor, this.option.particleSize, this.option.particleSize);
    }
    return this;
  }

  createParticlePostions(): LetterTransform {
    if (!this.shadeContext || !this.shadeCanvas) {
      return this;
    }
    this.shadeContext.textAlign = 'center';
    this.shadeContext.textBaseline = 'middle';
    this.shadeContext.fillStyle = 'red';
    this.shadeContext.font = `italic bold ${this.letterSize}px Noto Serif`;
    this.shadeContext.fillText(this.letters[this.currentPosition], this.shadeCanvas.width / 2, this.shadeCanvas.height / 2);
    let imgData = this.shadeContext.getImageData(0, 0, this.shadeCanvas.width, this.shadeCanvas.height);
    let buffer32 = new Uint32Array(imgData.data.buffer);

    this.particlePositions = [];
    for (let y = 0; y < this.shadeCanvas.height; y += this.particleOuterSize) {
      for (let x = 0; x < this.shadeCanvas.width; x += this.particleOuterSize) {
        if (buffer32[y * this.shadeCanvas.width + x]) {
          this.drawRect(x, y);
          this.particlePositions.push({ x, y });
        }
      }
    }
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
    this.context.fillStyle = this.option.backgroundColor;
    this.context.fillRect(0, 0, this.width, this.height);
    return this;
  }

  setRect(width: number, height: number): LetterTransform {
    this.width = width;
    this.height = height;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
    if (this.shadeCanvas) {
      this.shadeCanvas.width = this.width;
      this.shadeCanvas.height = this.height;
    }
    this.initData();
    return this;
  }
}