import Animate from "@/lib/Animate";
import { random } from "@/lib/Kit";

interface IOption {
  backgroundColor: string;
};

class Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.tx = x;
    this.ty = y;
  }

  update(t: number) {
    this.x = this.tx + Math.sin((50 + this.x + (t / 10)) / 100) * 5;
    this.y = this.ty + Math.sin((45 + this.x + (t / 10)) / 100) * 6;
  }

  draw(context: CanvasRenderingContext2D | null) { }
}
class Circular extends Particle {

  radius: number;
  lineWidth: number;

  constructor(x: number, y: number, sc: number) {
    super(x, y);
    this.radius = sc * 10;
    this.lineWidth = sc * 5;
  }

  public draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.beginPath();
    context.strokeStyle = '#fff';
    context.lineWidth = this.lineWidth;
    context.translate(this.x, this.y);
    context.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
    context.stroke();
    context.restore();
  }

}
class Cross extends Particle {
  length: number;
  lineWidth: number;
  rotate: number;

  constructor(x: number, y: number, sc: number) {
    super(x, y);
    this.lineWidth = 5 * sc;
    this.length = 20 * sc;
    this.rotate = random(Math.PI);
  }

  update(t: number): void {
    super.update(t);
    this.rotate += 2 / this.tx;
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.strokeStyle = '#fff';
    context.lineWidth = this.lineWidth;
    context.translate(this.x, this.y);
    context.rotate(this.rotate);
    context.beginPath();
    context.moveTo(-0.5 * this.length, 0);
    context.lineTo(0.5 * this.length, 0);
    context.stroke();
    context.beginPath();
    context.moveTo(0, -0.5 * this.length);
    context.lineTo(0, 0.5 * this.length);
    context.stroke();
    context.restore();
  }
}
class Rect extends Particle {
  length: number;
  lineWidth: number;
  rotate: number;
  constructor(x: number, y: number, sc: number) {
    super(x, y);
    this.lineWidth = 4 * sc;
    this.length = 20 * sc;
    this.rotate = random(Math.PI);
  }
  update(t: number): void {
    super.update(t);
    this.rotate += 2 / this.tx;
  }
  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.lineWidth = this.lineWidth;
    context.strokeStyle = '#fff';
    context.translate(this.x, this.y);
    context.rotate(this.rotate);
    context.strokeRect(-0.5 * this.length, -0.5 * this.length, this.length, this.length);
    context.restore();
  }
}
class Start extends Particle {
  num: number;
  outerRadius: number;
  innerRadius: number;
  lineWidth: number;
  rotate: number;
  degStep: number;
  constructor(x: number, y: number, sc: number, num: number) {
    super(x, y);
    this.num = num;
    this.outerRadius = 12 * sc;
    this.innerRadius = 0.3 * sc;
    this.lineWidth = 2 * sc;
    this.rotate = random(Math.PI);
    this.degStep = 2 * Math.PI / this.num;
  }

  update(t: number): void {
    super.update(t);
    this.rotate += 2 / this.tx;
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.strokeStyle = '#fff';
    context.lineWidth = this.lineWidth;
    context.translate(this.x, this.y);
    context.rotate(this.rotate);
    context.beginPath();
    for (let i = 0; i < this.num; i++) {
      context.lineTo(this.outerRadius * Math.cos(i * this.degStep), this.outerRadius * Math.sin(i * this.degStep));
      context.lineTo(this.innerRadius * Math.cos((0.5 + i) * this.degStep), this.innerRadius * Math.sin((0.5 + i) * this.degStep));
    }
    context.closePath();
    context.stroke();
    context.restore();
  }
}
export default class GeometricParticle extends Animate {
  elements: Particle[] = [];
  option: IOption = {
    backgroundColor: '#04BBD3'
  };
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.initData();
  }

  initData() {
    this.elements = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (Math.round(random(5000)) === 1) {
          const sc = random(0.1, 0.6);
          var index = Math.floor(Math.random() * 7);
          switch (index) {
            case 0:
              this.elements.push(new Circular(x, y, sc));
              break;
            case 1:
              this.elements.push(new Cross(x, y, sc));
              break;
            case 2:
              this.elements.push(new Rect(x, y, sc));
              break;
            case 3:
              this.elements.push(new Start(x, y, sc, 3));
              break;
            case 4:
              this.elements.push(new Start(x, y, sc, 4));
              break;
            case 5:
              this.elements.push(new Start(x, y, sc, 5));
              break;
            case 6:
              this.elements.push(new Start(x, y, sc, 6));
              break;
          }
        }
      }
    }
  }

  update(): void {
    this.elements.forEach((item) => item.update(new Date().getTime()));
  }

  draw(): void {
    if (!this.canvas || !this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.elements.forEach((item) => item.draw(this.context));
  }
}