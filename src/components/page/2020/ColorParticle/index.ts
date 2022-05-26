import Particle from "@/lib/Particle";

interface IOption {
  background: string,
  radius: number,
  connectDistance: number,
  minVelocity: number,
  maxVelocity: number
}
export default class ColorParticle {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  private particleNum: number;
  private option: IOption = {
    background: '#000',
    radius: 3,
    connectDistance: 80,
    minVelocity: 0.5,
    maxVelocity: 1.5
  };
  private particles: Particle[] = [];
  constructor(width: number, height: number, particleNum: number) {
    this.width = width;
    this.height = height;
    this.particleNum = particleNum;
  }
  private initData(): ColorParticle {
    this.particles = [];
    for (let i = 0; i < this.particleNum; i++) {
      this.particles.push();
    }
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

  public draw(): ColorParticle {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear();
    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(100, 100, 240, 180);
    return this;
  }

}