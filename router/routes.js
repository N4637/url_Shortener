const {createUrl}=require('../controllers/urlControllers');
const Db=require('../models/schema')
const express=require('express');
const router=express.Router();
router.post('/shortUrl',createUrl);
router.get('/:shorturl',async (req,res)=>{
    try{
        const short=await Db.findOne({shortUrl:req.params.shorturl});
        if(!short){
            return res.status(404).send('URL not found');
        }
        short.clickCount++;
        await short.save();
        res.redirect(short.originalUrl);
    }
    catch(error){
        console.log(`error occurred while saving data ${error}`);
    }
})

module.exports=router;