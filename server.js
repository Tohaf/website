if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


let express = require('express');
let app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/Register');
const parcelRouter = require('./routes/parcel');
const adminRouter = require('./routes/admins');
const methodOverride = require('method-override');



app.set('view engine', 'ejs');
var path = require("path");
var _dirname = path.resolve();

app.set('views', _dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.use(express.json())
app.use(express.urlencoded({limit: '10mb', extended: false}));
app.use('/static', express.static(path.join(_dirname, 'public')));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to Mongoose'));  


app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/parcel', parcelRouter);
app.use('/admin', adminRouter);





app.listen(process.env.PORT  || 3000);