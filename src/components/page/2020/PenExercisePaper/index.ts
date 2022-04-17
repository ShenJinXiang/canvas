import Line from "@/lib/Line";
import { Point } from "@/lib/Point";
import Rect from "@/lib/Rect";

interface IOption {
  lineStyle: string;
}

export default class PenExercisePaper {
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  private width: number = 0;
  private height: number = 0;
  private option: IOption;
  private gridWidth: number;
  private row: number;
  private col: number;
  private origin: Point = { x: 0, y: 0 };
  private gridLines: Line[] = [];
  private rect: Rect | null = null;

  constructor(gridWidth: number, row: number, col: number) {
    this.gridWidth = gridWidth;
    this.row = row;
    this.col = col;
    this.option = {
      lineStyle: '#f00'
    };
    this.init()
  }
  init() {
    this.width = (this.col + 1) * this.gridWidth;
    this.height = (this.row + 3) * this.gridWidth;
    this.origin.x = 0.5 * this.gridWidth;
    this.origin.y = 2 * this.gridWidth;
    this.rect = new Rect(0, 0, this.col * this.gridWidth, this.row * this.gridWidth);
    this.gridLines = [];
    for (let row = 1; row < this.row; row += 1) {
      this.gridLines.push(new Line(
        0, row * this.gridWidth, this.col * this.gridWidth, row * this.gridWidth
      ));
    }
    for (let col = 1; col < this.col; col += 1) {
      this.gridLines.push(new Line(
        col * this.gridWidth, 0, col * this.gridWidth, this.row * this.gridWidth
      ));
    }
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
    this.context.translate(this.origin.x, this.origin.y);
    if (this.rect) {
      this.rect.stroke(this.context, { lineWidth: 2, strokeStyle: this.option.lineStyle });
    }
    this.gridLines.forEach((item) => {
      item.stroke(this.context, { strokeStyle: this.option.lineStyle, lineWidth: 1 });
    });

    this.context.restore();
  }
}