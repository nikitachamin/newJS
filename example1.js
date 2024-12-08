const numArray = [1,2,3,4,5,6,7,8];
const sum = numArray.reduce((acc, val) => acc += val, 0);
console.log(`Результат сложения массива равен - ${sum}`);