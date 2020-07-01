const Contact = require('../models/Contact');
const Category = require('../models/Category')

module.exports = async function (req, res, next) {
    const contact = await Contact.find()
    const category = await Category.find();
    res.status(404).render('404', {
        title: 'Page not found',
        contact,
        category
    })
}