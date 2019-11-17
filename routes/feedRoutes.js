const router = require('express').Router();
const axios = require('axios');

// Show feeds for authenticated user
router.get('/',async function(req,res){
    
    // Check for the token, If not found send back to login page
    if (!req.cookies.token) {
        res.redirect('/user/login');
    }

    // Create header with token
    const header = {
        "Content-Type":"application/json",
        "Authorization": req.cookies.token
    }

    axios.get('https://college-event-portal-api.herokuapp.com/api/posts', 
    {headers : header})
    .then(response => {

        res.render('feeds',{feeds: response.data});

    }).catch(err => {
        console.log(err);
    })
    
});


// Add new post route
router.post('/addPost', async function(req,res){

    // Create header with token
    const header = {
        "Content-Type":"application/json",
        "Authorization": req.cookies.token
    }

    // Check if description exist and form data accordingly
    if(req.body.description){
       
        axios.post('https://college-event-portal-api.herokuapp.com/api/posts/addPost', 
        {
            title: req.body.title,
            description: req.body.description
        },
        {headers : header}
        ).then(response => {
            // Post added successfully. Refresh feeds page
            res.redirect('/feeds/');
        }).catch(err => {
            console.log(err);
        })
        
    }else{
       
        axios.post('https://college-event-portal-api.herokuapp.com/api/posts/addPost', 
        {
            title: req.body.title
        },
        {headers : header}
        ).then(response => {
            // Post added successfully. Refresh feeds page
            res.redirect('/feeds/');
        }).catch(err => {
            console.log(err);
        })
        
    }
    

   

});

module.exports = router;