const router = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Render Login Page
router.get('/', (req,res) => {
    res.render('login',{message: null});
});

// Login with existing user
router.post('/',async function(req,res){
    
    axios.post(process.env.LOGIN_URL, {
        email: req.body.UserName,
        password: req.body.Password
    }).then(response => {
        res.cookie('token',response.data.token);
        res.cookie('user',response.data.id);
        res.redirect('/feeds');
        res.set()
    }).catch(err => {
        console.log(err);
        res.render('login',{message: err.response.data.message});
    })
    
});

module.exports = router;