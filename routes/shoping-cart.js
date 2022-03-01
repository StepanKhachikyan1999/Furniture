const { Router } = require('express');
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category');
const Checkout = require('../models/Checkout');
const Cash = require('../models/Order/Cash');
const Withoutbank = require('../models/Order/WithoutBank');
const WithBank = require('../models/Order/Withbank')
const multer = require('multer');
const Logo = require('../models/Logo');
const auth = require('../middleware/auth');
const Withbank = require('../models/Order/Withbank');
const DeliveryCity = require('../models/Delivery_city');

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
    const logo = await Logo.find();
    const deliveryCity = await DeliveryCity.find()

    const checkout = await Checkout.find();

    res.render('shoping-cart', {
        title: 'Գնումների զամբյուղ',
        contact,
        category,
        checkout,
        logo,
        deliveryCity
    })
})

//cash
router.post('/cash', auth, async (req, res) => {

    const user = await req.user
        .populate('cart.items.saleId')
        .execPopulate()


    // console.log(user)

    const { name, surname, email, phone, address, city, title, quantity, totalValueTemp, totalValue } = req.body;

    let now = new Date()


    var delivery_price = req.body.delivery_price;
    delivery_price = parseInt(delivery_price) + parseInt(totalValue)
    console.log(delivery_price)

    const post = new Cash({
        name, surname, email, phone, address, city, title, quantity, totalValueTemp, now, totalValue, delivery_price,
        user: {
            userId: req.user
        },
        status: "Ընթացքում"
    })
    await post.save();
    res.redirect('/orders')
})


//withoutbank

router.post('/withoutbank', auth, function (req, res, next) {
    upload(req, res, async function (err) {

        const { title, quantity, totalValueTemp, totalValue } = req.body;

        // var delivery_price = req.body.delivery_price;
        // delivery_price = parseInt(delivery_price) + parseInt(totalValue)

        let img = req.files;
        let avatar = []
        img.forEach(i => {
            let imgName = i.filename;
            avatar.push(imgName)
        })

        let now = new Date()

        const post = new Withoutbank({ title, quantity, totalValueTemp, totalValue, avatar,  now, status: "Ընթացքում" })
        await post.save();
        res.redirect('/orders')
    });
})

//through a bank
router.post('/withbank', auth, function (req, res, next) {
    upload(req, res, async function (err) {

        const { title, quantity, totalValueTemp, totalValue, name, surname, email, phone, address, } = req.body;

        // var delivery_price = req.body.delivery_price;
        // delivery_price = parseInt(delivery_price) + parseInt(totalValue)

        let img = req.files;
        let avatar = []
        img.forEach(i => {
            let imgName = i.filename;
            avatar.push(imgName)
        })

        let now = new Date()

        const post = new WithBank({ name, surname, email, phone, address, avatar, title, quantity, totalValueTemp, totalValue,  now, status: "Ընթացքում" })


        await post.save();
        res.redirect('/orders')
    });
})


router.post("/cash/status", async (req, res) => {
    const { id } = req.body;
    delete req.body.id
    await Cash.findByIdAndUpdate(id, req.body)
    res.redirect('/admin-orders')
})


router.post("/withoutbank/status", async (req, res) => {
    const { id } = req.body;
    delete req.body.id
    await Withoutbank.findByIdAndUpdate(id, req.body)
    res.redirect('/admin-orders')
})

router.post("/withbank/status", async (req, res) => {
    const { id } = req.body;
    delete req.body.id
    await Withbank.findByIdAndUpdate(id, req.body)
    res.redirect('/admin-orders')
})




module.exports = router;