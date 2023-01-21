import BaseCanvas from '@/lib/BaseCanvas';
import Text from '@/lib/Text';
class Piece {
  radius: number;
  backRadius: number;
  outerRadius: number;
  innerRadius: number;
  olRadius: number;
  ilRadius: number;
  fontSize: number;
  text: Text;
  constructor(radius: number) {
    this.radius = radius;
    this.backRadius = this.radius * 0.9;
    this.outerRadius = this.radius * 0.85;
    this.olRadius = this.radius * 0.8;
    this.ilRadius = this.radius * 0.75;
    this.innerRadius = this.radius * 0.7;
    this.fontSize = this.radius;
    this.text = new Text('将', 0, 0);
  }
  draw(context: CanvasRenderingContext2D | null, ox: number, oy: number) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(ox, oy);
    this.background(context);
    this.strokeBorder(context);
    this.text.fill(context, { fillStyle: 'red', font: `${this.fontSize}px '楷体'` });
    context.restore();
  }

  private background(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.fillStyle = 'rgba(190, 147, 81, 0.8)';
    context.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    context.fill();

    // context.beginPath();
    // context.fillStyle = 'rgba(231, 212, 162, 1)';
    // context.arc(0, 0, this.backRadius, 0, Math.PI * 2, false);
    // context.fill();
  }
  private strokeBorder(context: CanvasRenderingContext2D) {
    context.strokeStyle = 'red';
    context.beginPath();
    context.arc(0, 0, this.outerRadius, 0, Math.PI * 2, false);
    context.stroke();
    context.beginPath();
    context.arc(0, 0, this.innerRadius, 0, Math.PI * 2, false);
    context.stroke();
    const num = 19;
    const angStep = 2 * Math.PI / num;
    for (let i = 0; i < num; i++) {
      context.save();
      context.rotate(angStep * i);
      context.beginPath();
      context.moveTo(this.innerRadius, 0);
      context.lineTo(this.olRadius, 0);
      context.stroke();

      context.beginPath();
      context.arc(0, 0, this.olRadius, -angStep / 3, angStep / 3, false);
      context.stroke();

      context.rotate(angStep / 2);
      context.beginPath();
      context.moveTo(this.ilRadius, 0);
      context.lineTo(this.outerRadius, 0);
      context.stroke();

      context.beginPath();
      context.arc(0, 0, this.ilRadius, -angStep / 3, angStep / 3, false);
      context.stroke();

      context.restore();
    }
  }
}
export default class ChineseChess extends BaseCanvas {
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }
  draw() {
    const p1 = new Piece(200);
    p1.draw(this.context, this.width / 2, this.height / 2);
  }
}
