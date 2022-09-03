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
    console.log("Raw code")
    console.log(model_kit)
    console.log("Main model kit list")
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
        'form': modelKitForm.toHTML(bootstrapField),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
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

router.get('/:id/delete', async (req, res) => {
    console.log("deletion process")
    let model_kit_all = await ModelKit.collection()
        .fetch({
            withRelated: [
                "chassis",
                "series"
            ]
        });
    let model_kit = await ModelKit.where({
        "id": req.params.id
    })
        .fetch({
            require: true,
            withRelated: [
                "chassis",
                "series"
            ]
        });

    res.render("model-kit/delete", {
        "model_kit": model_kit.toJSON(),
        "model_kit_all": model_kit_all.toJSON()
    })


    console.log("product to delete:\n", model_kit.toJSON())
})

router.post('/:id/delete', async (req, res) => {
    console.log("deleting")
    let model_kit = await ModelKit.where({
        "id": req.params.id
    })
        .fetch({
            require: true,
            withRelated: [
                "chassis",
                "series"
            ]
        });

    await model_kit.destroy()
    res.redirect("/model-kit")
})

router.get('/:id/edit', async (req, res) => {
    console.log("editing process")
    let model_kit = await ModelKit.where({
        "id": req.params.id
    })
    .fetch({
        require: true,
        withRelated: [
            "chassis",
            "series"
        ]
    });

    const allChassis = await Chassis.fetchAll().map((chassis) => {
        return [chassis.get('id'), chassis.get('chassis_name')];
    })

    const allSeries = await Series.fetchAll().map((series) => {
        return [series.get('id'), series.get('series_name')];
    })

    const modelKitForm = createModelKitForm(allChassis, allSeries);

    for (each in model_kit.attributes) {
        console.log(each)
        if (each != "id") {
            console.log("done: ", each)
            console.log(model_kit.get(each))
            let modelKitValue
            if (model_kit.get(each) === null) {
                modelKitValue = 0
            }
            else {
                modelKitValue = model_kit.get(each)
            }
            modelKitForm.fields[each].value = modelKitValue
        }
    }

    res.render('model-kit/edit', {
        'form': modelKitForm.toHTML(bootstrapField),
        'model_kit':model_kit.toJSON(),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })


})

router.post('/:id/edit', async (req, res) => {
    console.log("updating...")
    let model_kit = await ModelKit.where({
        "id": req.params.id
    })
    .fetch({
        require: true,
        withRelated: [
            "chassis",
            "series"
        ]
    });

    const allChassis = await Chassis.fetchAll().map((chassis) => {
        return [chassis.get('id'), chassis.get('chassis_name')];
    })

    const allSeries = await Series.fetchAll().map((series) => {
        return [series.get('id'), series.get('series_name')];
    })

    const modelKitForm = createModelKitForm(allChassis, allSeries);

    console.log(modelKitForm)

    modelKitForm.handle(req, {
        'success': async (form) => {
            model_kit.set(form.data);
            await model_kit.save();
            res.redirect('/model-kit');
        },
        'error': async (form) => {
            res.render('model-kit/edit', {
                'form': form.toHTML(bootstrapField),
                "model_kit": model_kit.toJSON(),
            })
        }
    })

})

module.exports = router;
