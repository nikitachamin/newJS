

const np = require('number-precision');

function calculateResultSum(purchases, discont){
    let total = purchases.reduce((acc, purchase) => acc += purchase, 0);

    total = np.times(total , discont) ;
    return total;
}

module.exports = {calculateResultSum};