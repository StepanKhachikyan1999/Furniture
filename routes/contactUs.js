const { Router } = require('express')
const router = Router();


const ContactUs = require('../models/ContactUs')

router.post('/', async function(req,res){
    const {name,email,theme ,message} = req.body


    if(!(name && email && theme && message)){
        return res.json({message:"bad request!"})
    }


    const newConatct = await ContactUs.create({name,email,theme ,message})

    return res.json(newConatct)
})




router.get('/', async function(req,res){
    const allContacts = await ContactUs.findeAll()

    return res.json(allContacts)
})

module.exports = router;