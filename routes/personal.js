const { Router } = require('express');
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category')
const Logo = require('../models/Logo')
const auth = require('../middleware/auth');

router.get('/', auth, async  (req, res) => {
    const contact = await Contact.find()
    const category = await Category.find();
    const logo = await Logo.find();

    const user = req.user.toObject();


    res.render('personal', {
        title: 'Անձնական սենյակ',
        contact,
        category,
        logo,
        user
    })
})

module.exports = router;