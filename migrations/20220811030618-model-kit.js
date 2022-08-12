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
    name: {
      type: "string",
      notNull: false
    },
    width: {
      type: "smallint",
      notNull: false,
      unsigned: true
    },
    length: {
      type: "smallint",
      notNull: false,
      unsigned: true
    },
    height: {
      type: "smallint",
      notNull: false,
      unsigned: true
    },
    price: {
      type: "decimal",
      notNull: false,
      unsigned: true
    },
    image: {
      type: "string",
      notNull: false,
    },
    description: {
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
