import Animate from "@/lib/Animate";
interface OuterOption {
  rotate?: number,
  rectWidth?: number,
  rectHeight?: number,
  yangColor?: string,
  yinColor?: string,
  textSize?: number,
  textAlign?: CanvasTextAlign,
  textBaseline?: CanvasTextBaseline
}
class DiagramsOuter {
  private radius: number;
  private txt: string;
  private type: number;
  private bits: number[];
  constructor(radius: number, txt: string, type: number, bits: number[]) {
    this.radius = radius;
    this.txt = txt;
    this.type = type;
    this.bits = bits;
  }

  draw(context: CanvasRenderingContext2D | null, {
    rotate = 0, rectWidth = 40, rectHeight = 10, yangColor = '#fff', yinColor = '#000', textSize = 16, textAlign = 'center', textBaseline = 'middle'
  }: OuterOption): void {
    if (!context) {
      return;
    }
    context.save();
    context.rotate(rotate);
    context.translate(this.radius, 0)
    this.bits.forEach((item, index) => {
      const x = 2 * index * rectHeight;
      if (item === 1) {
        context.beginPath();
        context.fillStyle = yangColor;
        context.fillRect(x, -rectWidth / 2, rectHeight, rectWidth);
      } else {
        context.beginPath();
        context.fillStyle = yinColor;
        context.fillRect(x, -rectWidth / 2, rectHeight, 0.4 * rectWidth);

        context.beginPath();
        context.fillStyle = yinColor;
        context.fillRect(x, 0.1 * rectWidth, rectHeight, 0.4 * rectWidth);
      }
    });

    context.save();
    context.rotate(-Math.PI / 2);
    context.beginPath();
    context.fillStyle = this.type == 1 ? yangColor : yinColor;
    context.font = `${textSize}px cursive`;
    context.textAlign = textAlign
    context.textBaseline = textBaseline
    context.fillText(this.txt, 0, 6 * rectHeight);
    context.restore();

    context.restore();
  }
}
export default class EightDiagrams extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number = 0;
  height: number = 0;
  radius: number = 0;
  backgroundColor: string = '#777';
  yangColor: string = '#fff';
  yinColor: string = '#000';
  private originX: number = 0;
  private originY: number = 0;
  private readonly innerBaseStep: number = Math.PI / 3600;
  private readonly outerBaseStep: number = -Math.PI / 3600;
  private innerSpeed: number = 10;
  private outerSpeed: number = 2;
  private innerStep: number = this.innerBaseStep * this.innerSpeed;
  private outerStep: number = this.outerBaseStep * this.outerSpeed;
  private innerRotate: number = 0;
  private outerRotate: number = 0;
  private outer: number = 0;
  private innerRadius: number = 0;
  private innerPRadius: number = 0;
  private rectWidth: number = 0;
  private rectHeight: number = 0;
  private outerRadius: number = 0;
  private outerTextSize: number = 0;
  private outers: DiagramsOuter[] = [];

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.radius = Math.min(this.width, this.height) * 0.8;
    this.initData();
  }

  initData() {
    this.originX = this.width / 2;
    this.originY = this.height / 2;
    this.outer = this.radius;
    this.innerRadius = this.outer * 0.25;
    this.innerPRadius = this.outer * 0.25 / 6;
    this.rectWidth = this.outer * 0.25 / 3;
    this.rectHeight = this.outer * 0.25 / 15;
    this.outerRadius = this.outer * 0.3;
    this.outerTextSize = this.outer * 0.05;
    this.outers = [
      new DiagramsOuter(this.outerRadius, '坎', 1, [0, 1, 0]),
      new DiagramsOuter(this.outerRadius, '艮', 0, [0, 0, 1]),
      new DiagramsOuter(this.outerRadius, '坤', 0, [0, 0, 0]),
      new DiagramsOuter(this.outerRadius, '震', 0, [1, 0, 0]),
      new DiagramsOuter(this.outerRadius, '离', 0, [1, 0, 1]),
      new DiagramsOuter(this.outerRadius, '兑', 1, [1, 1, 0]),
      new DiagramsOuter(this.outerRadius, '乾', 1, [1, 1, 1]),
      new DiagramsOuter(this.outerRadius, '巽', 1, [0, 1, 1]),
    ]
    this.innerStep = this.innerBaseStep * this.innerSpeed;
    this.outerStep = this.outerBaseStep * this.outerSpeed;
  }

  initCanvas(canvas: HTMLCanvasElement): EightDiagrams {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }

  update(): void {
    this.innerRotate += this.innerStep;
    this.outerRotate += this.outerStep;
  }

  draw(): EightDiagrams {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear();
    this.context.save();
    this.context.translate(this.originX, this.originY);
    this.drawInner();
    this.drawOuter();
    this.context.restore();
    return this;
  }

  private clear(): void {
    if (!this.context || !this.canvas) {
      return;
    }
    this.context.save();
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
  }

  private drawInner(): void {
    if (!this.context || !this.canvas) {
      return;
    }
    this.context.save();
    this.context.rotate(this.innerRotate);

    this.context.beginPath();
    this.context.fillStyle = this.yangColor;
    this.context.arc(0, 0, this.innerRadius, 0, Math.PI, true);
    this.context.arc(-this.innerRadius / 2, 0, this.innerRadius / 2, Math.PI, 0, false);
    this.context.arc(this.innerRadius / 2, 0, this.innerRadius / 2, Math.PI, 0, true);
    this.context.fill();

    this.context.beginPath();
    this.context.fillStyle = this.yinColor;
    this.context.arc(0, 0, this.innerRadius, 0, Math.PI, false);
    this.context.arc(-this.innerRadius / 2, 0, this.innerRadius / 2, Math.PI, 0, false);
    this.context.arc(this.innerRadius / 2, 0, this.innerRadius / 2, Math.PI, 0, true);
    this.context.fill();

    this.context.beginPath();
    this.context.fillStyle = this.yangColor;
    this.context.arc(-this.innerRadius / 2, 0, this.innerPRadius, 0, 2 * Math.PI, false);
    this.context.fill();

    this.context.beginPath();
    this.context.fillStyle = this.yinColor;
    this.context.arc(this.innerRadius / 2, 0, this.innerPRadius, 0, 2 * Math.PI, false);
    this.context.fill();

    this.context.restore();
  }

  private drawOuter(): void {
    if (!this.context || !this.canvas) {
      return;
    }
    this.context.save();
    this.context.rotate(this.outerRotate);
    this.outers.forEach((item, index) => {
      const rotate = index * Math.PI / 4;
      item.draw(this.context, {
        rotate,
        rectWidth: this.rectWidth,
        rectHeight: this.rectHeight,
        yangColor: this.yangColor,
        yinColor: this.yinColor,
        textSize: this.outerTextSize,
        textAlign: 'center',
        textBaseline: 'top',
      })
    });

    this.context.restore();
  }

  setBackgroundColor(backgroundColor: string): EightDiagrams {
    this.backgroundColor = backgroundColor;
    return this;
  }

  setYangColor(yangColor: string): EightDiagrams {
    this.yangColor = yangColor;
    return this;
  }

  setYinColor(yinColor: string): EightDiagrams {
    this.yinColor = yinColor;
    return this;
  }

  setSize(width: number, height: number): EightDiagrams {
    this.width = width;
    this.height = height;
    this.radius = Math.min(this.width, this.height) * 0.8;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
    this.initData();
    return this;
  }
  setInnerSpeed(innerSpeed: number): EightDiagrams {
    this.innerSpeed = innerSpeed;
    this.innerStep = this.innerBaseStep * this.innerSpeed;
    return this;
  }

  setOuterSpeed(outerSpeed: number): EightDiagrams {
    this.outerSpeed = outerSpeed;
    this.outerStep = this.outerBaseStep * this.outerSpeed;
    return this;
  }

}