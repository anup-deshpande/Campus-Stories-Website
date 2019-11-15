const express = require('express');
const app = express();
const port =  5000;

const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser')


// Import routes
const authRoute = require('./routes/auth');
const feedRoute = require('./routes/feedRoutes');

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser())
app.set('view engine','ejs');

// Route Middlewares
app.use('/user',authRoute);
app.use('/feeds',feedRoute);

app.listen(port, () => console.log('Server up and running'));