const express = require('express');
const app = express();
const routes = require('./src/routes');

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./public'));

routes(app);

app.listen(3000, () => {
  console.log('Escutando na porta 3000')
});