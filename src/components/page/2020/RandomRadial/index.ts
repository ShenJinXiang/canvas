interface IOption {
  lineColor: string;
  maxStep: number;
  minStep: number;
  outer: number;
};
export default class RandomRadial {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  lineNumber: number;

  constructor(width: number, height: number, lineNumber: number) {
    this.width = width;
    this.height = height;
    this.lineNumber = lineNumber;
    this.initData();
  }
  initData(): RandomRadial {
    return this;
  }
  initCanvas(canvas: HTMLCanvasElement): RandomRadial {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }
  draw(): RandomRadial {
    this.clear();
    return this;
  }
  private clear(): RandomRadial {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
  }
}
