const bookshelf = require('../bookshelf')

const ModelKit = bookshelf.model("model_kit", {
    tableName: 'model_kit',
    parse(response){
        if(response.model_kit_price){
            response.model_kit_price = response.model_kit_price.toFixed(2)
            return response
        }
    },
    chassis() {
        return this.belongsTo(Chassis)
    },
    series() {
        return this.belongsTo(Series)
    },
    cart_item() {
        return this.hasMany("CartItem")
    },
    order_item() {
        return this.hasMany("OrderItem")
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

const Admin = bookshelf.model("admin", {
    tableName: "admin"
})

const Order = bookshelf.model("order", {
    tableName: "order",
    order_item() {
        return this.hasMany("OrderItem")
    },
    customer() {
        return this.hasMany("Customer")
    }
})

const OrderItem = bookshelf.model("order_item", {
    tableName: "order_item",
    order() {
        return this.belongsTo("Order")
    },
    model_kit() {
        return this.belongsTo("ModelKit")
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
    order() {
        return this.belongsTo("Customer")
    },
    cart_item() {
        return this.hasMany("CartItem")
    }
})

module.exports = {
    ModelKit, Chassis, Series, Admin, 
    Order, OrderItem, CartItem, Customer
};