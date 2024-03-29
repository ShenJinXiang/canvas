import Animate from "@/lib/Animate";

interface oprateStatus {
  ele?: Element;
  nexts?: Position[];
}
export interface IResult {
  step: number;
  complete: boolean
};
interface Position {
  colIndex: number;
  rowIndex: number;
}
interface IOption {
  backgroundColor: string;
}
class Element {
  id: number;
  type: number;
  name: string;
  colIndex: number = 1;
  rowIndex: number = 1;
  cols: number;
  rows: number;
  current: boolean = false;
  shadow: boolean = false;
  constructor(id: number, type: number, name: string, cols: number, rows: number) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.cols = cols;
    this.rows = rows;
  }
  position({ colIndex, rowIndex }: Position) {
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
  }

  draw(context: CanvasRenderingContext2D | null, side: number) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.colIndex * side, this.rowIndex * side);
    context.fillStyle = '#fafafa';
    if (this.shadow) {
      context.shadowColor = 'rgba(0, 0, 0, 0.2)';
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = side * 0.1;
    }
    context.fillRect(0, 0, this.cols * side, this.rows * side);
    context.lineWidth = 1;
    context.strokeStyle = this.current ? '#000' : '#666';
    context.strokeRect(2, 2, this.cols * side - 4, this.rows * side - 4);
    context.lineWidth = 2;
    context.strokeStyle = '#fff';
    context.strokeRect(0, 0, this.cols * side, this.rows * side);
    context.restore();
    context.save();
    context.translate(this.colIndex * side, this.rowIndex * side);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = `${side * 0.3}px 楷体`;
    context.fillStyle = this.current ? '#000' : '#999';
    context.fillText(this.name, this.cols * side * 0.5, this.rows * side * 0.5);
    context.restore();
  }
}
export class HuaRongRoad extends Animate {
  colLength: number = 4;
  rowLength: number = 5;
  private option: IOption = {
    backgroundColor: '#fff'
  };
  elements: Element[] = [];
  positions: number[][] = [];
  last: oprateStatus = {};
  side: number;

  constructor(side: number) {
    super();
    this.side = side;
    this.width = this.side * (this.colLength + 1);
    this.height = this.side * (this.rowLength + 1);
    this.initData();
    this.hideMark();
  }
  private initData() {
    this.elements = [
      new Element(0, 0, '曹操', 2, 2),
      new Element(1, 1, '关羽', 2, 1),
      new Element(2, 1, '张飞', 1, 2),
      new Element(3, 1, '赵云', 1, 2),
      new Element(4, 1, '马超', 1, 2),
      new Element(5, 1, '黄忠', 1, 2),
      new Element(6, 1, '卒', 1, 1),
      new Element(7, 1, '卒', 1, 1),
      new Element(8, 1, '卒', 1, 1),
      new Element(9, 1, '卒', 1, 1),
    ];
    // this.setElementPosition(this.beginPositions[1]);
    console.log(this.positions);
  }
  private refreshData() {
    this.positions = [];
    for (let row = 0; row < this.rowLength; row++) {
      const arr = [];
      for (let col = 0; col < this.colLength; col++) {
        arr.push(0);
      }
      this.positions.push(arr);
    }
    this.elements.forEach((item) => {
      for (let r = item.rowIndex; r < item.rowIndex + item.rows; r++) {
        for (let c = item.colIndex; c < item.colIndex + item.cols; c++) {
          this.positions[r][c] = 1
        }
      }
    });
  }
  public setElementPosition(positions: Position[]): this {
    this.elements.forEach((item, index) => {
      item.position(positions[index]);
    });
    this.refreshData();
    return this;
  }
  draw() {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.drawBorder();
    this.context.translate(0.5 * this.side, 0.5 * this.side);
    this.elements.forEach((item) => item.draw(this.context, this.side));
    this.context.restore();
  }

  public currentPositions(): Position[] {
    const positions: Position[] = [];
    this.elements.forEach((item) => {
      positions.push({ colIndex: item.colIndex, rowIndex: item.rowIndex });
    });
    return positions;
  };

