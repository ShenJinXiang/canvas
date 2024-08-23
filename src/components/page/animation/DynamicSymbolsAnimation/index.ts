import Animate from "@/lib/Animate";

interface IOption {
  showColor: string;
  xRatio: number;
  yRatio: number;
}

const OPTION: IOption = {
  showColor: '#fff',
  xRatio: 0.7,
  yRatio: 5
};
export default class DynamicSymbolsAnimation extends Animate {

  private endpointx: number = 0;
  private endpointy: number = 0;
  private contropointx: number = 0;
  private contropointy: number = 0;
  private lineWidth: number = 1;

  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    this.endpointx = this.width * 0.07;
    this.endpointy = this.endpointx * OPTION.xRatio;
    this.contropointx = this.endpointx * OPTION.yRatio;
    this.contropointy = this.endpointy * OPTION.yRatio;
    this.lineWidth = this.width * 0.005;
    this.lineWidth = this.lineWidth < 2 ? this.lineWidth = 2 : this.lineWidth;
  }

  draw() {
    if (!this.context) {
      return;
    }

    this.context.save();
    this.drawBackground();
    this.drawBaseline();
    this.context.restore();
  }

  drawBaseline() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.translate(this.width / 2, this.height / 2);
    for (let i = 0; i < 2; i++) {
      this.context.save();
      if (i === 1) {
        this.context.rotate(Math.PI);
      }
      this.context.beginPath();
      this.context.strokeStyle = OPTION.showColor;
      this.context.lineWidth = this.lineWidth;
      this.context.moveTo(0, 0);
      this.context.lineTo(this.endpointx, this.endpointy);
      this.context.bezierCurveTo(this.contropointx, this.contropointy, this.contropointx, -this.contropointy, this.endpointx, -this.endpointy);
      this.context.lineTo(0, 0);
      this.context.stroke();
      this.context.restore();
    }
    this.context.restore();
  }

  private drawBackground() {
    if (!this.context) {
      return;
    }
    const grad = this.context.createLinearGradient(0, this.height, this.width, 0);
    grad.addColorStop(0, '#d16ba5');
    grad.addColorStop(1 / 11, '#c777b9');
    grad.addColorStop(2 / 11, '#ba83ca');
    grad.addColorStop(3 / 11, '#aa8fd8');
    grad.addColorStop(4 / 11, '#9a9ae1');
    grad.addColorStop(5 / 11, '#8aa7ec');
    grad.addColorStop(6 / 11, '#79b3f4');
    grad.addColorStop(7 / 11, '#69bff8');
    grad.addColorStop(8 / 11, '#52cffe');
    grad.addColorStop(9 / 11, '#41dfff');
    grad.addColorStop(10 / 11, '#46eefa');
    grad.addColorStop(1, '#5ffbf1');
    this.context.fillStyle = grad;
    this.context.fillRect(0, 0, this.width, this.height);
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
  
}