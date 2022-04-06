import Line from '@/lib/Line';
import Corner from './Corner';

interface IOption {
  background: string,
  lineColor: string,
  gridWidth: number,
  cornerDistance: number,
  cornerWidth: number,
  margin: number,
  borderWidth: number,
  outerWidth: number,
}

interface IRect {
  oringX: number,
  oringY: number,
  width: number,
  height: number,
}

export default class ChineseChessBoard {
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  private width: number = 0;
  private height: number = 0;
  private ox: number = 0;
  private oy: number = 0;
  private option: IOption;
  private lines: Line[] = [];
  private corners: Corner[] = [];
  private outerRect: IRect | null = null;
  constructor(gridWidth: number) {
    this.option = {
      background: '#fdf5db',
      lineColor: '#444',
      gridWidth: gridWidth || 80,
      cornerDistance: 6,
      cornerWidth: 14,
      margin: 10,
      borderWidth: 5,
      outerWidth: 40,
    };
    this.initData();
  }

  initData() {
    const { gridWidth } = this.option;
    this.width = 8 * gridWidth + 2 * this.option.margin + 2 * this.option.outerWidth;
    this.height = 9 * gridWidth + 2 * this.option.margin + 2 * this.option.outerWidth;
    this.ox = this.option.outerWidth + this.option.margin;
    this.oy = this.ox;
    this.lines = [];
    // 横线
    for (let index = 0; index < 10; index += 1) {
      this.lines.push(new Line(
        0, index * gridWidth, 8 * gridWidth, index * gridWidth,
      ));
    }
    // 纵线
    for (let index = 0; index < 9; index += 1) {
      if (index === 0 || index === 8) {
        this.lines.push(new Line(
          index * gridWidth, 0, index * gridWidth, 9 * gridWidth,
        ));
      } else {
        this.lines.push(new Line(
          index * gridWidth, 0, index * gridWidth, 4 * gridWidth,
        ));
        this.lines.push(new Line(
          index * gridWidth, 5 * gridWidth, index * gridWidth, 9 * gridWidth,
        ));
      }
    }
    // 九宫线
    this.lines.push(new Line(
      3 * gridWidth, 0, 5 * gridWidth, 2 * gridWidth,
    ));
    this.lines.push(new Line(
      3 * gridWidth, 2 * gridWidth, 5 * gridWidth, 0 * gridWidth,
    ));
    this.lines.push(new Line(
      3 * gridWidth, 7 * gridWidth, 5 * gridWidth, 9 * gridWidth,
    ));
    this.lines.push(new Line(
      3 * gridWidth, 9 * gridWidth, 5 * gridWidth, 7 * gridWidth,
    ));

    // 拐角线
    this.corners = [];
    this.corners.push(new Corner(1 * gridWidth, 2 * gridWidth, [0, 1, 2, 3], this.option.cornerDistance, this.option.cornerWidth));
    this.corners.push(new Corner(7 * gridWidth, 2 * gridWidth, [0, 1, 2, 3], this.option.cornerDistance, this.option.cornerWidth));
    this.corners.push(new Corner(0 * gridWidth, 3 * gridWidth, [0, 3], this.option.cornerDistance, this.option.cornerWidth));
    this.corners.push(new Corner(2 * gridWidth, 3 * gridWidth, [0, 1, 2, 3], this.option.cornerDistance, this.option.cornerWidth));
    this.corners.push(new Corner(4 * gridWidth, 3 * gridWidth, [0, 1, 2, 3], this.option.cornerDistance, this.option.cornerWidth));
    this.corners.push(new Corner(6 * gridWidth, 3 * gridWidth, [0, 1, 2, 3], this.option.cornerDistance, this.option.cornerWidth));
    this.corners.push(new Corner(8 * gridWidth, 3 * gridWidth, [1, 2], this.option.cornerDistance, this.option.cornerWidth));
    this.corners.push(new Corner(0 * gridWidth, 6 * gridWidth, [0, 3], this.option.cornerDistance, this.option.cornerWidth));
    this.corners.push(new Corner(2 * gridWidth, 6 * gridWidth, [0, 1, 2, 3], this.option.cornerDistance, this.option.cornerWidth));
    this.corners.push(new Corner(4 * gridWidth, 6 * gridWidth, [0, 1, 2, 3], this.option.cornerDistance, this.option.cornerWidth));
    this.corners.push(new Corner(6 * gridWidth, 6 * gridWidth, [0, 1, 2, 3], this.option.cornerDistance, this.option.cornerWidth));
    this.corners.push(new Corner(8 * gridWidth, 6 * gridWidth, [1, 2], this.option.cornerDistance, this.option.cornerWidth));
    this.corners.push(new Corner(1 * gridWidth, 7 * gridWidth, [0, 1, 2, 3], this.option.cornerDistance, this.option.cornerWidth));
    this.corners.push(new Corner(7 * gridWidth, 7 * gridWidth, [0, 1, 2, 3], this.option.cornerDistance, this.option.cornerWidth));

    this.outerRect = {
      oringX: -this.option.margin,
      oringY: -this.option.margin,
      width: 2 * this.option.margin + 8 * this.option.gridWidth,
      height: 2 * this.option.margin + 9 * this.option.gridWidth,
    };
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
    this.context.fillStyle = this.option.background;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.translate(this.ox, this.oy);
    this.lines.forEach((item) => {
      item.draw(this.context, this.option.lineColor, 1);
    });
    this.corners.forEach((item) => {
      item.draw(this.context, this.option.lineColor, 1);
    });

    if (this.outerRect) {
      this.context.beginPath();
      this.context.lineWidth = this.option.borderWidth;
      this.context.strokeStyle = this.option.lineColor;
      this.context.strokeRect(
        this.outerRect.oringX,
        this.outerRect.oringY,
        this.outerRect.width,
        this.outerRect.height
      );
    }
    this.context.restore();
  }
}
