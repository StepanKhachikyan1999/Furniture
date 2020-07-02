const { Router } = require('express');
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category');
const Sale = require('../models/Sale');



router.get('/:categoryEn/:page', async (req, res) => {
    var perPage = 4
    var page = req.params.page || 1

    // let countSaleCategory = await (await Sale.find({categoryEn: req.params.categoryEn})).length;

    let countSale = await (await Sale.find()).length;

    // const sale_by_category = await Sale.find({ categoryEn: req.params.categoryEn });
    const contact = await Contact.find()
    const category = await Category.find()

    let category_name = req.params.categoryEn


    Sale
        .find({categoryEn: req.params.categoryEn})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, sale_by_category) {
            Sale.countDocuments().exec(function (err, count) {
                // let currentpages = '/result-search/'+page
                if (err) return next(err)
                res.render('result-search', {
                    sale_by_category: sale_by_category,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    title: 'Все категории',
                    contact,
                    category,
                    category_name,
                    countSale,
                    // countSaleCategory
                    // currentpage
                })
            })
        })

})

module.exports = router;