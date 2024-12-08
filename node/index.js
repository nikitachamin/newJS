const fs = require('fs');
const path = require('path');

const person = {
    surname : "chamin",
    name : "nikita",
    age: 31,
    city: "Yaroslavl"
};

fs.writeFileSync(path.join(__dirname, 'person.json'), JSON.stringify(person, null, 2));

