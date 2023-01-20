export default class MarkCanvas {
  canvas: HTMLCanvasElement;

  constructor(fillStyle: string, width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width || 240;
    this.canvas.height = height || 60;
    const context: CanvasRenderingContext2D | null = this.canvas.getContext('2d');

    if (context) {
      context.fillStyle = fillStyle;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.font = `${this.canvas.height * 0.4}px cursive`;
      context.fillText('shenjinxiang.com', this.canvas.width / 2, this.canvas.height / 2, 0.8 * this.canvas.width);
    }
  }
  draw(context: CanvasRenderingContext2D | null) {
    if (!context || !this.canvas) {
      return;
    }
    context.drawImage(this.canvas, context.canvas.width - this.canvas.width, context.canvas.height - this.canvas.height);
  };
}