const { Router } = require('express')
const router = Router();


const ContactUs = require('../models/ContactUs')

router.post('/', async function(req,res){
    const {name,email,theme ,message} = req.body


    if(!(name && email && theme && message)){
        res.redirect('/contact');
        return res.json({message:"bad request!"})
    }
    if(name === '' && email === '' && theme === '' && message === '' ) {
        res.redirect('/contact');
        return "լրացրեք բոլոր դաշտերը"
    }

    const newConatct = await ContactUs.create({name,email,theme ,message})
    res.redirect('/contact');
    return res.json(newConatct)
})


router.get('/', async function(req,res){
    const allContacts = await ContactUs.findAll()

    return res.json(allContacts)
})

module.exports = router;