export default class Animate {
  run(): void {
    this.update();
    this.draw();
    requestAnimationFrame(this.run.bind(this));
  }
  update(): void { }
  draw(): void { }
}