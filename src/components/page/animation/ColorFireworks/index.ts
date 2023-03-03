import Animate from "@/lib/Animate";
import { random, randomInt } from "@/lib/Kit";
import Point from "@/lib/Point";

interface IOption {
  // 星星半径
  maxStartRadius: number;
  // 创建新烟花的概率
  cretefirewordProbability: number;
  // 烟花半径
  fireRadius: number;
  // 烟花尾迹长度
  fireTrailLen: number;
  // 烟花距离边界最近距离
  firePadding: number;
  // 烟花速度
  minFireVelocity: number;
  maxFireVelocity: number;
  // 烟花粒子半径
  particleRadius: number;
  particleLifeTime: number;
  // 烟花粒子尾迹长度
  particleTrailLen: number;
  // 烟花粒子数量
  minParticleNumber: number;
  maxParticleNumber: number;
  // 烟花粒子速度
  minParticleVelocity: number;
  maxParticleVelocity: number;
  // 加速度
  a: number;
  g: number;
}

class Start {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  flag: number;
  constructor(x: number, y: number, radius: number, alpha: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.alpha = alpha;
    this.flag = random(-1, 1) > 0 ? 1 : -1;
  }
  update() {
    this.alpha += this.flag * (Math.random() * 0.04);
    if (this.alpha > 1 || this.alpha < 0) {
      this.flag = - this.flag;
      if (this.alpha > 1) {
        this.alpha = 1;
      }
      if (this.alpha < 0) {
        this.alpha = 0;
      }
    }
  }
  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.fillStyle = `rgba(255, 255, 255, ${this.alpha} )`;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }
}
enum FireWordStatus {
  LAUNCH,
  BLAST,
  DISAPPEAR
}
class Particle {
  private x: number;
  private y: number;
  private radius: number;
  private vx: number;
  private vy: number;
  private ax: number;
  private ay: number;
  private rgb: string;
  path: Point[] = [];
  constructor(x: number, y: number, radius: number, vx: number, vy: number, ax: number, ay: number, rgb: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;
    this.rgb = rgb;
  }
  update(pathLength: number) {
    if (this.path.length > pathLength) {
      this.path.shift();
    }
    this.path.push({ x: this.x, y: this.y });
    this.x += this.vx;
    this.y += this.vy;
    this.vx += this.ax;
    this.vy += this.ay;
  }
  draw(context: CanvasRenderingContext2D | null, alpha: number) {
    if (!context) {
      return;
    }
    context.save();
    context.fillStyle = `rgba(${this.rgb}, ${alpha * 0.7})`;
    if (alpha > 0.95) {
      context.fillStyle = '#fff';
    }
    context.beginPath();
    context.moveTo(this.x - this.radius, this.y);
    context.lineTo(this.path[0].x, this.path[0].y);
    context.lineTo(this.x + this.radius, this.y);
    context.closePath();
    context.fill();
    context.restore();

    context.save();
    context.fillStyle = `rgba(${this.rgb}, ${alpha})`;
    if (alpha > 0.95) {
      context.fillStyle = '#fff';
    }
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }
}
class FireWord {
  private x: number;
  private y: number;
  private radius: number;
  private vx: number;
  private vy: number;
  private ax: number;
  private ay: number;
  private rgb: string;
  private particleRadius: number;
  private particleNumber: number;
  private particleVelocity: number;
  private particleLifetime: number;
  private initParticleLifetime: number;
  status: FireWordStatus;
  path: Point[];
  particles: Particle[] = [];
  constructor(x: number, y: number, radius: number, vx: number, vy: number, ax: number, ay: number, particleRadius: number, particleNumber: number, particleVelocity: number, particleLifetime: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;
    this.particleRadius = particleRadius;
    this.particleNumber = particleNumber;
    this.particleVelocity = particleVelocity;
    this.particleLifetime = particleLifetime;
    this.initParticleLifetime = particleLifetime;
    this.rgb = `${randomInt(256)}, ${randomInt(256)}, ${randomInt(256)}`;
    this.status = FireWordStatus.LAUNCH;
    this.path = [];
  }
  update(pathLength: number, minY: number, minX: number, maxX: number, particlesPathLength: number) {
    if (this.status === FireWordStatus.LAUNCH) {
      if (this.path.length > pathLength) {
        this.path.shift();
      }
      this.path.push({ x: this.x, y: this.y });
      this.x += this.vx;
      this.y += this.vy;
      this.vx += this.ax;
      this.vy += this.ay;
      if (this.vy > 0 || this.x < minX || this.x > maxX || this.y < minY) {
        this.status = FireWordStatus.BLAST;
        this.createParticles(this.particleRadius, this.particleNumber, this.particleVelocity);
        this.particles.forEach((item) => item.update(particlesPathLength));
      }
      return;
    }
    if (this.status === FireWordStatus.BLAST) {
      this.particles.forEach((item) => item.update(particlesPathLength));
      this.particleLifetime--;
      if (this.particleLifetime < 0) {
        this.status = FireWordStatus.DISAPPEAR;
      }
    }
  }
  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    if (this.status === FireWordStatus.LAUNCH) {
      context.save();
      context.beginPath();
      // context.fillStyle = `rgba(${this.rgb}, 0.5)`;
      const t = this.path[0];
      let linearGrad = context.createLinearGradient(this.x, this.y, t.x, t.y);
      linearGrad.addColorStop(0, `rgba(${this.rgb}, 0.8)`);
      linearGrad.addColorStop(1, `rgba(${this.rgb}, 0)`);
      context.fillStyle = linearGrad;
      context.moveTo(this.x - this.radius, this.y);
      context.lineTo(this.x + this.radius, this.y);
      context.lineTo(t.x + this.radius, t.y);
      context.lineTo(t.x - this.radius, t.y);
      context.closePath();
      context.fill();
      context.restore();

      context.save();
      context.fillStyle = `rgba(${this.rgb}, 1)`;
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      context.fill();
      context.restore();
      return;
    }
    if (this.status === FireWordStatus.BLAST) {
      this.particles.forEach((item) => item.draw(context, this.particleLifetime / this.initParticleLifetime));
    }
  }
  createParticles(particleRadius: number, particleNumber: number, particleVelocity: number) {
    this.particles = [];
    const angleStep = 2 * Math.PI / particleNumber;
    for (let i = 0; i < particleNumber; i++) {
      const angle = i * angleStep;
      this.particles.push(new Particle(
        this.x,
        this.y,
        particleRadius,
        particleVelocity * Math.cos(angle),
        particleVelocity * Math.sin(angle),
        this.ax,
        this.ay,
        this.rgb
      ))
    }

  }
}

