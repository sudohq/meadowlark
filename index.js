const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
  .create({defaultLayout: 'main'});

var fortunes = [
  "Победи свои страхи, или они победят тебя.",
  "Рекам нужны истоки.",
  "Не бойся неведомого.",
  "Тебя ждет приятный сюрприз.",
  "Будь проще везде, где только можно.",
];

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

  res.render('about', { fortune: randomFortune });
});

app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.use((err,req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.render('404');
});

app.listen(app.get('port'), () => {
  console.log('Express running on port: ', app.get('port'));
});
