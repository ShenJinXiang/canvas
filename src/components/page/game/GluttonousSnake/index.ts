import Animate from "@/lib/Animate";
import { randomInt } from '@/lib/Kit';

interface IGridPosition {
  row: number;
  col: number;
}

interface IOption {
  padding: number;
  gridSize: number;
  activeGridColor: string;
  defaultGridColor: string;
  initLength: number;
}
export enum Direction {
  UP, RIGHT, DOWN, LEFT
}

export default class GluttonousSnake extends Animate {
  colNumber: number = 0;
  rowNumber: number = 0;
  option: IOption = {
    padding: 5,
    gridSize: 20,
    activeGridColor: 'rgba(0, 0, 0, 1)',
    defaultGridColor: 'rgba(0, 0, 0, 0.1)',
    initLength: 4
  }
  gData: number[][] = [];
  cData: IGridPosition[] = [];
  direction: Direction = Direction.UP;
  refreshCount: number = 0;
  refreshStep: number = 20;
  target: IGridPosition | null = null;
  isKey: boolean = true;
  boundaryless: boolean = true;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.colNumber = Math.floor((this.width - 2 * this.option.padding) / this.option.gridSize);
    this.rowNumber = Math.floor((this.height - 2 * this.option.padding) / this.option.gridSize);
    this.initData();
  }

  private initData() {
    this.isKey = true;
    this.refreshCount = 0;
    this.refreshStep = 20;
    this.initCData();
    this.initGData();
    this.refreshTarget();
    this.refreshGData();
  }
  private initCData() {
    this.cData = [];
    const p: IGridPosition = {
      row: this.rowNumber - this.option.initLength,
      col: randomInt(this.option.initLength, this.colNumber - this.option.initLength),
    }
    for (let i = 0; i < this.option.initLength; i++) {
      this.cData.push({
        row: p.row + i,
        col: p.col
      });
    }
  }
  private initGData() {
    this.gData = [];
    for (let row = 0; row < this.rowNumber; row++) {
      const arr = [];
      for (let col = 0; col < this.colNumber; col++) {
        arr.push(0);
      }
      this.gData.push(arr);
    }
  }

  private refreshGData() {
    for (let row = 0; row < this.rowNumber; row++) {
      for (let col = 0; col < this.colNumber; col++) {
        this.gData[row][col] = 0;
      }
    }
    this.cData.forEach((item) => this.gData[item.row][item.col] = 1);
    if (this.target) {
      this.gData[this.target.row][this.target.col] = 1;
    }
  }
  private refreshTarget() {
    if (this.cData.length >= this.colNumber * this.rowNumber) {
      this.target = null;
      return;
    }
    const arr: IGridPosition[] = [];
    for (let row = 0; row < this.rowNumber; row++) {
      for (let col = 0; col < this.colNumber; col++) {
        if (this.gData[row][col] === 0) {
          arr.push({ row, col });
        }
      }
    }
    if (arr.length <= 0) {
      this.target = null;
      return;
    }
    this.target = arr[randomInt(arr.length)];
  }

  update() {
    this.refreshCount++;
    if (this.refreshCount >= this.refreshStep) {
      this.updateData();
      this.refreshCount = 0;
    }
  }
  updateData() {
    const next: IGridPosition = { col: this.cData[0].col, row: this.cData[0].row };
    if (this.direction == Direction.UP) {
      next.row = next.row === 0 ? (this.rowNumber - 1) : (next.row - 1);
    } else if (this.direction == Direction.RIGHT) {
      next.col = next.col === this.colNumber - 1 ? 0 : next.col + 1;
    } else if (this.direction == Direction.DOWN) {
      next.row = next.row === this.rowNumber - 1 ? 0 : next.row + 1;
    } else if (this.direction == Direction.LEFT) {
      next.col = next.col === 0 ? (this.colNumber - 1) : next.col - 1;
    }

    this.cData.unshift(next);
    this.cData.pop();
    this.refreshGData();
    this.isKey = true;
  }
  draw() {
    if (!this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.context.translate(this.option.padding, this.option.padding);
    for (let row = 0; row < this.rowNumber; row++) {
      for (let col = 0; col < this.colNumber; col++) {
        this.drawGrid({ row, col });
      }
    }
    this.context.restore();
  }
  drawGrid(gridPosition: IGridPosition) {
    if (!this.context) {
      return;
    }
    const { col, row } = gridPosition;
    const l = this.option.gridSize / 7;
    const style = this.gData[gridPosition.row][gridPosition.col] === 1 ? this.option.activeGridColor : this.option.defaultGridColor;
    this.context.save();
    this.context.translate(col * this.option.gridSize, row * this.option.gridSize);
    this.context.translate(0.5 * this.option.gridSize, 0.5 * this.option.gridSize);
    this.context.beginPath();
    this.context.moveTo(-2.5 * l, -2.5 * l);
    this.context.lineTo(2.5 * l, -2.5 * l);
    this.context.lineTo(2.5 * l, 2.5 * l);
    this.context.lineTo(-2.5 * l, 2.5 * l);
    this.context.lineWidth = l;
    this.context.closePath();
    this.context.strokeStyle = style;
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(-l, -l);
    this.context.lineTo(l, -l);
    this.context.lineTo(l, l);
    this.context.lineTo(-l, l);
    this.context.closePath();
    this.context.fillStyle = style;
    this.context.fill();
    this.context.restore();
  }

  public directionKey(direction: Direction) {
    if (!this.isKey) {
      return;
    }
    switch (direction) {
      case Direction.UP:
        if (this.direction !== Direction.DOWN) {
          this.direction = Direction.UP;
          this.isKey = false;
        }
        break;
      case Direction.DOWN:
        if (this.direction !== Direction.UP) {
          this.direction = Direction.DOWN;
          this.isKey = false;
        }
        break;
      case Direction.LEFT:
        if (this.direction !== Direction.RIGHT) {
          this.direction = Direction.LEFT;
          this.isKey = false;
        }
        break;
      case Direction.RIGHT:
        if (this.direction !== Direction.LEFT) {
          this.direction = Direction.RIGHT;
          this.isKey = false;
        }
        break;
    }
  }
}