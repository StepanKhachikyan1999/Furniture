const { Router } = require('express')
const router = Router();
const multer = require('multer');
const Sale = require('../../models/Sale')
const Category = require('../../models/Category');
const auth = require('../../middleware/auth');
const Color = require('../../models/Color')


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({ storage: storage }).array('avatar', 4);


router.get('/', auth, async (req, res) => {
    const sale = await (await Sale.find()).reverse();
    const category = await Category.find()
    const color = await Color.find()

    if (req.session.user.role == 'User') {
        res.redirect('/')
    } else {
        res.render('admin/sale', {
            title: 'Sale',
            sale,
            category,
            color
        })
    }

    // res.render('admin/sale', {
    //     title: 'Sale',
    //     sale,
    //     category,
    //     color
    // })

})


router.post('/create', async function (req, res, next) {
    upload(req, res, async function (err) {
        const {
            code, price, hit, news, color,
            titleEn, infoEn, categoryEn, more_infoEn, sizeEn, weightEn, materialEn, discountEn,
            titleHy, infoHy, categoryHy, more_infoHy, sizeHy, weightHy, materialHy, discountHy,
            titleRu, infoRu, categoryRu, more_infoRu, sizeRu, weightRu, materialRu, discountRu,
        } = req.body;

        let img = req.files;
        let avatar = []
        img.forEach(i => {
            let imgName = i.filename;
            avatar.push(imgName)
        })

        const post = new Sale({
            code, price, hit, news, avatar, color,
            titleEn, infoEn, categoryEn, more_infoEn, sizeEn, weightEn, materialEn, discountEn,
            titleHy, infoHy, categoryHy, more_infoHy, sizeHy, weightHy, materialHy, discountHy,
            titleRu, infoRu, categoryRu, more_infoRu, sizeRu, weightRu, materialRu, discountRu,
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