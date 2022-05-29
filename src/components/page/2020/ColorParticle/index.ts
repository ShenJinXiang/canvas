import Animate from "@/lib/Animate";
import Circle from "@/lib/Circle";
import { color, distance, random, randomOne } from "@/lib/Kit";
import Line from "@/lib/Line";

interface IOption {
  background: string,
  radius: number,
  connectDistance: number,
  minVelocity: number,
  maxVelocity: number
}
class Particle extends Circle {
  fillStyle: string = '';
  distance: number = 0;
  constructor(ox: number, oy: number, radius: number, xVelocity: number, yVelocity: number) {
    super(ox, oy, radius, xVelocity, yVelocity);
  }

  draw(context: CanvasRenderingContext2D | null) {
    super.draw(context, { fillStyle: this.fillStyle })
  }
  update(width: number, height: number): Particle {
    super.update(0, 0, width, height);
    this.distance = distance({ x: this.ox, y: this.oy }, { x: width / 2, y: height / 2 });
    this.fillStyle = color(this.distance, '30%', '50%', 1)
    return this;
  }
}
class ParticleLine extends Line {
  strokeStyle: string;
  constructor(sx: number, sy: number, ex: number, ey: number, strokeStyle: string) {
    super(sx, sy, ex, ey);
    this.strokeStyle = strokeStyle;
  }
  stroke(context: CanvasRenderingContext2D | null) {
    super.stroke(context, { strokeStyle: this.strokeStyle });
  }
}
export default class ColorParticle extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  private particleNum: number;
  private option: IOption = {
    background: '#000',
    radius: 3,
    connectDistance: 90,
    minVelocity: 0.5,
    maxVelocity: 1.5
  };
  private particles: Particle[] = [];
  private lines: ParticleLine[] = [];
  constructor(width: number, height: number, particleNum: number) {
    super();
    this.width = width;
    this.height = height;
    this.particleNum = particleNum;
    this.initData();
  }
  private initData(): ColorParticle {
    this.particles = [];
    for (let i = 0; i < this.particleNum; i++) {
      this.particles.push(this.randomParticle());
    }
    this.refreshLines();
    return this;
  }
  public initCanvas(canvas: HTMLCanvasElement): ColorParticle {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }
  private randomParticle(): Particle {
    const { radius, minVelocity, maxVelocity } = this.option;
    return new Particle(
      random(radius, this.width - radius),
      random(radius, this.height - radius),
      radius,
      randomOne() * random(minVelocity, maxVelocity),
      randomOne() * random(minVelocity, maxVelocity)
    )
  }
  private clear(): ColorParticle {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.option.background;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
    return this;
  }

  draw(): ColorParticle {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear();
    this.context.save();
    this.particles.forEach((particle) => particle.draw(this.context));
    this.lines.forEach((line) => line.stroke(this.context));
    this.context.restore();
    return this;
  }
  update(): void {
    this.particles.forEach((particle) => particle.update(this.width, this.height));
    this.refreshLines();
  }
  refreshLines(): void {
    this.lines = [];
    for (let i = 0; i < this.particles.length - 1; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dis = distance({ x: p1.ox, y: p1.oy }, { x: p2.ox, y: p2.oy });
        if (dis <= this.option.connectDistance) {
          const alpha = 1 - (dis / this.option.connectDistance);
          this.lines.push(new ParticleLine(
            p1.ox,
            p1.oy,
            p2.ox,
            p2.oy,
            color(p1.distance, '50%', '50%', alpha)
          ));
        }
      }
    }
  }

}

