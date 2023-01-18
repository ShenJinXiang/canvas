
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
}
class Circular extends Particle {

  radius: number;
  lineWidth: number;

  constructor(x: number, y: number, sc: number) {
    super(x, y);
    this.radius = sc * 12;
    this.lineWidth = sc * 5;
  }

}
export default class GeometricParticle {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  option: IOption = {
    backgroundColor: '#04BBD3'
  };
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  initCanvas(canvas: HTMLCanvasElement): this {
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
    this.context.fillStyle = this.option.backgroundColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
    return this;
  }

  draw(): this {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear();
    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(200, 200, 200, 140);
    this.context.stroke();
    return this;
  }
}