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
    const color = await Color.find();

    var perPage = 4
    var page = req.params.page || 1

    
    let min_price = req.query.min_price;
    let max_price = req.query.max_price;

    
    sales_filter = []

    const sales = await Sale.find();
    sales.forEach(i => {
        if (i.price >= min_price && i.price <= max_price) {
            sales_filter.push(i)
        }
    })
    // console.log(sales_filter)

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
                    title: 'Բոլոր կատեգորիաները',
                    contact,
                    category,
                    url,
                    countSale,
                    logo,
                    color,
                    sales_filter
                })
            })
        })
})





module.exports = router;