const { Router } = require('express');
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category');
const Sale = require('../models/Sale');
const Logo = require('../models/Logo')
const Color = require('../models/Color')


router.get('/:page', async (req, res) => {

    const contact = await Contact.find()
    const category = await Category.find()
    const url = req.originalUrl;

    let countSale = await (await Sale.find()).length;

    const logo = await Logo.find();
    const color = await Color.find()

    var perPage = 4
    var page = req.params.page || 1

    Sale
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, sale) {
            Sale.countDocuments().exec(function (err, count) {

                if (err) return next(err)
                res.render('all-category', {
                    sale: sale,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    title: 'Все категории',
                    contact,
                    category,
                    url,
                    countSale,
                    logo,
                    color
                })
            })
        })
})



module.exports = router;