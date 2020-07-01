const { Router } = require('express');
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category');
const Sale = require('../models/Sale');


router.get('/', async (req, res) => {
    const contact = await Contact.find()
    const category = await Category.find()

    const sale = await Sale.find();

    res.render('result-search', {
        title: 'Все категории',
        contact,
        category,
        sale
    })
})

module.exports = router;