const shortid = require('shortid');
const ping = require('node-http-ping')
 
const URL=require('../models/url')

async function generateNewShortURL(req,res){





    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "Url requerida" });
    const shortID = shortid();

  

  
    const newURL = new URL({
        shortId: shortID,
        redirectURL: body.url,
     
      });
      
      await newURL.save();
      console.log(newURL)
  
    return res.json({ id: shortID });
}











module.exports={generateNewShortURL}