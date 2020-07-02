const { Router } = require('express');
const router = Router();
const Service = require('../models/Service');
const Advantage = require('../models/Advantage');
const Contact = require('../models/Contact');
const HeaderSliderText = require('../models/HeaderSliderText');
const Sale = require('../models/Sale')
const Category = require('../models/Category')
const Slider = require('../models/Slider');
const Logo = require('../models/Logo')

router.get('/', async (req, res) => {
    const service = await Service.find()
    const advantage = await (await Advantage.find().limit(6)).reverse();
    const contact = await Contact.find()
    const HeaderText = await HeaderSliderText.find()
    const sale = await (await Sale.find().limit(6)).reverse();

    const hit = await (await Sale.find({hit: '1'}).limit(6)).reverse();
    const news = await Sale.find({news: "1"})

    const slider = await Slider.find();

    const logo = await Logo.find();

    const category = await Category.find();

    res.render('index', {
        title: 'Главная',
        service,
        advantage,
        contact,
        HeaderText,
        sale,
        news,
        hit,
        category,
        slider,
        logo
    })
})

module.exports = router;