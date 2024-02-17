import BaseCanvas from "@/lib/BaseCanvas";
import { pa } from "element-plus/es/locale";

interface IOption {
    backgroundColor: string;
    gridWidth: number;
    strokeColor: string;
};

export default class WoodenPatterns extends BaseCanvas {
    private option: IOption = {
        backgroundColor: '#fadc39',
        gridWidth: 200,
        strokeColor: '#333'
    };
    gridCanvas: HTMLCanvasElement = document.createElement('canvas');
    gridContext: CanvasRenderingContext2D | null  = null;
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.markCanvas.setStyle('rgba(60, 60, 204, 0.5)');
        this.initData();
    }

    initData() {
        const gridWidth: number = this.width / 10;
        this.gridCanvas.width = gridWidth;
        this.gridCanvas.height = gridWidth;
        this.gridContext = this.gridCanvas.getContext('2d');
        this.drawGrid(gridWidth);
    }

    drawGrid(gridWidth: number) {
        if (!this.gridContext) {
            return;
        }
        let lineWidth: number = gridWidth / 60;
        lineWidth = lineWidth < 2 ? 2 : lineWidth;
        const gw = gridWidth / 6;
        this.gridContext.save();
        this.gridContext.lineWidth = lineWidth;
        this.gridContext.strokeStyle = this.option.strokeColor;
        this.gridContext.translate(0.5 * gridWidth, 0.5 * gridWidth);
        this.gridContext.strokeRect(-0.5 * gw, -0.5 * gw, gw, gw);
        this.gridContext.strokeRect(-2 * gw, -2 * gw, 4 * gw, 4 * gw);
        this.gridContext.strokeRect(-3 * gw, -3 * gw, 2 * gw, 2 * gw);
        this.gridContext.strokeRect(-3 * gw, 1 * gw, 2 * gw, 2 * gw);
        this.gridContext.strokeRect(1 * gw, -3 * gw, 2 * gw, 2 * gw);
        this.gridContext.strokeRect(1 * gw, 1 * gw, 2 * gw, 2 * gw);

        this.gridContext.moveTo(0, -2 * gw);
        this.gridContext.lineTo(0, -0.5 * gw);
        this.gridContext.stroke();

        this.gridContext.moveTo(0, 2 * gw);
        this.gridContext.lineTo(0, 0.5 * gw);
        this.gridContext.stroke();

        this.gridContext.moveTo(-2 * gw, 0);
        this.gridContext.lineTo(-0.5 * gw, 0);
        this.gridContext.stroke();

        this.gridContext.moveTo(2 * gw, 0);
        this.gridContext.lineTo(0.5 * gw, 0);
        this.gridContext.stroke();

        this.gridContext.lineWidth = 2 * lineWidth;
        this.gridContext.strokeRect(-3 * gw, -3 * gw, 6 * gw, 6 * gw);
        this.gridContext.restore();
    }

    draw() {
        if (!this.context) {
            return;
        }
        this.clear(this.option.backgroundColor);
        const pattern : CanvasPattern | null = this.context.createPattern(this.gridCanvas, 'repeat');
        if (!pattern) {
            return;
        }
        this.context.fillStyle = pattern;
        this.context.fillRect(0, 0, this.width, this.height);
        this.drawMark();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
        this.draw();
    }
}