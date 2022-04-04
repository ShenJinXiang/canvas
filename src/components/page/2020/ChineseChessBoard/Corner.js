export default class Corner {
  constructor(ox, oy, quadrants, distance, lineLength) {
    this.ox = ox;
    this.oy = oy;
    this.quadrants = quadrants;
    this.distance = distance;
    this.lineLength = lineLength;
  }

  draw(context, style = '#000', lineWidth = 1) {
    const ctx = context;
    ctx.save();
    ctx.strokeStyle = style;
    ctx.lineWidth = lineWidth;
    ctx.translate(this.ox, this.oy);
    this.quadrants.forEach((item) => {
      ctx.save();
      ctx.rotate(item * (Math.PI / 2));
      ctx.beginPath();
      ctx.moveTo(this.distance, this.distance + this.lineLength);
      ctx.lineTo(this.distance, this.distance);
      ctx.lineTo(this.distance + this.lineLength, this.distance);
      ctx.stroke();
      ctx.restore();
    });
    ctx.restore();
  }
}
