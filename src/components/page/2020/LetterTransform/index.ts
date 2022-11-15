import Animate from "@/lib/Animate";

export default class LetterTransform extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  initCanvas(canvas: HTMLCanvasElement) {
    return this;
  }

  update(): void {

  }

  draw(): void {

  }

}