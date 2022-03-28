import Line from '@/components/page/2020/Line';

export default class ChineseChessBoard {
  constructor(gridWidth) {
    this.option = {
      background: '#fdf5db',
      lineColor: '#444',
      gridWidth: gridWidth || 80,
      cornerDistance: 6,
      cornerWidth: 14,
      margin: 10,
      borderWidth: 5,
      outerWidth: 40,
    };
    this.initData();
  }

  initData() {
    this.width = 8 * this.option.gridWidth + 2 * this.option.margin + 2 * this.option.outerWidth;
    this.height = 9 * this.option.gridWidth + 2 * this.option.margin + 2 * this.option.outerWidth;
    this.ox = this.option.outerWidth + this.option.margin;
    this.lines = [];
    for (let index = 0; index < 10; index += 1) {
      this.lines.push(new Line(
        0,
        index * this.option.gridWidth,
        8 * this.option.gridWidth,
        index * this.option.gridWidth,
      ));
    }
  }

  initCanvas(canvas) {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    this.draw();
  }

  draw() {
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.option.background;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.translate(this.ox, this.ox);
    this.lines.forEach((item) => {
      item.draw(this.context, this.option.lineColor, 1);
    });
    this.context.restore();
  }
}
