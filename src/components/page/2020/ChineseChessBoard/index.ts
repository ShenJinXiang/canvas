import Line from '@/lib/Line';
import Rect from '@/lib/Rect';
import Corner from './Corner';
import Text from './Text';

interface IOption {
  background: string,
  lineColor: string,
  cornerDistance: number,
  cornerWidth: number,
  margin: number,
  borderWidth: number,
  outerWidth: number,
  font: string,
  fontStyle: string,
}

export default class ChineseChessBoard {
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  private width: number = 0;
  private height: number = 0;
  private gridWidth: number = 80;
  private ox: number = 0;
  private oy: number = 0;
  private option: IOption = {
    background: '',
    lineColor: '',
    cornerDistance: 0,
    cornerWidth: 0,
    margin: 0,
    borderWidth: 0,
    outerWidth: 0,
    font: '',
    fontStyle: ''
  };
  private lines: Line[] = [];
  private corners: Corner[] = [];
  private texts: Text[] = [];
  private outerRect: Rect | null = null;
  constructor(gridWidth: number) {
    this.gridWidth = gridWidth;
    this.initData();
  }

  private initData() {
    const { gridWidth } = this;
    this.option = {
      background: '#fdf5db',
      lineColor: '#444',
      cornerDistance: gridWidth * .076,
      cornerWidth: gridWidth * .175,
      margin: gridWidth * .125,
      borderWidth: gridWidth * .0625,
      outerWidth: gridWidth * .5,
      font: `bold ${gridWidth * .55}px cursive`,
      fontStyle: '#444',
    };
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

    this.texts = [
      new Text('楚', 1.5 * gridWidth, 4.5 * gridWidth, -Math.PI / 2),
      new Text('河', 3 * gridWidth, 4.5 * gridWidth, -Math.PI / 2),
      new Text('漢', 6.5 * gridWidth, 4.5 * gridWidth, Math.PI / 2),
      new Text('界', 5 * gridWidth, 4.5 * gridWidth, Math.PI / 2),
    ];

    this.outerRect = new Rect(-this.option.margin, -this.option.margin, 2 * this.option.margin + 8 * gridWidth, 2 * this.option.margin + 9 * gridWidth);
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

  setGridWidth(gridWidth: number) {
    if (!this.canvas) {
      throw new Error('canvas未初始化，请先执行 initCanvas() 方法！');
    }
    this.initData();
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.draw();
  }

  private draw() {
    if (!this.canvas || !this.context) {
      return;
    }
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.option.background;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.translate(this.ox, this.oy);
    this.lines.forEach((item) => {
      item.stroke(this.context, { strokeStyle: this.option.lineColor, lineWidth: 1 });
    });
    this.corners.forEach((item) => {
      item.stroke(this.context, { strokeStyle: this.option.lineColor, lineWidth: 1 });
    });

    this.texts.forEach((item) => {
      item.fill(this.context, this.option.font, this.option.fontStyle);
    });

    if (this.outerRect) {
      this.outerRect.stroke(this.context, { lineWidth: this.option.borderWidth, strokeStyle: this.option.lineColor });
    }
    this.context.restore();
  }
}
