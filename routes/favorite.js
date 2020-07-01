const {Router} = require('express')
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category')

router.get('/', async (req,res)=> {
    const contact = await Contact.find()
    const category = await Category.find();
    res.render('favorite', {
        title: 'Мои избранники',
        contact,
        category
    })
})

module.exports = router;