const bookshelf = require('../bookshelf')

const ModelKit = bookshelf.model("model_kit", {
    tableName: 'model_kit',
    model_kit_listing(){
        return this.hasMany("ModelKitListing")
    }
});

const ModelKitListing = bookshelf.model("model_kit_listing", {
    tableName: "model_kit_listing",
    model_kit(){
        return this.belongsTo("ModelKit")
    }
})

module.exports = { ModelKit, ModelKitListing };