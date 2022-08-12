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
  return db.addColumn("chassis", "model_kit_id", {
    type: "int",
    unsigned: true,
    notNull: true,
    foreignKey: {
      name: "chassis_model_kit_fk",
      table: "model_kit",
      rules: {
        onDelete: "cascade",
        onUpdate: "restrict"
      },
      mapping: "id"
    }
  })
};

exports.down = function (db) {
  return db.removeColumn("chassis", "model_kit_id");
};

exports._meta = {
  "version": 1
};
