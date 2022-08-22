const express = require('express');
const multer = require('multer');

// Storage Engine for Upload Product Images
const productImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/products')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

// Storage Engine for Uploading User Images
const userImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/users')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

// Storage Engine for Uploading Store Images 
const shopImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/shops')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

// Assign middleware with storage engine
const productImageUpload = multer({storage: productImageStorage});
const userImageUpload = multer({storage: userImageStorage});
const shopImageUpload = multer({storage: shopImageStorage});

const fileRouter = express.Router();

fileRouter.post('/product',productImageUpload.single('imageFile'),(req,res) => {
    
    try {
        const file = req.file;
    
        if(!file){
            res.status(500).json({
                message: 'Error in Product Image Upload, File does not exist ',
            });
        }
        res.status(200).json({
            message: 'Product Image Upload Succesful',
            fileName: file.filename,
            filePath: file.path
        })

    } catch (error) {
        res.status(500).json({
            message: 'Error in Product Image Upload',
        })
    }
});


fileRouter.post('/user',userImageUpload.single('imageFile'),(req,res) => {
    
    try {
        const file = req.file;
    
        if(!file){
            res.status(500).json({
                message: 'Error in User Image Upload, File does not exist ',
            });
        }
        res.status(200).json({
            message: 'User Image Upload Succesful',
            fileName: file.filename,
            filePath: file.path
        })

    } catch (error) {
        res.status(500).json({
            message: 'Error in User Image Upload',
        })
    }
});


fileRouter.post('/shop',shopImageUpload.single('imageFile'),(req,res) => {
    
    try {
        const file = req.file;
    
        if(!file){
            res.status(500).json({
                message: 'Error in Shop Image Upload, File does not exist ',
            });
        }
        res.status(200).json({
            message: 'Shop Image Upload Succesful',
            fileName: file.filename,
            filePath: file.path
        })

    } catch (error) {
        res.status(500).json({
            message: 'Error in Shop Image Upload',
        })
    }
});



module.exports = fileRouter;