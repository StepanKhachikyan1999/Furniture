const { Router } = require('express');
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category');
const fetch = require('node-fetch-commonjs')
const Checkout = require('../models/Checkout');
const Cash = require('../models/Order/Cash');
const Withoutbank = require('../models/Order/WithoutBank');
const WithBank = require('../models/Order/Withbank')
const multer = require('multer');
const Logo = require('../models/Logo');
const auth = require('../middleware/auth');
const Withbank = require('../models/Order/Withbank');
const Ameria = require('../models/Order/paymentAmeria')
const DeliveryCity = require('../models/Delivery_city');
// const bodyParser = require("body-parser");


//not sure what "extended: false" is for
// app.use(bodyParser.urlencoded({ extended: false }));

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
        

     console.log(user)

    const { name, surname, email, phone, address, city, title, quantity, totalValueTemp, totalValue } = req.body;


    let now = new Date()

    var delivery_price = req.body.delivery_price;
    delivery_price = parseInt(delivery_price) + parseInt(totalValue)
    console.log(delivery_price)

    const post = await new Cash({
        name, surname, email, phone, address, city, title, quantity, totalValueTemp, now, totalValue, delivery_price,
        user: {
            userId: req.user
        },
        status: "Ընթացքում"
    })
    console.log("🚀 ~ file: shoping-cart.js ~ line 72 ~ router.post ~ post", post)
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

        const user = await req.user
        .populate('cart.items.saleId')
        .execPopulate()
        // console.log('user here, user', user)

        const post = new WithBank({
            name, surname, email, phone, address, avatar, title, quantity, totalValueTemp, totalValue,  now, status: "Ընթացքում",
            user: {
                userId: req.user
            },
        })

        // console.log('new post', post)

        await post.save();
        res.redirect('/orders')
    });
})


//online payment ameria
router.post('/withbank_ameria', auth, function (req, res, next) {
    upload(req, res, async function (err) {

        const { title, quantity, totalValueTemp, totalValue, name, surname, email, phone, address,ClientID,Username,Password,OrderID,amount } = req.body;

        // let delivery_price = req.body.delivery_price;
        // delivery_price = parseInt(delivery_price) + parseInt(totalValue)

        let now = new Date()

        const user = await req.user
        .populate('cart.items.saleId')
        .execPopulate()
        console.log('user here, user', user)

        const post =  new Ameria({
            name, surname, email, phone, address, title, quantity, totalValueTemp, totalValue,ClientID,Username,Password, OrderID,amount, now, status: "Ընթացքում",
            user: {
                userId: req.user
            },
        })

        console.log('new post77777777777777777777777777777777', post)



        await post.save();


         res.redirect('/payments')
    });
})

//online payment ameria payment
router.post('/withbank_ameria_payment', auth, function (req, res, next) {
    upload(req, res, async function (err) {

        const { title, quantity, totalValueTemp, totalValue, name, surname, email, phone, address,ClientID,Username,Password,OrderID,amount } = req.body;

        // let delivery_price = req.body.delivery_price;
        // delivery_price = parseInt(delivery_price) + parseInt(totalValue)

        let now = new Date()

        const user = await req.user
            .populate('cart.items.saleId')
            .execPopulate()
        console.log('user here, user', user)

        const post =  new Ameria({
            name, surname, email, phone, address, title, quantity, totalValueTemp, totalValue,ClientID,Username,Password, OrderID,amount, now, status: "Ընթացքում",
            user: {
                userId: req.user
            },
        })

        console.log('new post77777777777777777777777777777777', post)



        await post.save();


        res.redirect('/')
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

router.post("/withbank_ameria/status", async (req, res) => {
    const { id } = req.body;
    delete req.body.id
    await Ameria.findByIdAndUpdate(id, req.body)
    res.redirect('/admin-orders')
})


module.exports = router;