const router = require('express').Router();
const axios = require('axios');

//  Render Signup Page
router.get('/signup', (req,res) => {
    res.render('signup')
});

// Render Login Page
router.get('/login', (req,res) => {
    res.render('login');
});

// Login with existing user
router.post('/login',async function(req,res){
    
    axios.post('https://college-event-portal-api.herokuapp.com/api/user/login', {
        email: req.body.UserName,
        password: req.body.Password
    }).then(response => {
        console.log(response.data.token);
        res.cookie('token',response.data.token);
        res.redirect('/feeds') 
    }).catch(err => {
        console.log(err);
    })
    
});

// Logout - Delete stored token, Go back to login
router.post('/logout', (req,res) => {
    res.clearCookie('token');
    res.redirect('/user/login');
});


// Create a new user
router.post('/signup',async function(req,res){
    
    axios.post('https://college-event-portal-api.herokuapp.com/api/user/signup', {
        name: req.body.firstname + req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        university: req.body.university
    }).then(response => {
        res.redirect('/user/login')
    }).catch(err => {
        console.log(err);
    })
    
});

module.exports = router;