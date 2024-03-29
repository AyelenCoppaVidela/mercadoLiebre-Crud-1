// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer= require ('multer');


const storage = multer.diskStorage ({
    destination: (req,file,cb) => {
        cb(null,path.join (__dirname, '../../public/images/products'))
    },
    filename: (req,file,cb) => {
        const newFileName = Date.now() + path.extname(file.originalname);
        cb (null, newFileName)
    }
});

const upload = multer ({storage})

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/store', productsController.store);


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/update/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;