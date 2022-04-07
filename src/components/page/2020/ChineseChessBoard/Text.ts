export default class Text {
  text: string;
  ox: number;
  oy: number;
  rotate: number;

  constructor(text: string, ox: number, oy: number, rotate: number = 0) {
    this.text = text;
    this.ox = ox;
    this.oy = oy;
    this.rotate = rotate;
  }

  config(context: CanvasRenderingContext2D, font: string, fillStyle: string) {
    context.translate(this.ox, this.oy);
    context.rotate(this.rotate);
    context.fillStyle = fillStyle;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = font;
  }

  fill(context: CanvasRenderingContext2D | null, font: string = '16px cursive', fillStyle: string = '#444') {
    if (!context) {
      return;
    }
    context.save();
    this.config(context, font, fillStyle);
    context.fillText(this.text, 0, 0);
    context.restore();
  }

  stroke(context: CanvasRenderingContext2D | null, font: string = '16px cursive', fillStyle: string = '#444') {
    if (!context) {
      return;
    }
    context.save();
    this.config(context, font, fillStyle);
    context.strokeText(this.text, 0, 0);
    context.restore();
  }
}