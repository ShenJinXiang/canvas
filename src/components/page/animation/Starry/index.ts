import Animate from "@/lib/Animate";
import { random } from "@/lib/Kit";

interface IOption {
  density: number;
  densitySize: number;
  velocityX: number;
  velocityY: number;
  particleMaxRadius: number;
  particleColor: string;
}
class Particle {
  ox: number;
  oy: number;
  radius: number;
  constructor(ox: number, oy: number, radius: number) {
    this.ox = ox;
    this.oy = oy;
    this.radius = radius;
  }

  update(vx: number, vy: number) {
    this.ox += vx;
    this.oy += vy;
  }
  isCrossBorder(): boolean {
    return this.oy <= 0;
  }
  draw(context: CanvasRenderingContext2D | null, fillStyle: string) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.ox, this.oy);
    context.scale(this.radius, this.radius);
    context.fillStyle = fillStyle;
    context.beginPath();
    context.arc(0, 0, 1, 0, 2 * Math.PI, false);
    context.closePath();
    context.fill();
    context.restore();
  }
}
export default class Starry extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  // 粒子数量
  particleBuffLength: number = 0;
  particles: Particle[] = [];
  count: number;
  option: IOption = {
    density: 3,
    densitySize: 100,
    velocityX: -1,
    velocityY: -0.5,
    particleMaxRadius: 2,
    particleColor: '#fff'
  }
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.count = 0;
    this.initData();
  }

  private initData(): this {
    const particleNumber = Math.round((this.option.density * this.width * this.height) / (this.option.densitySize * this.option.densitySize));
    this.particleBuffLength = Math.round(this.option.density * this.width / this.option.densitySize);
    this.particles = [];
    for (let i = 0; i < particleNumber; i++) {
      this.particles.push(new Particle(
        random(this.width * 2),
        // random(this.height),
        random(this.height + this.option.densitySize),
        random(this.option.particleMaxRadius)
      ));
    }
    return this;
  }
  public initCanvas(canvas: HTMLCanvasElement): this {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }

  private clear(): this {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const clg = this.context.createLinearGradient(this.width / 2, this.height, this.width / 2, 0);
    clg.addColorStop(0, '#001339');
    clg.addColorStop(1, '#06080E');
    this.context.fillStyle = clg;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
    return this;
  }

  update() {
    this.count++;
    if (this.count >= Math.abs(this.option.densitySize / this.option.velocityY)) {
      for (let i = 0; i < this.particleBuffLength; i++) {
        this.particles.push(new Particle(
          random(this.width * 2),
          random(this.height, this.height + this.option.densitySize),
          random(this.option.particleMaxRadius)
        ));
      }
      this.count = 0;
    }
    this.particles.forEach((item) => item.update(this.option.velocityX, this.option.velocityY));
    let cnt = 0
    for (let i = 0; i < this.particles.length; i++) {
      if (!this.particles[i].isCrossBorder()) {
        this.particles[cnt++] = this.particles[i];
      }
    }
    while (this.particles.length > cnt) {
      this.particles.pop();
    }
  }

  draw() {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear();
    this.particles.forEach((item) => item.draw(this.context, this.option.particleColor));
  }

}
