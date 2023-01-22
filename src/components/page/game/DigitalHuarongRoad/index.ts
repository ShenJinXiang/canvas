import Animate from "@/lib/Animate";
import { randomInt } from "@/lib/Kit";

interface IOption {
  backgroundColor: string;
  borderWidth: number;
  borderColor: string;
}
interface IRect {
  sx: number;
  sy: number;
  ex: number;
  ey: number;
}
interface Position {
  colIndex: number;
  rowIndex: number;
}
class Element {
  colIndex: number;
  rowIndex: number;
  shadow: boolean;
  constructor(colIndex: number, rowIndex: number) {
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
    this.shadow = false;
  }
  draw(context: CanvasRenderingContext2D | null, name: string, side: number) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.colIndex * side, this.rowIndex * side);
    if (this.shadow) {
      context.shadowColor = 'rgba(0, 0, 0, 0.2)';
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = side * 0.1;
    }
    context.fillStyle = '#fafafa';
    context.fillRect(0, 0, side, side);
    context.lineWidth = 1;
    context.strokeStyle = this.shadow ? '#000' : '#666';
    const si = side * 0.02;
    context.strokeRect(si, si, side - 2 * si, side - 2 * si);
    context.lineWidth = si;
    context.strokeStyle = '#fff';
    context.strokeRect(0.5 * si, 0.5 * si, side - si, side - si);
    context.restore();
    context.save();
    context.translate(this.colIndex * side, this.rowIndex * side);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = `${side * 0.3}px 楷体`;
    context.fillStyle = '#999';
    context.fillText(name, side * 0.5, side * 0.5);
    context.restore();
  }
}
export default class DigitalHuarongRoad extends Animate {
  width: number;
  height: number;
  colNumber: number;
  rowNumber: number;
  nums: number[][] = [];
  elements: Element[] = [];
  blankPosition: Position = { colIndex: 0, rowIndex: 0 };
  side: number = 0;
  option: IOption = {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 5
  };
  workSpace: IRect = { sx: 0, sy: 0, ex: 0, ey: 0 };
  constructor(width: number, height: number, colNumber: number, rowNumber: number) {
    super();
    this.width = width;
    this.height = height;
    this.colNumber = colNumber;
    this.rowNumber = rowNumber;
    this.initData();
  }

  private initData() {
    // this.randomData();
    this.sortData();
    this.side = Math.min(
      (this.width - 2 * this.option.borderWidth) / this.colNumber,
      (this.height - 2 * this.option.borderWidth) / this.rowNumber
    )
    this.workSpace = {
      sx: this.option.borderWidth,
      sy: this.option.borderWidth,
      ex: this.option.borderWidth + this.side * this.colNumber,
      ey: this.option.borderWidth + this.side * this.rowNumber
    };
  }

  private randomData() {
    const ns: number[] = [];
    for (let index = 0; index < this.rowNumber * this.colNumber - 1; index++) {
      ns.push(index + 1);
    }
    this.nums = [];
    this.elements = [];
    for (let rowIndex = 0; rowIndex < this.rowNumber; rowIndex++) {
      const arr: number[] = [];
      for (let colIndex = 0; colIndex < this.colNumber; colIndex++) {
        arr.push(
          rowIndex === this.rowNumber - 1 && colIndex === this.colNumber - 1 ?
            0 :
            ns.splice(randomInt(ns.length), 1)[0]
        );
        this.elements.push(new Element(colIndex, rowIndex));
      }
      this.nums.push(arr);
    }
    this.blankPosition = { colIndex: this.colNumber - 1, rowIndex: this.rowNumber - 1 };
  }
  private sortData() {
    this.nums = [];
    this.elements = [];
    let i = 1;
    for (let rowIndex = 0; rowIndex < this.rowNumber; rowIndex++) {
      const arr: number[] = [];
      for (let colIndex = 0; colIndex < this.colNumber; colIndex++) {
        arr.push(rowIndex === this.rowNumber - 1 && colIndex === this.colNumber - 1 ? 0 : i);
        this.elements.push(new Element(colIndex, rowIndex));
        i++;
      }
      this.nums.push(arr);
    }
    this.blankPosition = { colIndex: this.colNumber - 1, rowIndex: this.rowNumber - 1 };

    const lastPosi: Position = {
      colIndex: this.blankPosition.colIndex,
      rowIndex: this.blankPosition.rowIndex
    };
    for (let c = 0, lType: number = -1; c < 2 * this.colNumber * this.rowNumber; c++, lType *= -1) {
      if (lType === -1) {
        const rowIndex = Math.floor(randomInt(this.rowNumber));
        this.clickByPosition({ colIndex: lastPosi.colIndex, rowIndex });
        lastPosi.rowIndex = rowIndex;
      } else {
        const colIndex = Math.floor(randomInt(this.colNumber));
        this.clickByPosition({ colIndex, rowIndex: lastPosi.rowIndex });
        lastPosi.colIndex = colIndex;
      }
    }
    this.clickByPosition({ colIndex: this.colNumber - 1, rowIndex: lastPosi.rowIndex });
    this.clickByPosition({ colIndex: this.colNumber - 1, rowIndex: this.rowNumber - 1 });
  }

