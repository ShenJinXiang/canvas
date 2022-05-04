interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
interface IOption {
  lineColor: string;
  backgroundColor: string;
  margin: Margin;
  blackColor: string;
  whiteColor: string;
}
export default class ChineseGo {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  gridWidth: number;
  width: number;
  height: number;
  row: number;
  col: number;
  rows: number[] = [];
  cols: number[] = [];
  private option: IOption = {
    lineColor: '#444',
    backgroundColor: '#fdf5db',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    blackColor: '#000',
    whiteColor: '#fff'
  };
  constructor(gridWidth: number) {
    this.row = 19;
    this.col = 19;
    this.gridWidth = gridWidth;
    this.width = this.gridWidth * (this.col + 1);
    this.height = this.gridWidth * (this.row + 1);
  }
  initData(): ChineseGo {
    this.cols = [];
    for (let c = 0; c < this.col; c++) {
      this.cols.push();
    }
    this.rows = [];
    for (let r = 0; r < this.row; r++) {

    }
    return this;
  }
  initCanvas(canvas: HTMLCanvasElement): ChineseGo {
    if (!canvas) {
      throw new Error('初始化canvas错误：对象为空！');
    }
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    return this;
  }
}