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
        console.log(response);
    }).catch(err => {
        console.log(err);
    })

    res.render('feeds');
    
});

module.exports = router;