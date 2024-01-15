const fs = require('fs');
const path = require('path');
const { title } = require("process");
const { validationResult } = require('express-validator');

const controller = {
   
    registro: (req, res) => {
        const{id}= req.params;
        res.render('registro',{})
    },

    register: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            res.redirect('/users/registro');
        } else {
            res.render('registro', { errors: errors.mapped(), old: req.body });
        }
    }
}
    module.exports = controller;

