const ShortUniqueId = require('short-unique-id');
const QRCode = require('qrcode');
const Db=require('../models/schema')

const createUrl=async(req, res)=>{
    try {   
        console.log("Received body:", req.body);
        const {originalUrl}=req.body;
        if(!originalUrl){
            return res.status(400).json({ error: 'URL is required' });
        }
        const alreadyExist = await Db.findOne({ originalUrl });
        if(alreadyExist){
            const shortLink=originalUrl;
            const qr=await QRCode.toDataURL(shortLink);
            return res.status(200).json({key: alreadyExist.shortUrl, qrCode: qr});
        }
        const uid = new ShortUniqueId({length:4});
        const shortUrl = uid.rnd();
        await Db.create({
            originalUrl: originalUrl,  
            shortUrl: shortUrl,
        });
        const shortLink=`http://localhost:5000/${shortUrl}`;
        const qr=await QRCode.toDataURL(shortLink);
        return res.status(201).json({key: shortUrl,qrCode:qr});
    } 
    catch (error) {
        console.error(`Error while creating short URL: ${error}`);
        return res.status(500).json({error:'Internal server error'});
    }
}

const getData = async(req,res)=>{
    try{
        const data=await Db.find();
        res.json(data);
    }
    catch(error){
        console.log(`An error occurred while getting data from database ${error}`);
        return res.status(500).json({error:'Database error'});
    }
}

module.exports={ createUrl,getData};
