import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

interface IOption {
  background: string;
  padding: number;
  coordinateColor: string;
  coordinateLineWidth: number;
  coordinateArrowWidth: number;
  coordinateArrowLength: number;
  strokeStyle: string;
  strokeWidth: number;
}

export default class CardioidAnimation extends Animate {
  private static readonly OPTION: IOption = {
    background: "#000",
    padding: 10,
    coordinateColor: 'rgba(255, 255, 255, 0.5)',
    coordinateLineWidth: 2,
    coordinateArrowWidth: 10,
    coordinateArrowLength: 25,
    strokeStyle: '#F00',
    strokeWidth: 2,
  };
  private origin: Point = { x: 0, y: 0};
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }
  private initData() {
    this.origin = {x: this.width / 2, y: this.height * 0.6};
  }
  draw() {
    if (!this.context) {
      return;
    }
    this.clear(CardioidAnimation.OPTION.background);
    this.context.save();
    this.drawCoordinate();
    this.context.restore();
  }
  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
  drawCoordinate() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.strokeStyle = CardioidAnimation.OPTION.coordinateColor;
    this.context.lineWidth = CardioidAnimation.OPTION.coordinateLineWidth;

    this.context.beginPath();
    this.context.moveTo(CardioidAnimation.OPTION.padding, this.origin.y);
    this.context.lineTo(this.width - CardioidAnimation.OPTION.padding - CardioidAnimation.OPTION.coordinateArrowLength, this.origin.y);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(this.origin.x, CardioidAnimation.OPTION.padding + CardioidAnimation.OPTION.coordinateArrowLength);
    this.context.lineTo(this.origin.x, this.height - CardioidAnimation.OPTION.padding);
    this.context.stroke();

    this.context.fillStyle = CardioidAnimation.OPTION.coordinateColor;
    this.context.beginPath();
    this.context.moveTo(this.width - CardioidAnimation.OPTION.padding, this.origin.y);
    this.context.lineTo(this.width - CardioidAnimation.OPTION.padding - CardioidAnimation.OPTION.coordinateArrowLength, this.origin.y - CardioidAnimation.OPTION.coordinateArrowWidth / 2);
    this.context.lineTo(this.width - CardioidAnimation.OPTION.padding - CardioidAnimation.OPTION.coordinateArrowLength, this.origin.y + CardioidAnimation.OPTION.coordinateArrowWidth / 2);
    this.context.closePath();
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(this.origin.x, CardioidAnimation.OPTION.padding);
    this.context.lineTo(this.origin.x - CardioidAnimation.OPTION.coordinateArrowWidth / 2, CardioidAnimation.OPTION.padding + CardioidAnimation.OPTION.coordinateArrowLength);
    this.context.lineTo(this.origin.x + CardioidAnimation.OPTION.coordinateArrowWidth / 2, CardioidAnimation.OPTION.padding + CardioidAnimation.OPTION.coordinateArrowLength);
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  }
}