  public click(x: number, y: number): IResult {
    const ele = this.elementByPoint(x, y);
    if (ele) {
      this.elements.forEach((item) => item.current = !!ele && ele.id === item.id);
      const nexts = this.nextPosition(ele);
      if (!nexts) {
        this.last = {};
        return {
          step: 0,
          complete: this.isComplete()
        };
      }
      // 可以移动至多个地方，标记信息到last里面
      if (nexts.length !== 1) {
        this.last = { ele, nexts };
        return {
          step: 0,
          complete: this.isComplete()
        };
      }
      // 可移动至一个地方，直接移动，刷新数据
      ele.position({ colIndex: nexts[0].colIndex, rowIndex: nexts[0].rowIndex });
      ele.current = false;
      this.refreshData();
      this.last = {};
      return {
        step: 1,
        complete: this.isComplete()
      };
    }
    if (this.last.ele && this.last.nexts && this.last.nexts.length > 1) {
      const postion = this.positionByPoint(x, y);
      if (!postion) {
        this.last = {};
        return {
          step: 0,
          complete: this.isComplete()
        };
      }
      const { ele } = this.last;
      const next = this.last.nexts.find((item) =>
        item.colIndex <= postion.colIndex && postion.colIndex < item.colIndex + ele.cols &&
        item.rowIndex <= postion.rowIndex && postion.rowIndex < item.rowIndex + ele.rows
      );
      if (next) {
        ele.position({ colIndex: next.colIndex, rowIndex: next.rowIndex });
        ele.current = false;
        this.refreshData();
        this.last = {};
        return {
          step: 1,
          complete: this.isComplete()
        };
      }
    }
    return {
      step: 0,
      complete: this.isComplete()
    };;
  }
  private isComplete(): boolean {
    return this.elements[0].colIndex === 1 && this.elements[0].rowIndex === 3;
  }

  public move(x: number, y: number): this {
    const ele = this.elementByPoint(x, y);
    this.elements.forEach((item) => item.shadow = !!ele && ele.id === item.id);
    return this;
  }

  private elementByPoint(x: number, y: number): Element | undefined {
    const postion = this.positionByPoint(x, y);
    if (!postion) {
      return;
    }
    const element = this.elements.find((item) =>
      item.colIndex <= postion.colIndex && (item.colIndex + item.cols) > postion.colIndex &&
      item.rowIndex <= postion.rowIndex && (item.rowIndex + item.rows) > postion.rowIndex
    );
    return element;
  }

  private positionByPoint(x: number, y: number): Position | null {
    const sideHalf = 0.5 * this.side;
    if (x < sideHalf || x > this.width - sideHalf || y < sideHalf || y > this.height - sideHalf) {
      return null;
    }
    const colIndex = Math.floor((x - sideHalf) / this.side);
    const rowIndex = Math.floor((y - sideHalf) / this.side);
    return { colIndex, rowIndex };
  }

  private nextPosition(element: Element): Position[] {
    const arr: Position[] = [
      { colIndex: element.colIndex, rowIndex: element.rowIndex - 1 },
      { colIndex: element.colIndex + 1, rowIndex: element.rowIndex },
      { colIndex: element.colIndex, rowIndex: element.rowIndex + 1 },
      { colIndex: element.colIndex - 1, rowIndex: element.rowIndex }
    ]
    const nexts = arr.filter((item) => {
      if (item.colIndex < 0 || item.rowIndex < 0) {
        return false;
      }
      if (item.colIndex + element.cols > this.colLength || item.rowIndex + element.rows > this.rowLength) {
        return false;
      }
      for (let row = item.rowIndex; row < item.rowIndex + element.rows; row++) {
        for (let col = item.colIndex; col < item.colIndex + element.cols; col++) {
          // if (this.positions[row][col] !== 0) {
          //   return false;
          // }
          if (this.positions[row][col] === 0) {
            continue;
          }
          if (row >= element.rowIndex && row < element.rowIndex + element.rows && col >= element.colIndex && col < element.colIndex + element.cols) {
            continue;
          }
          return false;
        }
      }
      return true;
    });
    return nexts;
  }

  private drawBorder() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.scale(this.side, this.side);
    this.context.fillStyle = '#ddd';
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(5, 0);
    this.context.lineTo(5, 6);
    this.context.lineTo(3.5, 6);
    this.context.lineTo(3.5, 5.5);
    this.context.lineTo(4.5, 5.5);
    this.context.lineTo(4.5, 0.5);
    this.context.lineTo(0.5, 0.5);
    this.context.lineTo(0.5, 5.5);
    this.context.lineTo(1.5, 5.5);
    this.context.lineTo(1.5, 6);
    this.context.lineTo(0, 6);
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  }
}