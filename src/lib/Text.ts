import { TextOption } from "@/lib/DrawOption";

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
  config(context: CanvasRenderingContext2D, { font = '16px cursive', textAlign = 'center', textBaseline = 'middle' }: TextOption) {
    context.translate(this.ox, this.oy);
    context.rotate(this.rotate);
    context.textAlign = textAlign;
    context.textBaseline = textBaseline;
    context.font = font;
  }
  fill(context: CanvasRenderingContext2D | null,
    { fillStyle = '#444', font = '16px cursive', textAlign = 'center', textBaseline = 'middle' }: TextOption) {
    if (!context) {
      return;
    }
    context.save();
    this.config(context, { font, textAlign, textBaseline });
    context.fillStyle = fillStyle;
    context.fillText(this.text, 0, 0);
    context.restore();
  }
  stroke(context: CanvasRenderingContext2D | null,
    { strokeStyle = '#444', font = '16px cursive', textAlign = 'center', textBaseline = 'middle' }: TextOption) {
    if (!context) {
      return;
    }
    context.save();
    this.config(context, { font, textAlign, textBaseline });
    context.strokeStyle = strokeStyle;
    context.strokeText(this.text, 0, 0);
    context.restore();
  }
}