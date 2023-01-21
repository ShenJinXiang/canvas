import BaseCanvas from "./BaseCanvas";

export default class Animate extends BaseCanvas {

  constructor() {
    super();
  }

  run(): void {
    this.update();
    this.draw();
    if (this.showMark) {
      this.markCanvas.draw(this.context);
    }
    requestAnimationFrame(this.run.bind(this));
  }
  update(): void { }
  draw(): void { }

}