import Animate from "@/lib/Animate";

interface IOption {
  lineWidth: number;
  color: string;
  backgroundColor: string;
};

export default class CardioidAnimation extends Animate {

  private baseRadius: number = 0;
  private heartBuff: Uint32Array = new Uint32Array();
  private tempCanvas: HTMLCanvasElement | null = null;
  private tempContext: CanvasRenderingContext2D | null = null;

  private option: IOption = {
    lineWidth: 1,
    color: '#fff',
    backgroundColor: '#000'
  };

  private downStep: number = 0;
  private step: number = 0;
  private offsetY: number = 0;

  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  private initData() {
    const base = Math.min(this.width, this.height);
    this.step = base * 0.05 > 25 ? 25 : base * 0.05;
    this.downStep = this.step * 0.4;
    this.baseRadius = base * 0.4 / 16;
    this.initTempCanvas();
    this.refreshHeartBuffer();
    console.log(this.heartBuff);
  }

  update() {
    this.offsetY += 0.5;
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.drawLines();
    this.context.restore();
  }

  private drawLines() {
    for (let y: number = 0; y < this.height; y += this.step) {
      this.drawLine(y + this.offsetY % this.step);
    }
  }

  private drawLine(y: number) {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.strokeStyle = this.option.color;
    this.context.lineWidth = this.option.lineWidth;
    this.context.translate(0, y);
    this.context.beginPath();
    for (let x = 0; x < this.width; x += 2) {
      if (this.heartBuff[this.width * Math.floor(y) + x]) {
        this.context.lineTo(x, this.downStep);
      } else {
        this.context.lineTo(x, 0);
      }
    }
    this.context.stroke();
    this.context.restore();
  }

  fillHeart(ctx: CanvasRenderingContext2D | null, ox: number, oy: number, radius: number, color: string) {
    if (!ctx) {
      return;
    }
    ctx.save();
    ctx.translate(ox, oy);
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let angle = 0; angle < 2 * Math.PI; angle += 0.01) {
      ctx.lineTo(
        radius * 16 * Math.pow(Math.sin(angle), 3),
        -radius * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle))
      );
    }
    ctx.fill();
    ctx.restore();
  }

  refreshHeartBuffer() {
    if (!this.tempCanvas || !this.tempContext) {
      return;
    }
    this.tempCanvas.width = this.width;
    this.tempCanvas.height = this.height;
    this.fillHeart(this.tempContext, 0.5 * this.width, 0.5 * this.height, this.baseRadius, '#fff');
    let image = this.tempContext.getImageData(0, 0, this.width, this.height);
    this.heartBuff = new Uint32Array(image.data.buffer);
  }

  initTempCanvas() {
    this.tempCanvas = document.createElement('canvas');
    this.tempContext = this.tempCanvas.getContext('2d');
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }

}