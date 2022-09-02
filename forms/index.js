const forms = require("forms");
const fields = forms.fields;
const widgets = forms.widgets;
const validators = forms.validators;

var bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }

    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }

    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }

    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group">' + label + widget + error + '</div>';
};

const createModelKitForm = (chassis, series) => {
    return forms.create({
        'model_kit_name': fields.string({
            required: true,
            errorAfterField: true,
            widget: widgets.text(),
            cssClasses: {
                label: ['form-label', 'mt-1']
            }
        }),
        'model_kit_width': fields.string({
            required: true,
            errorAfterField: true,
            widget: widgets.text(),
            cssClasses: {
                label: ['form-label', 'mt-1']
            }
        }),
        'model_kit_length': fields.string({
            required: true,
            errorAfterField: true,
            widget: widgets.text(),
            cssClasses: {
                label: ['form-label', 'mt-1']
            }
        }),
        'model_kit_height': fields.string({
            required: true,
            errorAfterField: true,
            widget: widgets.text(),
            cssClasses: {
                label: ['form-label', 'mt-1']
            }
        }),
        'model_kit_price': fields.string({
            required: true,
            errorAfterField: true,
            widget: widgets.text(),
            cssClasses: {
                label: ['form-label', 'mt-1']
            }
        }),
        'model_kit_image': fields.string({
            required: false,
            errorAfterField: true,
            widget: widgets.hidden()
        }),
        'model_kit_description': fields.string({
            required: true,
            errorAfterField: true,
            widget: widgets.textarea(),
            cssClasses: {
                label: ['form-label', 'mt-1']
            }
        }),
        'chassis_id': fields.string({
            label: 'Chassis',
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label', 'mt-1']
            },
            widget: widgets.select(),
            choices: chassis
        }),
        'series_id': fields.string({
            label: 'Series',
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label', 'mt-1']
            },
            widget: widgets.select(),
            choices: series
        }),
        'model_kit_quantity': fields.string({
            required: true,
            errorAfterField: true,
            widget: widgets.text(),
            cssClasses: {
                label: ['form-label', 'mt-1']
            },
            value: 0
        })


    })
};

module.exports = { createModelKitForm, bootstrapField };
