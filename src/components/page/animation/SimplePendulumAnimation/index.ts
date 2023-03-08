import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string;
  lineColor: string;
}
class SimplePendulum {
  ox: number;
  oy: number;
  lineLength: number;
  bottomRadius: number;
  bottomAngleStep: number;
  currentButtomAngle: number;
  ballX: number = 0;
  ballY: number = 0;
  constructor(ox: number, oy: number, lineLength: number, maxAngle: number) {
    this.ox = ox;
    this.oy = oy;
    this.lineLength = lineLength;
    this.bottomRadius = this.lineLength * Math.sin(maxAngle);
    this.bottomAngleStep = 2 * Math.PI / this.bottomRadius;
    this.currentButtomAngle = 0;
  }
  update() {
    this.currentButtomAngle += this.bottomAngleStep;
    this.ballX = this.bottomRadius * Math.cos(this.currentButtomAngle);
    const a = Math.asin(this.ballX / this.lineLength);
    this.ballY = this.lineLength * Math.sin(a);
  }
  draw(context: CanvasRenderingContext2D | null, lineColor: string, ballColor: string, ballRadius: number) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.ox, this.oy);

    context.beginPath();
    context.strokeStyle = lineColor;
    context.moveTo(0, 0);
    context.lineTo(this.ballX, this.ballY);
    context.stroke();

    context.beginPath();
    context.fillStyle = ballColor;
    context.arc(this.ballX, this.ballY, ballRadius, 0, 2 * Math.PI, false);
    context.fill();

    context.restore();
  }
}
export default class SimplePendulumAnimation extends Animate {
  private option: IOption = {
    backgroundColor: '#000',
    lineColor: 'rgba(255, 255, 255, 0.5)'
  }
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.context.translate(0.5 * this.width, 0);
    this.context.beginPath();
    this.context.fillStyle = '#084';
    this.context.fillRect(-140, 200, 280, 180);
    this.context.restore();
  }
}