export default class ColorFireworks extends Animate {
  background: CanvasGradient | null = null;
  private option: IOption = {
    maxStartRadius: 1,
    cretefirewordProbability: 0.1,
    fireRadius: 3,
    fireTrailLen: 15,
    firePadding: 0,
    minFireVelocity: 6,
    maxFireVelocity: 10,
    particleRadius: 1,
    particleLifeTime: 150,
    particleTrailLen: 15,
    minParticleNumber: 9,
    maxParticleNumber: 30,
    minParticleVelocity: 1.75,
    maxParticleVelocity: 7,
    g: 0.2,
    a: 0.001
  };
  starts: Start[] = [];
  fireWords: FireWord[] = [];
  // 烟花数量
  firewordNumber: number = 0;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  private initData() {
    this.starts = [];
    this.firewordNumber = Math.floor(this.width / 80);
    // this.firewordNumber = 1;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (randomInt(3000) === 1) {
          this.starts.push(new Start(x, y, random(this.option.maxStartRadius), random(1)));
        }
      }
    }
  }

  public initCanvas(canvas: HTMLCanvasElement): this {
    super.initCanvas(canvas);
    if (this.context) {
      this.background = this.context.createLinearGradient(this.width / 2, this.height, this.width / 2, 0);
      this.background.addColorStop(0, '#001339');
      this.background.addColorStop(1, '#06080E');
    }
    return this;
  }

  private refreshFireWord() {
    this.fireWords = this.fireWords.filter((item) => item.status !== FireWordStatus.DISAPPEAR);
    if (this.fireWords.length < this.firewordNumber && random(1) <= this.option.cretefirewordProbability) {
      // if (this.fireWords.length < this.firewordNumber) {
      this.fireWords.push(new FireWord(
        random(this.option.firePadding, this.width - this.option.firePadding),
        this.height,
        this.option.fireRadius,
        random(-1, 1),
        random(-this.option.maxFireVelocity, -this.option.minFireVelocity),
        random(-this.option.a, this.option.a),
        random(this.option.g),
        this.option.particleRadius,
        random(this.option.minParticleNumber, this.option.maxParticleNumber),
        random(this.option.minParticleVelocity, this.option.maxParticleVelocity),
        this.option.particleLifeTime
      ));
    }
  }

  update() {
    this.starts.forEach((item) => item.update());
    this.refreshFireWord();
    this.fireWords.forEach(item => item.update(this.option.fireTrailLen, this.option.firePadding, this.option.firePadding, this.width - this.option.firePadding, this.option.particleTrailLen));
  }
  draw() {
    if (!this.context) {
      return;
    }
    if (this.background) {
      this.clear(this.background);
    } else {
      this.clear('#000');
    }
    // this.clear('#000');
    this.context.save();
    this.starts.forEach((item) => item.draw(this.context));
    this.fireWords.forEach(item => item.draw(this.context));
    this.context.restore();
  }
  public setRect(width: number, height: number): this {
    this.width = width;
    this.height = height;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
    this.initData();
    return this;
  }
}