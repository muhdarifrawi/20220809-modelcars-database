'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.addColumn("model_kit_listing", "model_kit_listing_admin_id", {
    type: "int",
    unsigned: true,
    notNull: true,
    foreignKey: {
      name: "model_kit_listing_model_kit_listing_admin_fk",
      table: "model_kit_listing_admin",
      rules: {
        onDelete: "cascade",
        onUpdate: "restrict"
      },
      mapping: "id"
    }
  })
};

exports.down = function(db) {
  return db.removeColumn("model_kit_listing","model_kit_listing_admin_id");
};

exports._meta = {
  "version": 1
};
