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
  sx: number;
  sy: number;
  rotate: number;
  hide: boolean;
  size: number;
  fillStyle: string;
  constructor(size: number, fillStyle: string, sx: number = 0, sy: number = 0, rotate: number = 0, hide: boolean = false) {
    this.size = size;
    this.fillStyle = fillStyle;
    this.sx = sx;
    this.sy = sy;
    this.rotate = rotate;
    this.hide = hide;
  }
  position({ sx, sy, rotate, hide = false }: PiecePosition): this {
    this.sx = sx;
    this.sy = sy;
    this.rotate = rotate;
    this.hide = hide;
    return this;
  }
  draw(context: CanvasRenderingContext2D | null) {
    if (!context || this.hide) {
      return;
    }
    context.save();
    context.translate(this.sx, this.sy);
    context.rotate(this.rotate);
    context.fillStyle = this.fillStyle;
    context.shadowColor = 'rgba(0, 0, 0, 0.3)'
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = this.size * 0.15;
    this.createPath(context);
    context.fill();

    context.strokeStyle = '#fff';
    context.lineWidth = 3;
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
  text: string;
  description: string;
  textXPosi: number = 0;
  posis: PiecePosition[];
  constructor(text: string, description: string, positions: PiecePosition[]) {
    this.text = text;
    this.description = description;
    this.posis = positions;
  }
  drawText(context: CanvasRenderingContext2D, textYPosition: number, textFont: string, textColor: string, descriptionYPosition: number, descriptionFont: string, descriptionColor: string) {
    context.save();
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = textFont;
    context.fillStyle = textColor;
    context.fillText(this.text, this.textXPosi, textYPosition);
    context.restore();

    context.save();
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = descriptionFont;
    context.fillStyle = descriptionColor;
    context.fillText(this.description, this.textXPosi, descriptionYPosition);
    context.restore();
  }
}

export default class SevenPiecePuzzleAnimation extends Animate {
  size: number;
  currentCombinationIndex: number;
  currentRate: number;
  refreshRate: number;
  pieces: Piece[] = [];
  combinations: Combination[] = [];
  ox: number = 0;
  oy: number = 0;
  textYPosition: number = 0;
  descriptionYPosition: number = 0;
  textFont: string = '';
  descriptionFont: string = '';
  textColor: string = '';
  descriptionColor: string = '';

