import Animate from "@/lib/Animate";
import { StrokeOption } from "@/lib/DrawOption";
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

class Element {
  private minX: number;
  private maxX: number;
  private xStep: number;
  private xScale: number;
  private yScale: number;
  private points: Point[];
  constructor(minX: number, maxX: number, xStep: number, func: Function, xScale: number, yScale: number) {
    this.minX = minX;
    this.maxX = maxX;
    this.xStep = xStep;
    this.xScale = xScale;
    this.yScale = yScale;
    this.points = [];
    for (let temp = this.minX; temp <= this.maxX; temp += this.xStep) {
      this.points.push({x: temp, y: func(temp)});
    }
  }

  draw(context: CanvasRenderingContext2D | null, { lineWidth = 1, strokeStyle = '#000' }: StrokeOption) {
    if (!context) {
      return;
    }
    context.save();
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.beginPath();
    this.points.forEach((item) => {
        context.lineTo(item.x * this.xScale, -item.y * this.yScale);
    });
    context.stroke();
    context.restore();
  }
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
  private xScale: number = 1;
  private yScale: number = 1;
  private elements: Element[] = [];
  private current: number = 0;
  private flag: number = 1;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.reset();
    this.initData();
  }
  private reset() {
    this.origin = {x: this.width / 2, y: this.height * 0.6};
    this.xScale = this.width / 10;
    this.yScale = this.width / 12;
  }
  private initData() {
    this.elements = [];
    for (let b = -30; b < 30; b+=0.1) {
      this.elements.push(new Element(
          -100,
          100,
          0.01, 
          (x: number) => Math.pow(x * x, 1 / 3) + 0.9 * Math.sqrt(3.3 - x * x) * Math.sin(b * Math.PI * x),
          this.xScale,
          this.yScale
        )
      )
    }
    this.current = Math.floor(this.elements.length / 2);
    this.flag = 1;
  }

  update() {
    this.current += this.flag;
    if (this.current >= this.elements.length - 1 || this.current <= 0) {
      this.flag = -this.flag;
    }
    console.log('length:', this.elements.length, ' current:', this.current, ' flag:', this.flag);
  }
  draw() {
    if (!this.context) {
      return;
    }
    this.clear(CardioidAnimation.OPTION.background);
    this.drawCoordinate();
    this.context.save();
    this.context.translate(this.origin.x, this.origin.y);
    this.elements[this.current].draw(
      this.context, 
      {
        lineWidth: CardioidAnimation.OPTION.strokeWidth,
        strokeStyle: CardioidAnimation.OPTION.strokeStyle
      }
    );
    this.context.restore();
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
  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.reset();
  }
}