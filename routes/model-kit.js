const express = require("express");
const router = express.Router();

const { ModelKit } = require('../models')
const { createModelKitForm, bootstrapField } = require("../forms")

router.get('/', async (req, res) => {
    let model_kit = await ModelKit.collection().fetch();
    res.render('model-kit/index', {
        "model_kit": model_kit.toJSON()
    })
})

router.get("/create", async (req, res) => {
    const modelKitForm = createModelKitForm();
    res.render('model-kit/create',{
        'form': modelKitForm.toHTML(bootstrapField)
    })
})

module.exports = router;