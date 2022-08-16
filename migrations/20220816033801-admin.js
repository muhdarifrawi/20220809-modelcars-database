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
  return db.createTable("admin", {
    id: {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unsigned: false
    },
    admin_username: {
      type: "string",
      notNull: false
    },
    admin_first_name: {
      type: "string",
      notNull: false
    },
    admin_last_name: {
      type: "string",
      notNul: false
    },
    admin_password: {
      type: "string",
      notNull: false
    }
  })
};

exports.down = function (db) {
  return db.dropTable("admin");
};

exports._meta = {
  "version": 1
};
