import Animate from "@/lib/Animate";
import { random, timeDis, TimeInfo } from "@/lib/Kit";

interface IOption {
  maxVelocityX: number;
  maxVelocityY: number;
  minVelocityX: number;
  minVelocityY: number;
  maxRadius: number;
  minRadius: number;
  maxAlpha: number;
  minAlpha: number;
  fontColor: string;
}
interface ElOption {
  velocityX: number;
  velocityY: number;
  radius: number;
  alpha: number;
}
class Element {
  x: number;
  y: number;
  velocityX: number = 0;
  velocityY: number = 0;
  radius: number = 0;
  alpha: number = 0;

  constructor(x: number, y: number, option: ElOption) {
    this.x = x;
    this.y = y;
    this.setOption(option);
  }

  setOption(option: ElOption) {
    this.velocityX = option.velocityX;
    this.velocityY = option.velocityY;
    this.radius = option.radius;
    this.alpha = option.alpha;
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.beginPath();
    context.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }
}
interface TextOption {
  nextYearX: number;
  nextYearY: number;
  nextYearFontSize: number;
  nextYearFontColor: string;
  daysX: number;
  hoursX: number;
  minutesX: number;
  secondsX: number;
  numY: number;
  labelY: number;
  numFontSize: number;
  numFontColor: string;
  labelFontSize: number;
  labelFontColor: string;
}
export default class NewYearCountdown extends Animate {
  private option: IOption = {
    maxVelocityX: 1.5,
    minVelocityX: -1.5,
    maxVelocityY: 5,
    minVelocityY: 2,
    maxRadius: 4,
    minRadius: 1,
    maxAlpha: 0.9,
    minAlpha: 0.1,
    fontColor: '#d99c3b',
  };
  private elements: Element[] = [];
  // private texts: TextInfo | null = null;
  private textOption: TextOption = {
    nextYearX: 0,
    nextYearFontColor: '',
    nextYearFontSize: 0,
    nextYearY: 0,
    numFontColor: '',
    numFontSize: 0,
    numY: 0,
    labelFontColor: '',
    labelFontSize: 0,
    labelY: 0,
    daysX: 0,
    hoursX: 0,
    minutesX: 0,
    secondsX: 0
  };
  private calcTime: boolean = true;
  private target: number;
  private timeInfo: TimeInfo = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.initData();
    this.target = 0;
  }

  update() {
    this.elements.forEach((item) => {
      item.x += item.velocityX;
      item.y += item.velocityY;
      if (item.y + item.radius > this.height) {
        item.setOption(this.randomElOption());
        item.y = -item.radius;
      }
    });
    const now = new Date();
    const year = now.getFullYear();
    const target = new Date();
    target.setFullYear(year + 1);
    target.setMonth(0);
    target.setDate(1);
    target.setHours(0);
    target.setMinutes(0);
    target.setSeconds(0);
    var nowTime = now.getTime();
    var targetTime = target.getTime();
    this.timeInfo = timeDis(targetTime - nowTime);
    console.log(this.elements.length);
  }
  draw() {
    if (!this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.elements.forEach((item) => item.draw(this.context));

    this.drawText();
    this.context.restore();
  }

  private drawText() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = this.textOption.nextYearFontColor;
    this.context.font = `${this.textOption.nextYearFontSize}px Aleo`;
    this.context.fillText('2024', this.textOption.nextYearX, this.textOption.nextYearY);
    this.context.fillStyle = this.textOption.numFontColor;
    this.context.font = `${this.textOption.numFontSize}px Aleo`;
    this.context.fillText(`${this.timeInfo.days}`, this.textOption.daysX, this.textOption.numY);
    this.context.fillText(`${this.timeInfo.hours}`, this.textOption.hoursX, this.textOption.numY);
    this.context.fillText(`${this.timeInfo.minutes}`, this.textOption.minutesX, this.textOption.numY);
    this.context.fillText(`${this.timeInfo.seconds}`, this.textOption.secondsX, this.textOption.numY);
    this.context.fillStyle = this.textOption.labelFontColor;
    this.context.font = `${this.textOption.labelFontSize}px Aleo`;
    this.context.fillText('DAYS', this.textOption.daysX, this.textOption.labelY);
    this.context.fillText('HOURS', this.textOption.hoursX, this.textOption.labelY);
    this.context.fillText('MINUTES', this.textOption.minutesX, this.textOption.labelY);
    this.context.fillText('SECONDS', this.textOption.secondsX, this.textOption.labelY);
    this.context.restore();
  }

  private initData() {
    this.elements = [];
    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        if (Math.round(random(4000)) === 1) {
          this.elements.push(new Element(x, y, this.randomElOption()));
        }
      }
    }
    this.textOption = {
      nextYearFontColor: 'rgba(250, 250, 250, 0.2)',
      numFontColor: '#d99c3b',
      labelFontColor: '#d99c3b',
      nextYearFontSize: this.height * 0.055,
      labelFontSize: this.height * 0.016,
      numFontSize: this.height * 0.048,
      nextYearX: this.width * 0.5,
      daysX: this.width * 0.38,
      hoursX: this.width * 0.46,
      minutesX: this.width * 0.54,
      secondsX: this.width * 0.62,
      nextYearY: this.height * 0.55,
      numY: this.height * 0.62,
      labelY: this.height * 0.65,
    }
  }

  private randomElOption(): ElOption {
    return {
      velocityX: random(this.option.minVelocityX, this.option.maxVelocityX),
      velocityY: random(this.option.minVelocityY, this.option.maxVelocityY),
      radius: random(this.option.minRadius, this.option.maxRadius),
      alpha: random(this.option.minAlpha, this.option.maxAlpha)
    };
  }
}