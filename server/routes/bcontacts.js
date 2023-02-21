let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



let passport = require('passport'); 

let bcontactsController = require('../controllers/bcontacts');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Book List page - READ Operation */
router.get('/', bcontactsController.displayBcontactsList);


/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, bcontactsController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, bcontactsController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, bcontactsController.performDelete);

module.exports = router;