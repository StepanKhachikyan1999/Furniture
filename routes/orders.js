const { Router } = require('express');
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category')
const Cash = require('../models/Order/Cash');
const WithBank = require('../models/Order/Withbank')
const WithoutBank = require('../models/Order/WithoutBank')

router.get('/', async  (req, res) => {
    const contact = await Contact.find()
    const category = await Category.find();
    const cash = await Cash.find()
    const withBank = await WithBank.find();
    const withoutBank = await WithoutBank.find()

    res.render('orders', {
        title: 'История заказов',
        contact,
        category,
        cash,
        withBank,
        withoutBank
    })
})

module.exports = router;