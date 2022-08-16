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
  return db.createTable("model_kit", {
    id: {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unsigned: true
    },
    model_kit_name: {
      type: "string",
      notNull: false
    },
    model_kit_width: {
      type: "smallint",
      notNull: false,
      unsigned: true
    },
    model_kit_length: {
      type: "smallint",
      notNull: false,
      unsigned: true
    },
    model_kit_height: {
      type: "smallint",
      notNull: false,
      unsigned: true
    },
    model_kit_price: {
      type: "decimal",
      notNull: false,
      unsigned: true
    },
    model_kit_image: {
      type: "string",
      notNull: false
    },
    model_kit_description: {
      type: "text",
      notNull: false
    }
  })
};

exports.down = function (db) {
  return db.dropTable("model_kit");
};

exports._meta = {
  "version": 1
};
