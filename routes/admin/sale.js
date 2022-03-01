const {Router} = require('express')
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
        callback(null, file.fieldname + '-' + Math.random() + Date.now());
    }
});

var upload = multer({storage: storage}).array('avatar', 4);


router.get('/', async (req, res) => {
    // const sale = await (await Sale.find()).reverse();
    const sale = await Sale.find()
    const category = await Category.find()
    const color = await Color.find()

    // if (req.session.user.role == 'User') {
    //     res.redirect('/')
    // } else {
    //     res.render('admin/sale', {
    //         title: 'Sale',
    //         sale,
    //         category,
    //         color
    //     })
    // }

    res.render('admin/sale', {
        title: 'Sale',
        sale,
        category,
        color
    })

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

        let date = Date.now()

        const post = new Sale({
            code, price, hit, news, avatar, color,
            titleEn, infoEn, categoryEn, more_infoEn, sizeEn, weightEn, materialEn, discountEn,
            titleHy, infoHy, categoryHy, more_infoHy, sizeHy, weightHy, materialHy, discountHy,
            titleRu, infoRu, categoryRu, more_infoRu, sizeRu, weightRu, materialRu, discountRu,
            date,
            userId: req.user
        })
        await post.save();
        res.redirect('/admin-sale')
    });
})

router.post('/delete', async (req, res) => {
    await Sale.deleteOne({_id: req.body.id})
    res.redirect('/admin-sale')
})


router.get('/:id/edit', async (req, res) => {
    const sale = await Sale.findById(req.params.id)
    const category = await Category.find()
    const color = await Color.find()


    res.render('edit-sale', {
        title: `Change`,
        sale,
        category,
        color,
    })
})


router.post('/edit', async (req, res) => {
    const {id} = req.body
    delete req.body.id
    await Sale.findByIdAndUpdate(id, req.body)
    res.redirect('/admin-sale')
})

router.post('/edit-image', async (req, res) => {
    const {id} = req.body
    delete req.body.id
    const sale = await Sale.findById(id)
    console.log(req.body,"ttttttt77777777777777777777777777ittttttttttttttt");
    const img = sale.avatar.filter(i => {
        return i === req.body.encoded_img
    })

    const x = sale.avatar.filter(k => {
        return k !== img.toString()
    })
    x.unshift(img.toString())
    sale.avatar = img
    await sale.save()

    res.redirect('/admin-sale')
})


// router.post('/edit-image', async (req, res) => {
//     const {
//         id,code, price, hit, news, color,
//         titleEn, infoEn, categoryEn, more_infoEn, sizeEn, weightEn, materialEn, discountEn,
//         titleHy, infoHy, categoryHy, more_infoHy, sizeHy, weightHy, materialHy, discountHy,
//         titleRu, infoRu, categoryRu, more_infoRu, sizeRu, weightRu, materialRu, discountRu,
//     } = req.body;
//     delete req.body.id
//     const sale = await Sale.findById(id)

//     sale.code = code
//     sale.price = price
//     sale.hit = hit
//     sale.news = news
//     sale.color = color
//     sale.titleEn = titleEn
//     sale.infoEn = infoEn
//     sale.categoryEn = categoryEn
//     sale.more_infoEn = more_infoEn
//     sale.sizeEn = sizeEn
//     sale.weightEn = weightEn
//     sale.materialEn = materialEn
//     sale.discountEn = discountEn
//     sale.titleHy = titleHy
//     sale.infoHy = infoHy
//     sale.categoryHy = categoryHy
//     sale.more_infoHy = more_infoHy
//     sale.sizeHy = sizeHy
//     sale.weightHy = weightHy
//     sale.materialHy = materialHy
//     sale.discountHy = discountHy
//     sale.titleRu = titleRu
//     sale.infoRu = infoRu
//     sale.categoryRu = categoryRu
//     sale.more_infoRu = more_infoRu
//     sale.sizeRu = sizeRu
//     sale.weightRu = weightRu
//     sale.materialRu = materialRu
//     sale.discountRu = discountRu

//     sale.save()
//     res.redirect('/admin-sale')
// })



// router.post('/edit-image', async function (req, res, next) {
//     upload(req, res, async function (err) {
//         const {
//             code, price, hit, news, color,
//             titleEn, infoEn, categoryEn, more_infoEn, sizeEn, weightEn, materialEn, discountEn,
//             titleHy, infoHy, categoryHy, more_infoHy, sizeHy, weightHy, materialHy, discountHy,
//             titleRu, infoRu, categoryRu, more_infoRu, sizeRu, weightRu, materialRu, discountRu,
//         } = req.body;

//         let img = req.files;
//         let avatar = []
//         img.forEach(i => {
//             let imgName = i.filename;
//             avatar.push(imgName)
//         })

//         let date = Date.now()

//         const post = new Sale({
//             code, price, hit, news, avatar, color,
//             titleEn, infoEn, categoryEn, more_infoEn, sizeEn, weightEn, materialEn, discountEn,
//             titleHy, infoHy, categoryHy, more_infoHy, sizeHy, weightHy, materialHy, discountHy,
//             titleRu, infoRu, categoryRu, more_infoRu, sizeRu, weightRu, materialRu, discountRu,
//             date,
//             userId: req.user
//         })
//         await post.save();
//         res.redirect('/admin-sale')
//     });
// })

module.exports = router;