let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Bcontacts = require('../models/bcontacts');

module.exports.displayBcontactsList = (req, res, next) => {
    Bcontacts.find((err, contactsList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);

            res.render('bcontacts/list', 
            {title: 'Business Contacts', 
            ContactList: contactsList,
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}


module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Bcontacts.findById(id, (err, bcontactsToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('bcontacts/edit', {title: 'Edit Business Contacts', bcontacts: bcontactsToEdit,
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBcontacts = Bcontacts({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email,
        
    });

    Bcontacts.updateOne({_id: id}, updatedBcontacts, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/contact-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Bcontacts.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/contact-list');
        }
    });
}
