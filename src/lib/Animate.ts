import { el } from "element-plus/es/locale";
import BaseCanvas from "./BaseCanvas";

export default class Animate extends BaseCanvas {

  private fps: number = 0;
  private fpsInterval: number = 0;
  private last: number = 0;

  constructor() {
    super();
    this.fps = 60;
    this.fpsInterval = 1000 / this.fps;
    this.last= new Date().getTime();
  }

  animate(): void {
    this.update();
    this.draw();
    if (this.showMark) {
      this.markCanvas.draw(this.context);
    }
    // requestAnimationFrame(this.run.bind(this));
  }
  update(): void { }
  draw(): void { }

  run() {
    requestAnimationFrame(this.run.bind(this));

    const now = new Date().getTime();
    const elapsed = now - this.last;
    if (elapsed > this.fpsInterval) {
      this.last = now - (elapsed % this.fpsInterval);
      this.animate();
    }
  }

}