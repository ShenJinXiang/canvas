
interface IOption {
  lineStyle: string;
}

export default class PenExercisePaper {
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  private width: number = 0;
  private height: number = 0;
  private gridWidth: number;
  private row: number;
  private col: number;

  constructor(gridWidth: number, row: number, col: number) {
    this.gridWidth = gridWidth;
    this.row = row;
    this.col = col;
    this.init()
  }
  init() {
    this.width = (this.col + 1) * this.gridWidth;
    this.height = (this.row + 3) * this.gridWidth;
  }

  initCanvas(canvas: HTMLCanvasElement) {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    this.draw();
  }
  draw() {
    if (!this.canvas || !this.context) {
      return;
    }
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
  }
}