  // 粒子数量
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.size = this.height / 12;
    this.ox = this.width / 2;
    this.oy = this.height - this.size * 3;
    this.textYPosition = this.size;
    this.descriptionYPosition = this.textYPosition + this.size * 0.6;
    this.textFont = `bold ${this.size * 0.5}px arail`;
    this.descriptionFont = `${this.size * 0.25}px arail`;
    this.textColor = 'hsla(220, 75%, 60%, 1)';
    this.descriptionColor = 'hsla(220, 75%, 70%, 1)';
    this.currentCombinationIndex = 0;
    this.currentRate = 0;
    this.refreshRate = 110;
    this.initCombinations();
    this.initData();
  }

  private initCombinations(): this {
    this.combinations = [
      new Combination('Default', 'default practice', [{ sx: 0, sy: SQRT_2, rotate: PI_3_4 }, { sx: 0, sy: SQRT_2, rotate: -PI_3_4 }, { sx: SQRT_2_HALF, sy: SQRT_2_HALF, rotate: -PI_4 }, { sx: 0, sy: SQRT_2, rotate: PI_4 }, { sx: SQRT_2, sy: 2 * SQRT_2, rotate: PI }, { sx: 0, sy: SQRT_2, rotate: -PI_4 }, { sx: -SQRT_2_HALF, sy: 3 * SQRT_2_HALF, rotate: 0, hide: true }, { sx: -SQRT_2_HALF, sy: 3 * SQRT_2_HALF, rotate: 0 }]),
      new Combination('A', 'Letter A practice', [{ sx: 0, sy: 3 + SQRT_2, rotate: PI_5_4 }, { sx: -SQRT_2, sy: 3, rotate: -PI_2 }, { sx: 2 - SQRT_2, sy: 3, rotate: -PI_2 }, { sx: 3 - SQRT_2, sy: 1, rotate: PI_3_4 }, { sx: 2 - SQRT_2, sy: 2, rotate: -PI_4 }, { sx: -SQRT_2, sy: 0, rotate: 0 }, { sx: 1 - SQRT_2, sy: 1, rotate: PI_4, hide: true }, { sx: 1 - SQRT_2, sy: 1, rotate: PI_4 }]),
      new Combination('B', 'Letter B practice', [{ sx: -1, sy: 0, rotate: 0 }, { sx: -1, sy: 4, rotate: -PI_2 }, { sx: 1 + SQRT_2_HALF, sy: 2 + SQRT_2, rotate: PI_3_4 }, { sx: 1 + SQRT_2_HALF, sy: 2, rotate: PI_3_4 }, { sx: -1, sy: 2, rotate: -PI_4 }, { sx: 0, sy: 1.5, rotate: 0 }, { sx: 1, sy: 2 - SQRT_2_HALF, rotate: -PI_2, hide: true }, { sx: 1, sy: 2 - SQRT_2_HALF, rotate: -PI_2 }]),
      new Combination('C', 'Letter C practice', [{ sx: -SQRT_2, sy: 1, rotate: 0 }, { sx: -SQRT_2, sy: 3, rotate: -PI_4 }, { sx: 1 + SQRT_2_HALF, sy: 3 + SQRT_2_HALF, rotate: PI_3_4 }, { sx: 1, sy: 0, rotate: PI_2 }, { sx: 0, sy: 0, rotate: PI_4 }, { sx: 0, sy: 3 + SQRT_2, rotate: -PI_2 }, { sx: 1, sy: SQRT_2, rotate: -PI_2, hide: true }, { sx: 1, sy: SQRT_2, rotate: -PI_2 }]),
      new Combination('D', 'Letter D practice', [{ sx: SQRT_2 - 1, sy: 2, rotate: PI_3_4 }, { sx: 0, sy: SQRT_2, rotate: -PI_3_4 }, { sx: SQRT_2, sy: SQRT_2, rotate: -PI_4 }, { sx: SQRT_2, sy: 2 + SQRT_2, rotate: PI }, { sx: 1 + SQRT_2, sy: 1 + SQRT_2, rotate: PI_3_4 }, { sx: SQRT_2, sy: SQRT_2, rotate: -PI_3_4 }, { sx: SQRT_2 - 1, sy: 2 + SQRT_2, rotate: PI, hide: true }, { sx: SQRT_2 - 1, sy: 2 + SQRT_2, rotate: PI }]),
      new Combination('E', 'Letter E practice', [{ sx: -2, sy: 0, rotate: 0 }, { sx: -2, sy: 4, rotate: -PI_2 }, { sx: SQRT_2_HALF, sy: SQRT_2_HALF, rotate: -PI_4 }, { sx: 1, sy: 4, rotate: PI }, { sx: -2, sy: 2, rotate: -PI_4 }, { sx: -1 + 0.1, sy: 2, rotate: -PI_4 }, { sx: 0, sy: 0, rotate: 0, hide: true }, { sx: 0, sy: 0, rotate: 0 }]),
      new Combination('F', 'Letter F practice', [{ sx: -1.5, sy: 0, rotate: 0 }, { sx: -0.5, sy: 4, rotate: PI_4 }, { sx: SQRT_2 - 0.5, sy: 4 + SQRT_2, rotate: PI_5_4 }, { sx: -1.5, sy: 4, rotate: 0 }, { sx: -0.5, sy: 2, rotate: PI_4 }, { sx: -1.5, sy: 3, rotate: 0 }, { sx: -1.5, sy: 2, rotate: -PI_4, hide: true }, { sx: -1.5, sy: 2, rotate: -PI_4 }]),
      new Combination('1', 'Number 1 practice', [{ sx: 0, sy: 2 * SQRT_2, rotate: -PI_4 }, { sx: SQRT_2, sy: SQRT_2, rotate: PI_3_4 }, { sx: -SQRT_2_HALF, sy: 5 * SQRT_2_HALF, rotate: -PI_4 }, { sx: SQRT_2, sy: 3 * SQRT_2, rotate: PI_3_4 }, { sx: SQRT_2, sy: 0, rotate: PI_2 }, { sx: 0, sy: 2 * SQRT_2, rotate: PI_3_4 }, { sx: SQRT_2_HALF, sy: 5 * SQRT_2_HALF, rotate: PI_2, hide: true }, { sx: SQRT_2_HALF, sy: 5 * SQRT_2_HALF, rotate: PI_2 }]),
      new Combination('2', 'Number 2 practice', [{ sx: 0, sy: 0, rotate: PI_2 }, { sx: SQRT_2, sy: 1.5 + SQRT_2, rotate: PI_3_4 }, { sx: -1, sy: 0.5 + 2 * SQRT_2, rotate: PI_2 }, { sx: 0, sy: 0, rotate: 0 }, { sx: 1, sy: 0, rotate: PI_4 }, { sx: 0, sy: 0.5 + 2 * SQRT_2, rotate: PI_2 }, { sx: -SQRT_2, sy: 0.5 + 3 * SQRT_2_HALF, rotate: 0, hide: true }, { sx: -SQRT_2, sy: 0.5 + 3 * SQRT_2_HALF, rotate: 0 }]),
      new Combination('3', 'Number 3 practice', [{ sx: 0.5 + SQRT_2, sy: SQRT_2, rotate: PI_3_4 }, { sx: 1.5 - SQRT_2, sy: 3 * SQRT_2 + 1, rotate: PI_5_4 }, { sx: 0.5, sy: 2 * SQRT_2, rotate: PI }, { sx: -1.5, sy: 2, rotate: -PI_2 }, { sx: -1.5, sy: 1, rotate: -PI_4 }, { sx: -0.5, sy: 0, rotate: 0 }, { sx: 0.5, sy: 2 * SQRT_2, rotate: 0, hide: true }, { sx: 0.5, sy: 2 * SQRT_2, rotate: PI_4 }]),
      new Combination('4', 'Number 4 practice', [{ sx: 1 - SQRT_2, sy: SQRT_2 + 1, rotate: -PI_4 }, { sx: 1 - SQRT_2, sy: SQRT_2 + 1, rotate: PI_5_4 }, { sx: 1 - 3 * SQRT_2_HALF, sy: 1 + 3 * SQRT_2_HALF, rotate: PI_3_4 }, { sx: 1, sy: 2, rotate: -PI_2 }, { sx: 1 - SQRT_2, sy: 1 + 2 * SQRT_2, rotate: -PI_2 }, { sx: 0, sy: 0, rotate: 0 }, { sx: 1 - 3 * SQRT_2_HALF, sy: 1 + SQRT_2_HALF, rotate: PI_2, hide: true }, { sx: 1 - 3 * SQRT_2_HALF, sy: 1 + SQRT_2_HALF, rotate: PI_2 }]),
      new Combination('5', 'Number 5 practice', [{ sx: 0.5, sy: 3, rotate: PI }, { sx: -1.5, sy: 5, rotate: -PI_2 }, { sx: -0.5, sy: 3, rotate: PI_2 }, { sx: -1.5, sy: 2, rotate: 0 }, { sx: 0.5, sy: 1, rotate: PI_3_4 }, { sx: -0.5, sy: 0, rotate: PI_2 }, { sx: 0.5, sy: 5, rotate: -PI_3_4, hide: true }, { sx: 0.5, sy: 5, rotate: -PI_3_4 }]),
      new Combination('6', 'Number 6 practice', [{ sx: -1.5, sy: 3, rotate: -PI_4 }, { sx: -1.5, sy: 1, rotate: 0 }, { sx: 1.5 - SQRT_2_HALF, sy: 2 + SQRT_2_HALF, rotate: PI_5_4 }, { sx: -1.5 + SQRT_2, sy: 3 + SQRT_2, rotate: -PI_2 }, { sx: -0.5, sy: 0, rotate: PI_4 }, { sx: 0.5, sy: 1, rotate: 0 }, { sx: 0.5, sy: 1, rotate: PI_5_4, hide: true }, { sx: 0.5, sy: 1, rotate: PI_5_4 }]),
      new Combination('7', 'Number 7 practice', [{ sx: -1.5 * SQRT_2_HALF, sy: 5.5 * SQRT_2_HALF + 1, rotate: PI_5_4 }, { sx: SQRT_2, sy: 2 * SQRT_2_HALF + 1, rotate: PI_4 }, { sx: -SQRT_2_HALF, sy: 1 + SQRT_2_HALF, rotate: -PI_4 }, { sx: SQRT_2, sy: SQRT_2 + 1, rotate: PI_3_4 }, { sx: -SQRT_2, sy: 1, rotate: PI_5_4 }, { sx: -SQRT_2, sy: 1, rotate: -PI_4 }, { sx: 0, sy: SQRT_2 + 1, rotate: -PI_2, hide: true }, { sx: 0, sy: SQRT_2 + 1, rotate: -PI_2 }]),
      new Combination('8', 'Number 8 practice', [{ sx: -SQRT_2 - 0.5, sy: SQRT_2, rotate: -PI_4 }, { sx: SQRT_2 + 0.5, sy: SQRT_2, rotate: PI_3_4 }, { sx: -SQRT_2_HALF - 0.5, sy: 3 * SQRT_2_HALF + 2, rotate: -PI_4 }, { sx: 0.5, sy: 2 + 2 * SQRT_2, rotate: PI }, { sx: 1.5, sy: 2 * SQRT_2 + 1, rotate: PI_3_4 }, { sx: -0.5, sy: 0, rotate: 0 }, { sx: -0.5, sy: 3 * SQRT_2_HALF + 0.5, rotate: -PI_4, hide: true }, { sx: -0.5, sy: 3 * SQRT_2_HALF + 0.5, rotate: -PI_4 }]),
      new Combination('9', 'Number 8 practice', [{ sx: 0, sy: 0, rotate: PI_4 }, { sx: -SQRT_2_HALF - 1, sy: 5 * SQRT_2_HALF, rotate: -PI_4 }, { sx: SQRT_2_HALF - 1, sy: 3 * SQRT_2_HALF, rotate: 0 }, { sx: SQRT_2_HALF - 1, sy: 7 * SQRT_2_HALF, rotate: -PI_2 }, { sx: SQRT_2, sy: SQRT_2, rotate: PI_2 }, { sx: SQRT_2_HALF, sy: 7 * SQRT_2_HALF, rotate: PI_5_4 }, { sx: SQRT_2, sy: 3 * SQRT_2, rotate: 0, hide: true }, { sx: SQRT_2_HALF, sy: 5 * SQRT_2_HALF, rotate: -PI_2 }]),
      new Combination('0', 'Number 0 practice', [{ sx: 0, sy: 2 + 2 * SQRT_2, rotate: PI_5_4 }, { sx: 0, sy: 0, rotate: PI_4 }, { sx: -SQRT_2, sy: 1 + SQRT_2, rotate: 0 }, { sx: 1, sy: SQRT_2, rotate: 0 }, { sx: SQRT_2, sy: 2 + SQRT_2, rotate: PI }, { sx: -SQRT_2, sy: SQRT_2, rotate: 0 }, { sx: -SQRT_2_HALF, sy: 2 + SQRT_2_HALF, rotate: 0, hide: true }, { sx: -SQRT_2_HALF, sy: 2 + SQRT_2_HALF, rotate: 0 }]),
      new Combination('Ship', 'Transport ship practice', [{ sx: 0, sy: SQRT_2, rotate: -PI_3_4 }, { sx: -SQRT_2, sy: 0, rotate: PI_4 }, { sx: 3 * SQRT_2_HALF, sy: SQRT_2_HALF, rotate: PI_4 }, { sx: SQRT_2_HALF, sy: SQRT_2_HALF, rotate: PI_4 }, { sx: SQRT_2, sy: SQRT_2 + 1, rotate: -PI_3_4 }, { sx: SQRT_2_HALF, sy: SQRT_2_HALF, rotate: -PI_4 }, { sx: -SQRT_2_HALF, sy: 3 * SQRT_2_HALF, rotate: PI_2, hide: true }, { sx: -SQRT_2_HALF, sy: 3 * SQRT_2_HALF, rotate: PI_2 }]),
      new Combination('Rabbit', 'Animal Rabbit practice', [{ sx: -SQRT_2, sy: 2, rotate: -PI_2 }, { sx: 2 - SQRT_2, sy: 2, rotate: PI_2 }, { sx: 2 - SQRT_2 + SQRT_2_HALF, sy: 2, rotate: PI_3_4 }, { sx: SQRT_2_HALF, sy: SQRT_2_HALF, rotate: PI_3_4 }, { sx: 0, sy: 0, rotate: PI_2 }, { sx: 2 - SQRT_2, sy: 3.75, rotate: 0 }, { sx: 2 - 2 * SQRT_2, sy: 4.75, rotate: 0, hide: true }, { sx: 2 - 2 * SQRT_2, sy: 4.75, rotate: 0 }])
    ];
    return this;
  }
  private initData(): this {
    this.pieces = [
      new Triangle(this.size * 2, 'hsla(50, 75%, 60%, 1)'), // 黄色大三角 直角边: 2 斜边: 2 * SQRT_2  斜边高: SQRT_2
      new Triangle(this.size * 2, 'hsla(270, 75%, 60%, 1)'), // 紫色大三角 直角边: 2 斜边: 2 * SQRT_2  斜边高: SQRT_2
      new Triangle(this.size, 'hsla(230, 75%, 60%, 1)'), // 蓝色小三角 直角边: 1 斜边: SQRT_2  斜边高: SQRT_2_HALF
      new Triangle(this.size, 'hsla(120, 75%, 60%, 1)'), // 绿色小三角 直角边: 1 斜边: SQRT_2  斜边高: SQRT_2_HALF
      new Triangle(this.size * SQRT_2, 'hsla(30, 75%, 60%, 1)'), // 橙色中三角  直角边: SQRT_2 斜边: 2  斜边高: 1
      new Square(this.size, 'hsla(190, 75%, 60%, 1)'), // 正方形 边长 1 对角线: SQRT_2
      new Parallelogram1(this.size, 'hsla(0, 75%, 60%, 1)'), // 平行四边形1  短边 1 长边 SQRT_2 短高 SQRT_2_HALF 长高 1
      new Parallelogram2(this.size, 'hsla(0, 75%, 60%, 1)'), // 平行四边形2
    ];
    return this;
  }
  update() {
    this.currentRate++;
    if (this.currentRate >= this.refreshRate) {
      this.currentCombinationIndex++;
      if (this.currentCombinationIndex >= this.combinations.length) {
        this.currentCombinationIndex = 0;
      }
      this.currentRate = 0;
      this.combinations[this.currentCombinationIndex].textXPosi = this.width * 0.4;
    }
    const combination = this.combinations[this.currentCombinationIndex];
    combination.textXPosi += (0 - combination.textXPosi) * 0.2
    this.pieces.forEach((piece, index) => {
      if (combination.posis.length > index) {
        const posi = combination.posis[index];
        piece.sx += (posi.sx * this.size - piece.sx) * 0.25;
        piece.sy += (posi.sy * this.size - piece.sy) * 0.25;
        piece.rotate += (posi.rotate - piece.rotate) * 0.25;
        piece.hide = posi.hide || false;
      } else {
        piece.hide = true;
      }
    });
  }

  draw() {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear('#fff');
    this.context.save();
    this.context.translate(this.ox, this.oy);
    this.context.scale(1, -1);

    // this.combinations[6].posis.forEach((pos, index) => {
    //   this.pieces[index].position({ sx: pos.sx * this.size, sy: pos.sy * this.size, rotate: pos.rotate, hide: pos.hide }).draw(this.context);
    // })
    this.pieces.forEach((item) => item.draw(this.context));
    this.context.restore();
    this.context.save();
    this.context.translate(this.ox, this.oy);
    const combination = this.combinations[this.currentCombinationIndex];
    combination.drawText(this.context, this.textYPosition, this.textFont, this.textColor, this.descriptionYPosition, this.descriptionFont, this.descriptionColor);
    this.context.restore();
  }

}