import Animate from "@/lib/Animate";

const { PI } = Math.PI;
const _90_DEG = PI / 2;
const _135_DEG = 3 * PI / 4;
const _180_DEG = PI;
const _225_DEG = 5 * PI / 4;
const _270_DEG = 3 * PI / 2;
const SQRT_2 = Math.sqrt(2);
const SQRT_2_HALF = Math.sqrt(2) / 2;
interface PiecePosition {
  show?: boolean;
  sx: number;
  sy: number;
  rotate: number;
}
class Piece {
  size: number;
  fillStyle: string;
  constructor(size: number, fillStyle: string) {
    this.size = size;
    this.fillStyle = fillStyle;
  }
  draw(context: CanvasRenderingContext2D | null, { sx, sy, rotate, show = true }: PiecePosition) {
    if (!context || !show) {
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
class Parallelogram1 extends Piece {
  constructor(size: number, fillStyle: string) {
    super(size, fillStyle);
  }
  createPath(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(-this.size / Math.sqrt(2), -this.size / Math.sqrt(2));
    context.lineTo(0, 0);
    context.lineTo(this.size * Math.sqrt(2), 0);
    context.lineTo(this.size / Math.sqrt(2), -this.size / Math.sqrt(2));
    context.closePath();
  }
}
class Parallelogram2 extends Piece {
  constructor(size: number, fillStyle: string) {
    super(size, fillStyle);
  }
  createPath(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(-this.size / Math.sqrt(2), this.size / Math.sqrt(2));
    context.lineTo(0, 0);
    context.lineTo(this.size * Math.sqrt(2), 0);
    context.lineTo(this.size / Math.sqrt(2), this.size / Math.sqrt(2));
    context.closePath();
  }
}

class Combination {
  posis: PiecePosition[];
  constructor(positions: PiecePosition[]) {
    this.posis = positions;
  }
}

export default class SevenPiecePuzzleAnimation extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  size: number;
  pieces: Piece[] = [];
  // 粒子数量
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.size = 100;
    this.initData();
  }

  private initData(): this {
    this.pieces = [
      new Triangle(this.size * 2, 'hsla(50, 75%, 60%, 1)'),
      new Triangle(this.size * 2, 'hsla(270, 75%, 60%, 1)'),
      new Triangle(this.size, 'hsla(230, 75%, 60%, 1)'),
      new Triangle(this.size, 'hsla(120, 75%, 60%, 1)'),
      new Triangle(this.size * Math.sqrt(2), 'hsla(40, 75%, 60%, 1)'),
      new Square(this.size, 'hsla(190, 75%, 60%, 1)'),
      new Parallelogram1(this.size, 'hsla(0, 75%, 60%, 1)'),
      new Parallelogram2(this.size, 'hsla(0, 75%, 60%, 1)'),
    ];
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
    this.context.save();
    this.context.translate(this.width / 2, this.height * 0.8);
    this.context.scale(1, -1);
    this.pieces[0].draw(this.context, { sx: 0, sy: this.size * Math.sqrt(2), rotate: Math.PI * 0.75 });
    this.pieces[1].draw(this.context, { sx: 0, sy: this.size * Math.sqrt(2), rotate: -Math.PI * 0.75 });
    this.pieces[2].draw(this.context, { sx: this.size / Math.sqrt(2), sy: this.size / Math.sqrt(2), rotate: -Math.PI / 4 });
    this.pieces[3].draw(this.context, { sx: 0, sy: this.size * Math.sqrt(2), rotate: Math.PI / 4 });
    this.pieces[4].draw(this.context, { sx: this.size * Math.sqrt(2), sy: 2 * this.size * Math.sqrt(2), rotate: Math.PI });
    this.pieces[5].draw(this.context, { sx: 0, sy: this.size * Math.sqrt(2), rotate: -Math.PI / 4 });
    this.pieces[7].draw(this.context, { sx: -this.size / Math.sqrt(2), sy: 3 * this.size / Math.sqrt(2), rotate: 0 });
    this.context.restore();

    // this.pieces[6].draw(this.context, { sx: 200, sy: 200, rotate: 0 });
    // this.pieces[7].draw(this.context, { sx: 400, sy: 200, rotate: 0 });
    // this.pieces[0].draw(this.context, { sx: 50, sy: 50, rotate: 0 });
    // this.pieces[1].draw(this.context, { sx: 300, sy: 50, rotate: 0 });
    // this.pieces[2].draw(this.context, { sx: 550, sy: 50, rotate: 0 });
    // this.pieces[3].draw(this.context, { sx: 700, sy: 50, rotate: 0 });
    // this.pieces[4].draw(this.context, { sx: 50, sy: 300, rotate: 0 });
    // this.pieces[5].draw(this.context, { sx: 300, sy: 300, rotate: 0 });
    // this.pieces[6].draw(this.context, { sx: 550, sy: 300, rotate: 0 });
    // this.pieces[7].draw(this.context, { sx: 700, sy: 300, rotate: 0 });

    // this.pieces[6].draw(this.context, { sx: 550, sy: 300, rotate: Math.PI / 2 });
    // this.pieces[7].draw(this.context, { sx: 700, sy: 300, rotate: Math.PI / 2 });
  }

}