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
  return db.createTable("chassis", {
    id: {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unsigned: true
    },
    chassis_name: {
      type: "string",
      notNull: false
    },
    chassis_description: {
      type: "text",
      notNull: false
    },
    chassis_image: {
      type: "string",
      notNull: false
    }
  })
};

exports.down = function (db) {
  return db.dropTable("chassis")
};

exports._meta = {
  "version": 1
};
