'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.addForeignKey("order", "customer", "order_customer_fk",
    {
      "id": "id"
    },
    {
      onDelete: "CASCADE",
      onUpdate: "RESTRICT"
    }
  ).then(
    db.addForeignKey("order", "order_item", "order_order_item_fk",
      {
        "id": "id"
      },
      {
        onDelete: "CASCADE",
        onUpdate: "RESTRICT"
      }
    )
  )
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
