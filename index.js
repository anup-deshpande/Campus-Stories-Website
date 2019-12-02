const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port =  process.env.PORT || 5000;

const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser')

// Import routes
const loginRoute = require('./routes/loginRoute');
const signUpRoute = require('./routes/registerRoute');
const feedRoute = require('./routes/feedRoutes');

// Middleware
app.use('/assets',express.static('assets'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser())
app.set('view engine','ejs');

// Route Middlewares
app.use('/login',loginRoute);
app.use('/register',signUpRoute);
app.use('/feeds',feedRoute);


// Logout - Delete stored token, Go back to login
app.post('/logout', (req,res) => {
    res.clearCookie('token');
    res.clearCookie('user');
    res.redirect('/login');
});

// Default Route
app.get('/*',(req,res) =>{
    res.redirect('/login');
})

app.listen(port, () => console.log('Server up and running'));