


const {calculateResultSum} = require('./calculateResultSum');
const color = require('colors');


const total =   calculateResultSum([12.1, 2.3, 10.1], 0.9);

console.log(total>50? color.red(total): color.green(total));