export default class DesultoryBall {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  initData(): DesultoryBall {
    return this;
  }
  initCanvas(canvas: HTMLCanvasElement): DesultoryBall {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }
  private clear(): DesultoryBall {
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
  draw(): DesultoryBall {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear();
    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(100, 100, 300, 2);
    this.context.restore();

    return this;
  }
}