  update() {
  }
  draw(): void {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.drawBorder();
    this.context.translate(this.workSpace.sx, this.workSpace.sy);
    this.elements.forEach((item) => {
      if (this.nums[item.rowIndex][item.colIndex]) {
        item.draw(this.context, `${this.nums[item.rowIndex][item.colIndex]}`, this.side)
      }
    });
    this.context.restore();
  }
  private drawBorder(): void {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.beginPath();
    this.context.fillStyle = this.option.borderColor;
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = this.option.backgroundColor;
    this.context.fillRect(this.option.borderWidth, this.option.borderWidth, this.width - 2 * this.option.borderWidth, this.height - 2 * this.option.borderWidth);
    this.context.restore();
  }

  public move(x: number, y: number): this {
    // const ele = this.elementByPoint(x, y);
    // this.elements.forEach((item) => item.shadow = !!ele && ele.id === item.id);
    const position: Position | null = this.positionByPoint(x, y);
    this.elements.forEach((item) => item.shadow = !!position && item.colIndex === position.colIndex && item.rowIndex === position.rowIndex);
    return this;
  }

  private positionByPoint(x: number, y: number): Position | null {
    if (x < this.workSpace.sx || y < this.workSpace.sy || x > this.workSpace.ex || y > this.workSpace.ey) {
      return null;
    }
    return {
      colIndex: Math.floor((x - this.workSpace.sx) / this.side),
      rowIndex: Math.floor((y - this.workSpace.sy) / this.side)
    };
  }
  public click(x: number, y: number) {
    const position: Position | null = this.positionByPoint(x, y);
    if (!position) {
      return;
    }
    if (position.colIndex === this.blankPosition.colIndex && position.rowIndex === this.blankPosition.rowIndex) {
      return;
    }
    this.clickByPosition(position);
  }

  private clickByPosition(position: Position) {
    if (position.colIndex === this.blankPosition.colIndex) {
      const flag: number = position.rowIndex > this.blankPosition.rowIndex ? 1 : -1;
      for (let index = 0; index < Math.abs(position.rowIndex - this.blankPosition.rowIndex); index++) {
        this.nums[this.blankPosition.rowIndex + flag * index][position.colIndex] = this.nums[this.blankPosition.rowIndex + flag * (index + 1)][position.colIndex];
      }
      this.nums[position.rowIndex][position.colIndex] = 0;
      this.blankPosition.colIndex = position.colIndex;
      this.blankPosition.rowIndex = position.rowIndex;
      return;
    }
    if (position.rowIndex === this.blankPosition.rowIndex) {
      const flag: number = position.colIndex > this.blankPosition.colIndex ? 1 : -1;
      for (let index = 0; index < Math.abs(position.colIndex - this.blankPosition.colIndex); index++) {
        this.nums[position.rowIndex][this.blankPosition.colIndex + flag * index] = this.nums[position.rowIndex][this.blankPosition.colIndex + flag * (index + 1)];
      }
      this.nums[position.rowIndex][position.colIndex] = 0;
      this.blankPosition.colIndex = position.colIndex;
      this.blankPosition.rowIndex = position.rowIndex;
      return;
    }
  }

  public isComplete(): boolean {
    let num = 1;
    for (let rowIndex = 0; rowIndex < this.rowNumber; rowIndex++) {
      for (let colIndex = 0; colIndex < this.colNumber; colIndex++) {
        if (rowIndex === this.rowNumber - 1 && colIndex === this.colNumber - 1) {
          if (this.nums[rowIndex][colIndex] !== 0) {
            return false;
          }
        } else {
          if (num !== this.nums[rowIndex][colIndex]) {
            return false;
          }
        }
        num++;
      }
    }
    return true;
  }

  public setRowCol(rowNumber: number, colNumber: number) {
    this.rowNumber = rowNumber;
    this.colNumber = colNumber;
    this.initData();
  }

  public reStart() {
    this.initData();
  }

}