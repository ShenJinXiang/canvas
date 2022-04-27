
export default class EightDiagrams {
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
  private outer: number = 0;
  private innerRadius: number = 0;
  private innerPRadius: number = 0;
  private rectWidth: number = 0;
  private rectHeight: number = 0;
  private outerRadius: number = 0;
  private outerTextSize: number = 0;

  constructor(width: number, height: number, radius: number) {
    this.width = width;
    this.height = height;
    this.radius = radius;
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
  }

  initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    this.draw();
  }

  draw(): void {
    if (!this.canvas || !this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.context.translate(this.originX, this.originY);
    this.drawInner();
    this.context.restore();
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

}