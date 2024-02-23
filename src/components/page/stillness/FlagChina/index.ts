import BaseCanvas from "@/lib/BaseCanvas";
import Line from "@/lib/Line";
import Star from "@/lib/Star";

interface Iconfig {
  flagColor: string,
  starColor: string,
  lineColor: string,
}
export default class FlagChina extends BaseCanvas {
  private static readonly config: Iconfig = {
      flagColor: '#F00',
      starColor: '#FF0',
      lineColor: '#fff',
  };
  private showLines: boolean;
  private stars: Star[] = [];
  private lines: Line[] = [];

  constructor(width: number, showLines: boolean = false) {
    super();
    this.width = width;
    this.showLines = showLines;
    this.canvas = null;
    this.context = null;
    this.initData();
  }

  private initData() {
    this.height = this.calculateHeight();
    this.stars = this.createStarts();
    this.lines = this.createLines();
  }

  private createStarts(): Star[] {
    const gridWidth = this.width / 30;
    return [
      new Star(5 * gridWidth, 5 * gridWidth, 3 * gridWidth, -Math.PI / 2),
      new Star(10 * gridWidth, 2 * gridWidth, 1 * gridWidth, Math.PI - Math.atan(3 / 5)),
      new Star(12 * gridWidth, 4 * gridWidth, 1 * gridWidth, Math.PI - Math.atan(1 / 7)),
      new Star(12 * gridWidth, 7 * gridWidth, 1 * gridWidth, Math.PI + Math.atan(2 / 7)),
      new Star(10 * gridWidth, 9 * gridWidth, 1 * gridWidth, Math.PI + Math.atan(4 / 5)),
    ];
  }

  private createLines(): Line[] {
    const gridWidth = this.width / 30;
    return [
      new Line(this.width / 2, 0, this.width / 2, this.height),
      new Line(0, this.height / 2, this.width, this.height / 2),
      ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => new Line(i * gridWidth, 0, i * gridWidth, 10 * gridWidth)),
      ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => new Line(0, i * gridWidth, 15 * gridWidth, i * gridWidth)),
      ...this.stars.map((star, i) => new Line(star.ox, star.oy, this.stars[0].ox, this.stars[0].oy)),
    ];
  }
  draw() {
    if (!this.canvas || !this.context) {
      return;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = FlagChina.config.flagColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.stars.forEach((item) => {
      item.fill(this.context, { fillStyle: FlagChina.config.starColor });
    });
    if (this.showLines) {
      this.lines.forEach((item) => {
        item.stroke(this.context, { strokeStyle: FlagChina.config.lineColor, lineWidth: 1 });
      });
    }
  }

  setWidth(width: number) {
    this.width = width;
    this.initData();
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.draw();
    }
  }

  setShowLines(showLines: boolean) {
    this.showLines = showLines;
    if (this.canvas) {
      this.draw();
    }
  }

  private calculateHeight(): number {
    return this.width * 2 / 3;
  }
}