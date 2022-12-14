import Animate from "@/lib/Animate";

const PI: number = Math.PI;
const ONE_DEG: number = PI / 180;
const PI_4: number = PI / 4;
const PI_2: number = PI / 2;
const PI_3_4: number = 3 * PI / 4;
const PI_5_4: number = 5 * PI / 4;
const PI_3_2 = 3 * PI / 2;
const SQRT_2 = Math.sqrt(2);
const SQRT_2_HALF = Math.sqrt(2) / 2;
interface PiecePosition {
  hide?: boolean;
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
  draw(context: CanvasRenderingContext2D | null, { sx, sy, rotate, hide }: PiecePosition) {
    if (!context || hide) {
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

    context.strokeStyle = '#fff';
    context.lineWidth = 2;
    // context.lineJoin = 'bevel';
    context.lineJoin = 'round';
    this.createPath(context);
    context.stroke();
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
    context.moveTo(-this.size / SQRT_2, -this.size / SQRT_2);
    context.lineTo(0, 0);
    context.lineTo(this.size * SQRT_2, 0);
    context.lineTo(this.size / SQRT_2, -this.size / SQRT_2);
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
  combinations: PiecePosition[][] = [];
  // 粒子数量
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.size = 100;
    this.initCombinations();
    this.initData();
  }

  private initCombinations(): this {
    this.combinations = [
      [{ sx: 0, sy: SQRT_2, rotate: PI_3_4 }, { sx: 0, sy: SQRT_2, rotate: -PI_3_4 }, { sx: SQRT_2_HALF, sy: SQRT_2_HALF, rotate: -PI_4 }, { sx: 0, sy: SQRT_2, rotate: PI_4 }, { sx: SQRT_2, sy: 2 * SQRT_2, rotate: PI }, { sx: 0, sy: SQRT_2, rotate: -PI_4 }, { sx: SQRT_2_HALF, sy: 3 * SQRT_2_HALF, rotate: 0, hide: true }, { sx: -SQRT_2_HALF, sy: 3 * SQRT_2_HALF, rotate: 0 }],
      [{ sx: 0, sy: SQRT_2, rotate: -PI_3_4 }, { sx: -SQRT_2, sy: 0, rotate: PI_4 }, { sx: 3 * SQRT_2_HALF, sy: SQRT_2_HALF, rotate: PI_4 }, { sx: SQRT_2_HALF, sy: SQRT_2_HALF, rotate: PI_4 }, { sx: SQRT_2, sy: SQRT_2 + 1, rotate: -PI_3_4 }, { sx: SQRT_2_HALF, sy: SQRT_2_HALF, rotate: -PI_4 }, { sx: -SQRT_2, sy: 2 * SQRT_2, rotate: PI_2, hide: true }, { sx: -SQRT_2_HALF, sy: 3 * SQRT_2_HALF, rotate: PI_2 }]
    ];
    return this;
  }
  private initData(): this {
    this.pieces = [
      new Triangle(this.size * 2, 'hsla(50, 75%, 60%, 1)'), // 黄色大三角
      new Triangle(this.size * 2, 'hsla(270, 75%, 60%, 1)'), // 紫色大三角
      new Triangle(this.size, 'hsla(230, 75%, 60%, 1)'), // 蓝色小三角
      new Triangle(this.size, 'hsla(120, 75%, 60%, 1)'), // 绿色小三角
      new Triangle(this.size * SQRT_2, 'hsla(30, 75%, 60%, 1)'), // 橙色中三角
      new Square(this.size, 'hsla(190, 75%, 60%, 1)'), // 正方形
      new Parallelogram1(this.size, 'hsla(0, 75%, 60%, 1)'), // 平行四边形1
      new Parallelogram2(this.size, 'hsla(0, 75%, 60%, 1)'), // 平行四边形2
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

    this.combinations[1].forEach((pos, index) => {
      this.pieces[index].draw(this.context, { sx: pos.sx * this.size, sy: pos.sy * this.size, rotate: pos.rotate, hide: pos.hide });
    })
    this.context.restore();
  }

}