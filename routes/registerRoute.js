const router = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

//  Render Signup Page
router.get('/', (req,res) => {
    res.render('signup',{message: null})
});

// Create a new user
router.post('/',async function(req,res){
    
    axios.post(process.env.USERS_URL, {
        name: req.body.firstname + req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        university: req.body.university
    }).then(response => {
        res.redirect('/login')
    }).catch(err => {
        console.log(err.response.data.message);
       res.render('signup',{message: err.response.data.message});
    })
    
});

module.exports = router;