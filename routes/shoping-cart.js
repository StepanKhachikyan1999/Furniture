const { Router } = require('express');
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category');
const Checkout = require('../models/Checkout');
const Cash = require('../models/Order/Cash');
const Withoutbank = require('../models/Order/WithoutBank');
const WithBank = require('../models/Order/Withbank')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({ storage: storage }).array('avatar', 4);


router.get('/', async (req, res) => {
    const contact = await Contact.find()
    const category = await Category.find();

    const checkout = await Checkout.find();

    res.render('shoping-cart', {
        title: 'Корзина покупок',
        contact,
        category,
        checkout,

    })
})

//cash
router.post('/cash', async (req, res) => {
    const { name, surname, email, phone, address, city, title, quantity, totalValueTemp, totalValue } = req.body;

    let now = new Date()


    const post = new Cash({
        name, surname, email, phone, address, city, title, quantity, totalValueTemp, now, totalValue
    })
    await post.save();
    res.redirect('/orders')
})

//withoutbank

router.post('/withoutbank', function (req, res, next) {
    upload(req, res, async function (err) {

        const { title, quantity, totalValueTemp, totalValue } = req.body;

        let img = req.files;
        let avatar = []
        img.forEach(i => {
            let imgName = i.filename;
            avatar.push(imgName)
        })

        let now = new Date()

        const post = new Withoutbank({ title, quantity, totalValueTemp, totalValue, avatar, now })
        await post.save();
        res.redirect('/orders')
    });
})

//through a bank
router.post('/withbank', function (req, res, next) {
    upload(req, res, async function (err) {

        const { title, quantity, totalValueTemp, totalValue, name, surname, email, phone, address } = req.body;

        let img = req.files;
        let avatar = []
        img.forEach(i => {
            let imgName = i.filename;
            avatar.push(imgName)
        })

        let now = new Date()

        const post = new WithBank({ name, surname, email, phone, address, avatar, title, quantity, totalValueTemp, totalValue, now })


        await post.save();
        res.redirect('/orders')
    });
})




module.exports = router;