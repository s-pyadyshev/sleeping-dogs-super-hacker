import { shuffle, shuffleCutCode } from "./index";

test("shuffle has the same length", () => {
  const array = [1, 2, 3, 4];
  const arrayLength = array.length;
  const shuffledArrayLength = shuffle(array).length;
  expect(shuffledArrayLength).toBe(arrayLength);
});

test("shuffleCutCode slice array to specific length (second argument)", () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const arrayLength = 4;
  const slicedArray = shuffleCutCode(array, arrayLength);
  const slicedArrayLength = slicedArray.length;
  expect(slicedArrayLength).toBe(arrayLength);
});
