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
  return db.createTable("series", {
    id: {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unsigned: true
    },
    series_name: {
      type: "string",
      notNull: false
    },
    series_description: {
      type: "string",
      notNull: false
    }
  })
};

exports.down = function (db) {
  return db.dropTable("series");
};

exports._meta = {
  "version": 1
};
