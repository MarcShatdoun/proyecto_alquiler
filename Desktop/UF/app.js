const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const router = require('./router');



//Usa la tecnologia view engine "ejs"
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(router);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PUERTO = 3000

app.listen(PUERTO, () => {
    console.log(`Server running on port http://localhost:${PUERTO}`)
})