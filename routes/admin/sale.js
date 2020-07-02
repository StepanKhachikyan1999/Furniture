const { Router } = require('express')
const router = Router();
const multer = require('multer');
const Sale = require('../../models/Sale')
const Category = require('../../models/Category');
const auth = require('../../middleware/auth');


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({ storage: storage }).array('avatar', 4);


router.get('/',  async (req, res) => {
    const sale = await (await Sale.find()).reverse();
    const category = await Category.find()

    // if (req.session.user.role == 'User') {
    //     res.redirect('/')
    // } else {
    //     res.render('admin/sale', {
    //         title: 'Sale',
    //         sale,
    //         category
    //     })
    // }

    res.render('admin/sale', {
        title: 'Sale',
        sale,
        category
    })

})


router.post('/create', async function (req, res, next) {
    upload(req, res, async function (err) {
        const {
            code, price, hit, news,
            titleEn, infoEn, categoryEn, more_infoEn, sizeEn, weightEn, materialEn, colorEn, discountEn,
            titleHy, infoHy, categoryHy, more_infoHy, sizeHy, weightHy, materialHy, colorHy, discountHy,
            titleRu, infoRu, categoryRu, more_infoRu, sizeRu, weightRu, materialRu, colorRu, discountRu,
        } = req.body;

        let img = req.files;
        let avatar = []
        img.forEach(i => {
            let imgName = i.filename;
            avatar.push(imgName)
        })

        const post = new Sale({
            code, price, hit, news, avatar,
            titleEn, infoEn, categoryEn, more_infoEn, sizeEn, weightEn, materialEn, colorEn, discountEn,
            titleHy, infoHy, categoryHy, more_infoHy, sizeHy, weightHy, materialHy, colorHy, discountHy,
            titleRu, infoRu, categoryRu, more_infoRu, sizeRu, weightRu, materialRu, colorRu, discountRu,
        })
        await post.save();
        res.redirect('/admin-sale')
    });
})

router.post('/delete', async (req, res) => {
    await Sale.deleteOne({ _id: req.body.id })
    res.redirect('/admin-sale')
})


router.get('/:id/edit', async (req, res) => {
    const sale = await Sale.findById(req.params.id)
    const category = await Category.find()

    res.render('edit-sale', {
        title: `Change`,
        sale,
        category
    })
})

router.post('/edit', async (req, res) => {
    const { id } = req.body
    delete req.body.id
    await Sale.findByIdAndUpdate(id, req.body)
    res.redirect('/admin-sale')
})


module.exports = router;