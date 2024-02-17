export default class MarkCanvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null = null;
  fillStyle: string;

  constructor(fillStyle: string, width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width || 240;
    this.canvas.height = height || 60;
    this.context = this.canvas.getContext('2d');
    this.fillStyle = fillStyle;
    this.init();

  }
  init () {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = this.fillStyle;
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.font = `${this.canvas.height * 0.4}px cursive`;
      this.context.fillText('shenjinxiang.com', this.canvas.width / 2, this.canvas.height / 2, 0.8 * this.canvas.width);
    }
  }
  setStyle(fillStyle: string) {
    this.fillStyle = fillStyle;
    this.init();
  }
  draw(context: CanvasRenderingContext2D | null) {
    if (!context || !this.canvas) {
      return;
    }
    context.drawImage(this.canvas, context.canvas.width - this.canvas.width, context.canvas.height - this.canvas.height);
  };
}