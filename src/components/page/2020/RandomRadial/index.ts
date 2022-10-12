import Animate from "@/lib/Animate";
import { StrokeOption } from "@/lib/DrawOption";
import { random } from "@/lib/Kit";

interface IOption {
  lineColor: string;
  maxStep: number;
  minStep: number;
  outer: number;
};
class RadialLine {
  sx: number;
  sy: number;
  length: number;
  step: number;
  index: number;
  rotate: number;

  constructor(sx: number, sy: number, length: number, rotate: number, step: number) {
    this.sx = sx;
    this.sy = sy;
    this.rotate = rotate;
    this.length = length;
    this.step = step;
    this.index = 0;
  }

  reset() {
    this.index = 0;
    return this;
  }

  complate() {
    return this.index >= this.length;
  }

  update() {
    this.index += this.step;
  }

  stroke(context: CanvasRenderingContext2D | null, { strokeStyle = '#000', lineWidth = 1, lineDash = null }: StrokeOption) {
    if (!context) {
      return;
    }
    context.save();
    context.lineWidth = lineWidth || 1;
    context.strokeStyle = strokeStyle;
    if (lineDash) {
      context.setLineDash(lineDash);
    }
    context.translate(this.sx, this.sy);
    context.rotate(this.rotate);
    context.beginPath();
    context.moveTo(0, 9);
    context.lineTo(this.index, 0);
    context.stroke();
    context.restore();
  }
}
export default class RandomRadial extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  option: IOption = {
    lineColor: 'rgba(255, 255, 255, 0.6)',
    maxStep: 30,
    minStep: 15,
    outer: 10
  };
  maxLineLength: number = 0;
  minLineLength: number = 0;
  lineNumber: number;
  lines: RadialLine[] = [];

  constructor(width: number, height: number, lineNumber: number) {
    super();
    this.width = width;
    this.height = height;
    this.lineNumber = lineNumber;
    this.initData();
  }
  initData(): RandomRadial {
    this.maxLineLength = Math.sqrt(this.width * this.width + this.height * this.height) + 10;
    this.minLineLength = this.maxLineLength * 0.8;
    for (let i = 0; i < this.lineNumber; i++) {
      this.lines.push(this.randomLine());
    }
    return this;
  }
  initCanvas(canvas: HTMLCanvasElement): RandomRadial {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }
  update() {
    this.lines = this.lines.filter((item) => !item.complate());
    if (this.lines.length > this.lineNumber) {
      this.lines.splice(this.lineNumber);
    } else {
      for (let i = this.lines.length; i < this.lineNumber; i++) {
        this.lines.push(this.randomLine());
      }
    }
    this.lines.forEach((item) => item.update());
    console.log(this.lines.length);
  }
  draw(): RandomRadial {
    this.clear();
    this.lines.forEach((item) => item.stroke(this.context, { strokeStyle: this.option.lineColor }));
    return this;
  }
  private clear(): RandomRadial {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
  }
  private randomLine(): RadialLine {
    const deg = Math.PI / 6;
    const { outer, maxStep, minStep } = this.option;
    const width = this.width;
    const height = this.height;
    let sx: number = 0;
    let sy: number = 0;
    let ro: number = random(2 * Math.PI);
    if (ro > 0 && ro <= 1 * deg) {
      sx = random(-outer, 0);
      sy = random(0, height / 2);
    } else if (ro > 1 * deg && ro <= 2 * deg) {
      sx = random(-outer, 0);
      sy = random(-outer, 0);
    } else if (ro > 2 * deg && ro <= 3 * deg) {
      sx = random(0, width / 2);
      sy = random(-outer, 0);
    } else if (ro > 3 * deg && ro <= 4 * deg) {
      sx = random(width / 2, width);
      sy = random(-outer, 0);
    } else if (ro > 4 * deg && ro <= 5 * deg) {
      sx = random(width, width + outer);
      sy = random(-outer, 0);
    } else if (ro > 5 * deg && ro <= 6 * deg) {
      sx = random(width, width + outer);
      sy = random(0, height / 2);
    } else if (ro > 6 * deg && ro <= 7 * deg) {
      sx = random(width, width + outer);
      sy = random(height / 2, height);
    } else if (ro > 7 * deg && ro <= 8 * deg) {
      sx = random(width, width + outer);
      sy = random(height, height + outer);
    } else if (ro > 8 * deg && ro <= 9 * deg) {
      sx = random(width / 2, width);
      sy = random(height, height + outer);
    } else if (ro > 9 * deg && ro <= 10 * deg) {
      sx = random(0, width / 2);
      sy = random(height, height + outer);
    } else if (ro > 10 * deg && ro <= 11 * deg) {
      sx = random(-outer, 0);
      sy = random(height, height + outer);
    } else if (ro > 11 * deg && ro <= 12 * deg) {
      sx = random(-outer, 0);
      sy = random(height / 2, height);
    }
    return new RadialLine(sx, sy, random(this.minLineLength, this.maxLineLength), ro, random(minStep, maxStep))
  }
  public setRect(width: number, height: number): RandomRadial {
    this.width = width;
    this.height = height;
    this.maxLineLength = Math.sqrt(this.width * this.width + this.height * this.height) + 10;
    this.minLineLength = this.maxLineLength * 0.8;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
    return this;
  }
  public setLineNumber(lineNumber: number): RandomRadial {
    this.lineNumber = lineNumber;
    return this;
  }
}
