
interface IOption {
  backgroundColor: string;
}
class Element {
  type: number;
  name: string;
  colIndex: number = 1;
  rowIndex: number = 1;
  cols: number;
  rows: number;
  constructor(type: number, name: string, cols: number, rows: number, colIndex: number, rowIndex: number) {
    this.type = type;
    this.name = name;
    this.cols = cols;
    this.rows = rows;
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
  }
  position(colIndex: number, rowIndex: number) {
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.fillStyle = '#dedede';
    context.fillRect(this.colIndex, this.rowIndex, this.cols, this.rows);
    context.restore();
  }
}
export class HuaRongRoad {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  private option: IOption = {
    backgroundColor: '#fff'
  };
  elements: Element[] = [];
  side: number;
  constructor(side: number) {
    this.side = side;
    this.width = this.side * 5;
    this.height = this.side * 5;
    this.initData();
  }

  private initData() {
    this.elements = [
      new Element(0, '曹操', 2, 2, 1, 0),
      new Element(1, '关羽', 2, 1, 1, 2),
      new Element(1, '张飞', 1, 2, 0, 0),
      new Element(1, '赵云', 1, 2, 3, 0),
      new Element(1, '马超', 1, 2, 0, 2),
      new Element(1, '黄忠', 1, 2, 3, 2)
    ];
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
    this.context.scale(this.side, this.side);
    this.drawBorder();
    this.context.translate(0.5, 0.5);
    this.elements.forEach((item) => item.draw(this.context));
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
  private drawBorder() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.fillStyle = '#f1f1f1';
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(5, 0);
    this.context.lineTo(5, 5);
    this.context.lineTo(3.5, 5);
    this.context.lineTo(3.5, 4.5);
    this.context.lineTo(4.5, 4.5);
    this.context.lineTo(4.5, 0.5);
    this.context.lineTo(0.5, 0.5);
    this.context.lineTo(0.5, 4.5);
    this.context.lineTo(1.5, 4.5);
    this.context.lineTo(1.5, 5);
    this.context.lineTo(0, 5);
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  }
}