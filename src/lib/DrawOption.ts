export interface StrokeOption {
  lineWidth?: number,
  strokeStyle?: string,
  lineDash?: number[] | null
}

export interface FillOption {
  fillStyle?: string,
}

export interface TextOption extends StrokeOption, FillOption {
  font?: string
  textAlign?: CanvasTextAlign,
  textBaseline?: CanvasTextBaseline
}