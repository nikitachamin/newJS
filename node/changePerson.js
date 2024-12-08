const fs = require('fs');
const path = require('path');

const personData = JSON.parse(fs.readFileSync(path.join(__dirname, 'person.json')));




personData.age -= 10;
personData.city = 'Moscow';


fs.writeFileSync(path.join(__dirname, 'person.json'), JSON.stringify(personData, null, 2));

