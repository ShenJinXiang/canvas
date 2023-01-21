import { StrokeOption } from "@/lib/DrawOption";
import Line from "@/lib/Line";
import Point from "@/lib/Point";
import Rect from "@/lib/Rect";
import Text from "@/lib/Text";

enum GridStyle {
  MI = 'mi',
  TIAN = 'tian',

}
const valueOf = (gridStyle: string): GridStyle => {
  if (GridStyle.TIAN === gridStyle) {
    return GridStyle.TIAN;
  }
  return GridStyle.MI;
}
interface IOption {
  lineStyle: string;
  gridStyle: GridStyle;
}

class Grid {
  protected sx: number;
  protected sy: number;
  protected width: number;
  protected height: number;
  protected lines: Line[] = [];
  constructor(sx: number, sy: number, width: number, height: number) {
    this.sx = sx;
    this.sy = sy;
    this.width = width;
    this.height = height;
    this.init();
  }
  init() { }
  stroke(context: CanvasRenderingContext2D | null, { lineWidth = 1, strokeStyle = '#000', lineDash = [2, 2] }: StrokeOption) {
    if (!context) {
      return;
    }
    this.lines.forEach((item) => {
      item.stroke(context, { lineWidth, strokeStyle, lineDash });
    });
  }
}

class MiGrid extends Grid {
  constructor(sx: number, sy: number, width: number, height: number) {
    super(sx, sy, width, height);
  }

  init() {
    this.lines.push(new Line(this.sx, this.sy, this.sx + this.width, this.sy + this.height));
    this.lines.push(new Line(this.sx, this.sy + this.height, this.sx + this.width, this.sy));
    this.lines.push(new Line(this.sx, this.sy + this.height * 0.5, this.sx + this.width, this.sy + this.height * 0.5));
    this.lines.push(new Line(this.sx + this.width * 0.5, this.sy, this.sx + this.width * 0.5, this.sy + this.height));

  }
}
class TianGrid extends Grid {
  constructor(sx: number, sy: number, width: number, height: number) {
    super(sx, sy, width, height);
  }

  init() {
    this.lines.push(new Line(this.sx, this.sy + this.height * 0.5, this.sx + this.width, this.sy + this.height * 0.5));
    this.lines.push(new Line(this.sx + this.width * 0.5, this.sy, this.sx + this.width * 0.5, this.sy + this.height));
  }
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
  private grids: Grid[] = [];
  private titleTexts: Text[] = [];
  private nameText: Text | null = null;
  private dateText: Text | null = null;
  private bottomText: Text | null = null;
  private rect: Rect | null = null;

  constructor(gridWidth: number, row: number, col: number, lineStyle: string, gridStyle: string) {
    this.gridWidth = gridWidth;
    this.row = row;
    this.col = col;
    this.option = {
      lineStyle: lineStyle,
      gridStyle: valueOf(gridStyle)
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
    this.grids = [];
    for (let row = 0; row < this.row; row += 1) {
      for (let col = 0; col < this.col; col += 1) {
        if (this.option.gridStyle === GridStyle.MI) {
          this.grids.push(new MiGrid(
            col * this.gridWidth, row * this.gridWidth, this.gridWidth, this.gridWidth
          ));
        }
        if (this.option.gridStyle === GridStyle.TIAN) {
          this.grids.push(new TianGrid(
            col * this.gridWidth, row * this.gridWidth, this.gridWidth, this.gridWidth
          ));
        }
      }
    }
    this.titleTexts = [];
    this.titleTexts.push(new Text('硬', this.width * 0.5 - 1.6 * this.gridWidth, this.gridWidth));
    this.titleTexts.push(new Text('笔', this.width * 0.5 - 0.8 * this.gridWidth, this.gridWidth));
    this.titleTexts.push(new Text('书', this.width * 0.5 - 0 * this.gridWidth, this.gridWidth));
    this.titleTexts.push(new Text('法', this.width * 0.5 + 0.8 * this.gridWidth, this.gridWidth));
    this.titleTexts.push(new Text('纸', this.width * 0.5 + 1.6 * this.gridWidth, this.gridWidth));
    this.nameText = new Text('姓名____________', 0.75 * this.gridWidth, 1.75 * this.gridWidth);
    this.dateText = new Text('________年____月____日', this.width - 0.75 * this.gridWidth, 1.75 * this.gridWidth);
    this.bottomText = new Text('硬笔书法纸', 0.85 * this.gridWidth, this.height - 0.75 * this.gridWidth);
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
    this.gridLines.forEach((item) => {
      item.stroke(this.context, { strokeStyle: this.option.lineStyle, lineWidth: 1 });
    });

    this.grids.forEach((item) => {
      item.stroke(this.context, { strokeStyle: this.option.lineStyle, lineWidth: 0.5, lineDash: [2, 5] });
    });
    if (this.rect) {
      this.rect.stroke(this.context, { lineWidth: 2, strokeStyle: this.option.lineStyle });
    }
    this.context.restore();

    this.titleTexts.forEach((item) => {
      item.fill(this.context, { font: `bold ${this.gridWidth / 2}px auto`, fillStyle: this.option.lineStyle });
    });
    if (this.nameText) {
      this.nameText.fill(this.context, { font: `${this.gridWidth / 4}px cursive`, fillStyle: this.option.lineStyle, textAlign: 'left' });
    }
    if (this.dateText) {
      this.dateText.fill(this.context, { font: `${this.gridWidth / 4}px cursive`, fillStyle: this.option.lineStyle, textAlign: 'right' });
    }
    if (this.bottomText) {
      this.bottomText.fill(this.context, { font: `${this.gridWidth / 4}px cursive`, fillStyle: this.option.lineStyle, textAlign: 'left' });
    }
  }
  refresh() {
    this.init();
    if (!this.canvas || !this.context) {
      return;
    }
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.draw();
  }
  setGridWidth(gridWidth: number) {
    this.gridWidth = gridWidth;
    this.refresh();
  }
  setLineStyle(lineStyle: string) {
    this.option.lineStyle = lineStyle;
    this.draw();
  }
  setGridStyle(gridStyle: string) {
    this.option.gridStyle = valueOf(gridStyle);
    this.refresh();
  }
  setRow(row: number) {
    this.row = row;
    this.refresh();
  }
  setCol(col: number) {
    this.col = col;
    this.refresh();
  }

}