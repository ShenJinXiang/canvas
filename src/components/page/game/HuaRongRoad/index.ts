interface IOption {
  backgroundColor: string;
}
export class HuaRongRoad {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  private option: IOption = {
    backgroundColor: '#fff'
  };
  side: number;
  constructor(side: number) {
    this.side = side;
    this.width = this.side * 5;
    this.height = this.side * 5;
  }
  initCanvas(canvas: HTMLCanvasElement): this {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }
  draw() {
    if (!this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(100, 100, 200, 130);
    this.context.restore();

  }
  private clear(): this {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.option.backgroundColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
    return this;
  }
}