export default class CanvasAnimatAble {
  run(): void {
    this.update();
    this.draw();
    requestAnimationFrame(this.run.bind(this));
  }
  update(): void { }
  draw(): void { }
}