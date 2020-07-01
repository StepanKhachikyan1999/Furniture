const { Router } = require('express')
const router = Router();
const Contact = require('../models/Contact');
const About = require('../models/About');
const Category = require('../models/Category')

router.get('/', async (req, res) => {
    const contact = await Contact.find()
    const about = await About.find()
    const category = await Category.find();

    res.render('about', {
        title: 'О нас',
        contact,
        about,
        category
    })
})

module.exports = router;