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
  return db.addColumn("cart_item", "model_kit_listing_id", {
    type: "int",
    unsigned: true,
    notNull: true,
    foreignKey: {
      name: "cart_item_model_kit_listing_fk",
      table: "model_kit_listing",
      rules: {
        onDelete: "cascade",
        onUpdate: "restrict"
      },
      mapping: "id"
    }
  })
};

exports.down = function (db) {
  return db.removeColumn("cart_item");
};

exports._meta = {
  "version": 1
};
