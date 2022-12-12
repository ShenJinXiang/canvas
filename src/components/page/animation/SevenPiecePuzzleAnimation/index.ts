import Animate from "@/lib/Animate";

export default class SevenPiecePuzzleAnimation extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  // 粒子数量
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.initData();
  }

  private initData(): this {
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

  private clear(): this {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#fff';
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
    this.context.fillStyle = 'green';
    this.context.fillRect(200, 100, 400, 240);
  }

}