import Animate from "@/lib/Animate";

class Piece {
  size: number;
  fillStyle: string;
  constructor(size: number, fillStyle: string) {
    this.size = size;
    this.fillStyle = fillStyle;
  }
  draw(context: CanvasRenderingContext2D | null, sx: number, sy: number, rotate: number) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(sx, sy);
    context.rotate(rotate);
    context.fillStyle = this.fillStyle;
    context.shadowColor = 'rgba(0, 0, 0, 0.3)'
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = this.size * 0.15;
    this.createPath(context);
    context.fill();
    context.restore();
  }
  createPath(context: CanvasRenderingContext2D) { }
}

class Triangle extends Piece {
  constructor(size: number, fillStyle: string) {
    super(size, fillStyle);
  }
  createPath(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(0, this.size);
    context.lineTo(0, 0);
    context.lineTo(this.size, 0);
    context.closePath();
  }
}
class Square extends Piece {
  constructor(size: number, fillStyle: string) {
    super(size, fillStyle);
  }
  createPath(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(0, this.size);
    context.lineTo(0, 0);
    context.lineTo(this.size, 0);
    context.lineTo(this.size, this.size);
    context.closePath();
  }
}
class Parallelogram extends Piece {
  constructor(size: number, fillStyle: string) {
    super(size, fillStyle);
  }
  createPath(context: CanvasRenderingContext2D) {
    context.transform(Math.sqrt(2), Math.PI / 4, 0, 1, 0, 0);
    context.beginPath();
    context.moveTo(0, this.size);
    context.lineTo(0, 0);
    context.lineTo(this.size, 0);
    context.lineTo(this.size, this.size);
    context.closePath();
  }
}

export default class SevenPiecePuzzleAnimation extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  // 粒子数量
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.initData();
  }

  private initData(): this {
    return this;
  }
  public initCanvas(canvas: HTMLCanvasElement): this {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }

  private clear(): this {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
    return this;
  }

  update() {
  }

  draw() {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear();
    const t1 = new Triangle(200, 'hsla(0, 75%, 60%, 1)');
    t1.draw(this.context, 100, 100, 0);
    const s1 = new Square(200, 'hsla(80, 75%, 60%, 1)');
    s1.draw(this.context, 400, 100, 0);
    const p1 = new Parallelogram(200, 'hsla(180, 75%, 60%, 1)');
    p1.draw(this.context, 700, 100, 0);
  }

}