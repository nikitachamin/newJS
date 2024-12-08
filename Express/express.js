const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const counterData = JSON.parse(fs.readFileSync(path.join(__dirname, 'count.json')));




app.use((req, res,next) => {
  console.log('Поступил запрос', req.method, req.url);
  if (req.url === '/') {
    counterData.counterMainData += 1;
    fs.writeFileSync(path.join(__dirname, 'count.json'), JSON.stringify(counterData, null, 2));
    
  } else {
    counterData.counterAboutData += 1;
    fs.writeFileSync(path.join(__dirname, 'count.json'), JSON.stringify(counterData, null, 2));
   
  }
  next();
});
 
app.get('/', (req, res)=>{
    res.send(`<h1> Добро пожаловать на страницу</h1> <a href="/about"> Перейти на страницу Обо мне </a> <h2> Просмотров на странице - ${counterData.counterMainData}  </h2>`);
   
}
);
app.get('/about', (req, res)=>{
    res.send(`<h1> Обо мне </h1> <a href="/"> Перейти на главную  </a> '<h2> Просмотров на странице -  ${counterData.counterAboutData}  </h2>`);
 
}
);



const port = 3000;

app.listen(port);
