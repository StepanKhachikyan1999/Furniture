const { Router } = require('express');
const router = Router();
const Cash = require('../../models/Order/Cash')
const WithoutBank = require('../../models/Order/WithoutBank');
const WithBank = require('../../models/Order/Withbank');
const auth = require('../../middleware/auth');

router.get('/', auth, async (req, res) => {

    const cash = await (await Cash.find()).reverse();
    const withoutBank = await (await WithoutBank.find()).reverse();
    const withBank = await (await WithBank.find()).reverse();

    if (req.session.user.role == 'User') {
        res.redirect('/')
    } else {
        res.render('admin/orders', {
            title: 'Orders',
            cash,
            withoutBank,
            withBank
        })
    }
})

module.exports = router;
