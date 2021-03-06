const { Router } = require('express')
const router = Router();
const Contact = require('../models/Contact');
const Sale = require('../models/Sale')
const Category = require('../models/Category')
const Checkout = require('../models/Checkout');
const multer = require('multer');
const Logo = require('../models/Logo')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, 'uploads')     //you tell where to upload the files,
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

var upload = multer({
    storage: storage,
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
});


router.get('/:id', async (req, res) => {
    const contact = await Contact.find()
    const sale = await Sale.findById(req.params.id)
    const category = await Category.find();
    const logo = await Logo.find();

    res.render('shop-single', {
        title: 'Խանութ',
        contact,
        sale,
        category,
        logo
    })
})


router.post('/add', async (req, res) => {
    const { title, price, quantity, avatar } = req.body;
    console.log("🚀 ~ file: shop-single.js ~ line 47 ~ router.post ~  title, price, quantity, avatar",  title, price, quantity, avatar)
    console.log( price, quantity," price, quantity")
    let initialTotal =  Number(parseInt(price) * parseInt(quantity));
    console.log("🚀 ~ file: shop-single.js ~ line 49 ~ router.post ~ initialTotal", initialTotal)
    console.log(initialTotal,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    const post = new Checkout({title, price, quantity, avatar, initialTotal});
    await post.save()
    res.redirect('/shoping-cart')
})



router.post('/add', upload.single('avatar'), function (req, res, next) {
    const { title, price, quantity } = req.body;


    const post = new Service({
        avatar: req.file.filename,
        title, price, quantity
    })
    // post.save()
    console.log(post)
    // res.redirect('/admin-settings')
    return false;
})

module.exports = router;