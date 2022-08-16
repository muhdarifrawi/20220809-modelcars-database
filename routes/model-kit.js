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

router.post('/create', async(req,res)=>{
    const modelKitForm = createModelKitForm();
    modelKitForm.handle(req, {
        'success': async (form) => {
            const modelKit = new ModelKit();
            modelKit.set('name', form.data.name);
            modelKit.set('price', form.data.price);
            modelKit.set('width', form.data.width);
            modelKit.set('length', form.data.length);
            modelKit.set('height', form.data.height);
            modelKit.set('image', form.data.image);
            modelKit.set('description', form.data.description);
            await modelKit.save();
            res.redirect('/products');

        },
        "error": async (form) => {
            console.log(form)
        }
    })
})

module.exports = router;