const bookshelf = require('../bookshelf')

const ModelKit = bookshelf.model("model_kit", {
    tableName: 'model_kit',
    chassis() {
        return this.belongsTo("Chassis")
    },
    series() {
        return this.belongsTo("Series")
    },
    stock() {
        return this.belongsTo("Stock")
    },
    admin() {
        return this.belongsTo("Admin")
    },
    cart_item() {
        return this.hasMany("CartItem")
    }
});

const Chassis = bookshelf.model("chassis", {
    tableName: "chassis",
    model_kit() {
        return this.hasMany("ModelKit")
    }
})

const Series = bookshelf.model("series", {
    tableName: "series",
    model_kit() {
        return this.hasMany("ModelKit")
    }
})

const Stock = bookshelf.model("stock", {
    tableName: "stock",
    model_kit() {
        return this.hasMany("ModelKit")
    }
})

const Admin = bookshelf.model("admin", {
    tableName: "admin",
    model_kit() {
        return this.hasMany("ModelKit")
    },
    order() {
        return this.hasMany("Order")
    }
})

const Order = bookshelf.model("order", {
    tableName: "order",
    admin() {
        return this.belongsTo("Admin")
    }
})

const CartItem = bookshelf.model("cart_item", {
    tableName: "cart_item",
    model_kit() {
        return this.belongsTo("ModelKit")
    },
    customer() {
        return this.belongsTo("Customer")
    }
})

const Customer = bookshelf.model("customer", {
    tableName: "customer",
    cart_item() {
        return this.hasMany("CartItem")
    }
})

module.exports = { 
                    ModelKit, Chassis, Series, Stock, 
                    Admin, Order, CartItem, Customer 
                };