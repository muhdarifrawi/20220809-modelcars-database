const bookshelf = require('../bookshelf')

const ModelKit = bookshelf.model("model_kit", {
    tableName:'model_kit'
});

module.exports = { ModelKit };