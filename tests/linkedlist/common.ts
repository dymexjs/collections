export const arraySize = 16;
export const headItems: Array<number> = Array.from({ length: arraySize }, (_, i: number) => i + 1);
export const headItemsReverse: Array<number> = headItems.slice().reverse();
export const tailItems: Array<number> = Array.from({ length: arraySize }, (_, i: number) => i + 1000);
export const tailItemsReverse: Array<number> = tailItems.slice().reverse();
