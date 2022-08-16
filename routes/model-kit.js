const express = require("express");
const router = express.Router();

const { ModelKit, Chassis, Series } = require('../models')
const { createModelKitForm, bootstrapField } = require("../forms")

router.get('/', async (req, res) => {
    let model_kit = await ModelKit.collection().fetch();
    res.render('model-kit/index', {
        "model_kit": model_kit.toJSON()
    })
})

router.get("/create", async (req, res) => {
    const allChassis = await Chassis.fetchAll().map((chassis) => {
        return [chassis.get('id'), chassis.get('chassis_name')];
    })

    const allSeries = await Series.fetchAll().map((series) => {
        return [series.get('id'), series.get('series_name')];
    })

    const modelKitForm = createModelKitForm(allChassis, allSeries);
    res.render('model-kit/create', {
        'form': modelKitForm.toHTML(bootstrapField)
    })
})

router.post('/create', async (req, res) => {
    const allChassis = await Chassis.fetchAll().map((chassis) => {
        return [chassis.get('id'), chassis.get('name')];
    })

    const allSeries = await Series.fetchAll().map((series) => {
        return [series.get('id'), series.get('name')];
    })

    const modelKitForm = createModelKitForm(allChassis, allSeries);
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