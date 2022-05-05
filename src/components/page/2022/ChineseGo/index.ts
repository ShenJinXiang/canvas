import { FillOption } from '@/lib/DrawOption';
import Line from '@/lib/Line';
import { Point } from '@/lib/Point';
interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
interface IOption {
  lineColor: string;
  backgroundColor: string;
  margin: Margin;
  blackColor: string;
  whiteColor: string;
}
enum PieceType {
  'BLACK', 'WHITE', 'NONE'
}
class GoPoint implements Point {
  x: number;
  y: number;
  radius: number;
  type: PieceType;
  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.type = PieceType.NONE;
  }
}
class GoStar implements Point {
  x: number;
  y: number;
  radius: number;
  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw(context: CanvasRenderingContext2D | null, { fillStyle = '#000' }: FillOption) {
    if (!context) {
      return;
    }
    context.save();
    context.fillStyle = fillStyle;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
  }
}
export default class ChineseGo {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  gridWidth: number;
  width: number;
  height: number;
  row: number;
  col: number;
  private pieceRadius: number = 0;
  private goStarRadius: number = 0;
  private rows: number[] = [];
  private cols: number[] = [];
  private origin: Point = { x: 0, y: 0 };
  private lines: Line[] = [];
  private points: GoPoint[][] = [];
  private goStars: GoStar[] = [];

  private option: IOption = {
    lineColor: '#444',
    // backgroundColor: '#fdf5db',
    backgroundColor: 'rgb(219, 199, 113)',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    blackColor: '#000',
    whiteColor: '#fff'
  };
  constructor(gridWidth: number) {
    this.row = 19;
    this.col = 19;
    this.gridWidth = gridWidth;
    this.pieceRadius = this.gridWidth * 0.3;
    this.goStarRadius = this.gridWidth * 0.1;
    this.option.margin = { top: this.gridWidth, right: this.gridWidth, left: this.gridWidth, bottom: this.gridWidth };
    this.width = this.gridWidth * (this.col - 1) + this.option.margin.left + this.option.margin.right;
    this.height = this.gridWidth * (this.row - 1) + this.option.margin.top + this.option.margin.bottom;
    this.origin = {
      x: this.option.margin.left,
      y: this.option.margin.top,
    };
    this.initData();
  }
  initData(): ChineseGo {
    this.cols = [];
    this.lines = [];
    for (let c = 0; c < this.col; c++) {
      this.cols.push(c * this.gridWidth);
      this.lines.push(new Line(c * this.gridWidth, 0, c * this.gridWidth, (this.row - 1) * this.gridWidth));
    }
    this.rows = [];
    for (let r = 0; r < this.row; r++) {
      this.rows.push(r * this.gridWidth);
      this.lines.push(new Line(0, r * this.gridWidth, (this.col - 1) * this.gridWidth, r * this.gridWidth));
    }
    this.points = [];
    this.cols.forEach((col) => {
      const colPoints: GoPoint[] = [];
      this.rows.forEach((row) => {
        colPoints.push(new GoPoint(col, row, this.pieceRadius));
      });
      this.points.push(colPoints);
    });
    this.goStars = [
      new GoStar(9 * this.gridWidth, 9 * this.gridWidth, this.goStarRadius),
      new GoStar(3 * this.gridWidth, 3 * this.gridWidth, this.goStarRadius),
      new GoStar(3 * this.gridWidth, 15 * this.gridWidth, this.goStarRadius),
      new GoStar(15 * this.gridWidth, 3 * this.gridWidth, this.goStarRadius),
      new GoStar(15 * this.gridWidth, 15 * this.gridWidth, this.goStarRadius),
    ];
    console.log(this);
    return this;
  }
  initCanvas(canvas: HTMLCanvasElement): ChineseGo {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }

  draw(): ChineseGo {
    this.clear();
    if (!this.canvas || !this.context) {
      return this;
    }
    this.context.save();
    this.context.translate(this.origin.x, this.origin.y);
    this.lines.forEach((item) => item.stroke(this.context, { strokeStyle: this.option.lineColor }));
    this.goStars.forEach((item) => item.draw(this.context, { fillStyle: this.option.lineColor }));
    this.context.restore();
    return this;
  }
  private clear(): ChineseGo {
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
  mouseClick(event: MouseEvent): void {
    const p = this.eventToCanvasPoint(event);
  }
  mouseMove(event: MouseEvent): void {
    if (!this.canvas) {
      return;
    }
    const goPoint = this.eventToGoPoint(event);
    if (goPoint && goPoint.type === PieceType.NONE) {
      this.canvas.style.cursor = 'pointer';
    } else {
      this.canvas.style.cursor = 'default';
    }
  }

  private eventToGoPoint(event: MouseEvent): GoPoint | undefined {
    if (!this.canvas) {
      return;
    }
    const p = this.eventToCanvasPoint(event);
    if (!p) {
      return;
    }
    const row = this.rows.findIndex((item) => {
      return item + this.pieceRadius >= p.y && item - this.pieceRadius <= p.y;
    });
    const col = this.cols.findIndex((item) => {
      return item + this.pieceRadius >= p.x && item - this.pieceRadius <= p.x;
    });
    if (row >= 0 && col >= 0) {
      // this.canvas.style.cursor = 'pointer';
      return this.points[col][row];
    }
    return;
  }

  private eventToCanvasPoint(event: MouseEvent): Point | undefined {
    if (!this.canvas) {
      return;
    }
    let box = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - box.left - this.option.margin.left,
      y: event.clientY - box.top - this.option.margin.top,
    };
  }
}