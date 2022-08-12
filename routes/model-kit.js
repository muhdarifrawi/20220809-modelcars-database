const express = require("express");
const router = express.Router();

const {ModelKit} = require('../models')

router.get('/', async (req,res)=>{
    console.log("test")
    let model_kit = await ModelKit.collection().fetch();
    res.render('model-kit/index',{
        "model_kit": model_kit.toJSON()
    })
})

module.exports = router;