import Start from '@/components/page/2020/Star';
import Line from '@/components/page/2020/Line';

export default class FlagChina {
  constructor(width, showLines = false) {
    this.width = width;
    this.showLines = showLines;
    this.config = {
      flagColor: '#F00',
      starColor: '#FF0',
      lineColor: '#fff',
    };
    this.initData();
  }

  initData() {
    this.height = (this.width * 2) / 3;
    const gridWidth = this.width / 30;
    this.stars = [
      new Start(5 * gridWidth, 5 * gridWidth, 3 * gridWidth, -Math.PI / 2),
      new Start(10 * gridWidth, 2 * gridWidth, 1 * gridWidth, Math.PI - Math.atan(3 / 5)),
      new Start(12 * gridWidth, 4 * gridWidth, 1 * gridWidth, Math.PI - Math.atan(1 / 7)),
      new Start(12 * gridWidth, 7 * gridWidth, 1 * gridWidth, Math.PI - Math.atan(2 / 7)),
      new Start(10 * gridWidth, 9 * gridWidth, 1 * gridWidth, Math.PI - Math.atan(4 / 5)),
    ];
    this.lines = [];
    this.lines.push(new Line(this.width / 2, 0, this.width / 2, this.height));
    this.lines.push(new Line(0, this.height / 2, this.width, this.height / 2));
    for (let index = 1; index < 15; index += 1) {
      this.lines.push(new Line(index * gridWidth, 0, index * gridWidth, 10 * gridWidth));
      if (index < 10) {
        this.lines.push(new Line(0, index * gridWidth, 15 * gridWidth, index * gridWidth));
      }
      if (index < 5) {
        this.lines.push(new Line(
          this.stars.at(0).ox, this.stars.at(0).oy, this.stars.at(index).ox, this.stars.at(index).oy,
        ));
      }
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
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.config.flagColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.stars.forEach((item) => {
      item.fill(this.context, this.config.starColor);
    });
    if (this.showLines) {
      this.lines.forEach((item) => {
        item.draw(this.context, this.config.lineColor, 1);
      });
    }
  }

  setWidth(width) {
    this.width = width;
    this.initData();
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.draw();
    }
  }

  setShowLines(showLines) {
    this.showLines = showLines;
    if (this.canvas) {
      this.draw();
    }
  }
}
