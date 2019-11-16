const router = require('express').Router();
const axios = require('axios');

// Show feeds for authenticated user
router.get('/',async function(req,res){
    
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

    axios.post('https://college-event-portal-api.herokuapp.com/api/posts/addPost', 
    {
	    title: req.body.post
    },
    {headers : header}
    ).then(response => {
       // Post added successfully. Refresh feeds page
       res.redirect('/feeds/');

    }).catch(err => {
        console.log(err);
    })

});

module.exports = router;