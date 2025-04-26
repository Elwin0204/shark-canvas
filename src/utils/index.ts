// 去掉像素值px
export function px2Num(pxValue: string) {
  return parseFloat(pxValue);
}

// 数组每chunkSize个元素进行分组 [1,2,3,4,5] = 3 => [[1,2,3], [4,5]]
export function toChunkArr<T>(arr: T[], chunkSize: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}
