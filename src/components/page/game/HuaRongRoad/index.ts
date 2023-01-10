
interface IOption {
  backgroundColor: string;
}
class Element {
  type: number;
  name: string;
  background: string;
  colIndex: number = 1;
  rowIndex: number = 1;
  cols: number;
  rows: number;
  constructor(type: number, name: string, background: string, cols: number, rows: number, colIndex: number, rowIndex: number) {
    this.type = type;
    this.name = name;
    this.background = background;
    this.cols = cols;
    this.rows = rows;
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
  }
  position(colIndex: number, rowIndex: number) {
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
  }

  draw(context: CanvasRenderingContext2D | null, side: number) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.colIndex * side, this.rowIndex * side);
    context.fillStyle = '#fff';
    context.shadowColor = 'rgba(0, 0, 0, 0.1)';
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = side * 0.1;
    context.fillRect(0, 0, this.cols * side, this.rows * side);
    context.restore();
    context.save();
    context.translate(this.colIndex * side, this.rowIndex * side);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = `${side * 0.3}px 楷体`;
    // context.fillStyle = '#999';
    // context.fillText(this.name, this.cols * side * 0.5, this.rows * side * 0.5);
    context.fillStyle = '#999';
    context.strokeText(this.name, this.cols * side * 0.5, this.rows * side * 0.5);
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
    this.height = this.side * 6;
    this.initData();
  }

  private initData() {
    this.elements = [
      new Element(0, '曹操', 'hsla(0, 75%, 70%, 1)', 2, 2, 1, 0),
      new Element(1, '关羽', 'hsla(60, 75%, 70%, 1)', 2, 1, 1, 2),
      new Element(1, '张飞', 'hsla(120, 75%, 70%, 1)', 1, 2, 0, 0),
      new Element(1, '赵云', 'hsla(180, 75%, 70%, 1)', 1, 2, 3, 0),
      new Element(1, '马超', 'hsla(240, 75%, 70%, 1)', 1, 2, 0, 2),
      new Element(1, '黄忠', 'hsla(300, 75%, 70%, 1)', 1, 2, 3, 2),
      new Element(1, '卒', 'hsla(360, 75%, 70%, 1)', 1, 1, 0, 4),
      new Element(1, '卒', 'hsla(360, 75%, 70%, 1)', 1, 1, 1, 3),
      new Element(1, '卒', 'hsla(360, 75%, 70%, 1)', 1, 1, 2, 3),
      new Element(1, '卒', 'hsla(360, 75%, 70%, 1)', 1, 1, 3, 4),
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
    this.drawBorder();
    this.context.translate(0.5 * this.side, 0.5 * this.side);
    this.elements.forEach((item) => item.draw(this.context, this.side));
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
    // this.context.shadowColor = 'rgba(0, 0, 0, 0.1)';
    // this.context.shadowOffsetX = 0;
    // this.context.shadowOffsetY = 0;
    // this.context.shadowBlur = this.side * 0.1;
    this.context.scale(this.side, this.side);
    this.context.fillStyle = '#ddd';
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(5, 0);
    this.context.lineTo(5, 6);
    this.context.lineTo(3.5, 6);
    this.context.lineTo(3.5, 5.5);
    this.context.lineTo(4.5, 5.5);
    this.context.lineTo(4.5, 0.5);
    this.context.lineTo(0.5, 0.5);
    this.context.lineTo(0.5, 5.5);
    this.context.lineTo(1.5, 5.5);
    this.context.lineTo(1.5, 6);
    this.context.lineTo(0, 6);
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  }
}