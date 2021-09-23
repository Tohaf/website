if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


let express = require('express');
let app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');


app.set('view engine', 'ejs');
var path = require("path");
var _dirname = path.resolve();

app.set('views', _dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to Mongoose'));  

app.use(express.static('public'));
app.use('/', indexRouter);




app.listen(process.env.PORT  || 3000);