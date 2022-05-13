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
}