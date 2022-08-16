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
  return db.createTable("stock", {
    id: {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unsigned: true
    },
    stock_quantity:{
      type: "int",
      unsigned:true,
      notNull: false,
      defaultValue:0
    }
  })
};

exports.down = function (db) {
  return dropTable("stock");
};

exports._meta = {
  "version": 1
};
