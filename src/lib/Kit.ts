import Point from '@/lib/Point';
export const random = (...nums: number[]) => {
  if (nums.length == 0) {
    return Math.random();
  }
  if (nums.length == 1) {
    return Math.random() * nums[0];
  }
  var min = Math.min(...nums);
  var max = Math.max(...nums);
  return (max - min) * Math.random() + min;
}

export const randomInt = (...nums: number[]) => {
  return Math.floor(random(...nums));
}
export const randomOne = () => {
  return random(-1, 1) >= 0 ? 1 : -1;
};

export const color = (hue: number, saturation: string, lightness: string, alpha: number) => {
  return `hsla(${hue}, ${saturation}, ${lightness}, ${alpha})`;
};

export const hueColor = (hue: number) => {
  return color(hue % 360, '75%', '60%', 1);
}

export const randomColor = () => {
  return color(randomInt(360), `${random(50, 90)}%`, `${random(50, 90)}%`, 1);
}

export const distance = (sPoint: Point, ePoint: Point) => {
  return Math.sqrt(Math.pow(sPoint.x - ePoint.x, 2) + Math.pow(sPoint.y - ePoint.y, 2));
}