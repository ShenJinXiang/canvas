interface IOption {
  ballNumber: number;
  maxRadius: number;
  minRadius: number;
  maxVelocity: number;
  bufWidth: number;
}
export default class RunnerBall {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  option: IOption = {
    ballNumber: 80,
    minRadius: 10,
    maxRadius: 20,
    maxVelocity: 2,
    bufWidth: 10
  };

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  initData(): RunnerBall {
    return this;
  }
  initCanvas(canvas: HTMLCanvasElement): RunnerBall {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }
  private clear(): RunnerBall {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
    return this;
  }
  public draw(): RunnerBall {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.clear();
    this.context.strokeStyle = 'red';
    this.context.arc(200, 200, 100, 0, 2 * Math.PI, false);
    this.context.stroke();
    return this;
  }

}