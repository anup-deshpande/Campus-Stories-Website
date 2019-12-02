const router = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Show feeds for authenticated user
router.get('/',async function(req,res){
  
    // Check for the token, If not found send back to login page
    if (!req.cookies.token) {
        res.redirect('/login');
    }

    // Create header with token
    const header = {
        "Content-Type":"application/json",
        "Authorization": req.cookies.token
    }

    axios.get(process.env.POSTS_URL, 
    {headers : header})
    .then(response => {

        res.render('feeds',{feeds: response.data, user: req.cookies.user});

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
       
        axios.post(process.env.POSTS_URL, 
        {
            title: req.body.title,
            description: req.body.description
        },
        {headers : header}
        ).then(response => {
            // Post added successfully. Refresh feeds page
            res.redirect('/feeds');
        }).catch(err => {
            console.log(err);
        })
        
    }else{
       
        axios.post(process.env.POSTS_URL, 
        {
            title: req.body.title
        },
        {headers : header}
        ).then(response => {
            // Post added successfully. Refresh feeds page
            res.redirect('/feeds');
        }).catch(err => {
            console.log(err);
        })
        
    }
    

   

});


// Delete a post 
router.post('/delete',async function(req,res){

    // Check for the token, If not found send back to login page
    if (!req.cookies.token) {
        res.redirect('/login');
    }

    axios.delete(
        process.env.POSTS_URL,
        {headers: {
            "Content-Type":"application/json",
            "Authorization": req.cookies.token
        },
        data:{
          id:req.body.id
        }}
      ).then(response => {

        res.redirect('/feeds');

     }).catch(err => {
        console.log(err);
    })
    
});


module.exports = router;