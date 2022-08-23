const express = require("express");
const router = express.Router();

const { ModelKit, Chassis, Series } = require('../models')
const { createModelKitForm, bootstrapField } = require("../forms")

router.get('/', async (req, res) => {
    let model_kit = await ModelKit.collection()
                                    .fetch({
                                        withRelated: [
                                            "chassis",
                                            "series"
                                        ]
                                    });
    console.log("test")
    console.log(model_kit.toJSON())
    
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
            const modelKit = new ModelKit(form.data);
            await modelKit.save();
            res.redirect('/model-kit');

        },
        "error": async (form) => {
            console.log(form)
        }
    })
})

module.exports = router;