import Animate from "@/lib/Animate";

export default class CardioidAnimation extends Animate {

  private baseRadius: number = 0;
  private heartBuff: Uint32Array = new Uint32Array();
  private tempCanvas: HTMLCanvasElement | null = null;
  private tempContext: CanvasRenderingContext2D | null = null;

  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  private initData() {
    const base = Math.min(this.width, this.height);
    this.baseRadius = base * 0.4 / 16;
    this.initTempCanvas();
    this.refreshHeartBuffer();
    console.log(this.heartBuff);
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear();
    this.context.save();
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
    for (let angle = 0; angle < 2 * Math.PI; angle += 0.01 ) {
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