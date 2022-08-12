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
  return db.createTable("customer", {
    id: {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unsigned: true
    },
    username: {
      type: "string",
      notNull: true
    },
    first_name: {
      type: "string",
      notNull: false
    },
    last_name: {
      type: "string",
      notNull: false
    },
    date_of_birth: {
      type: "date",
      notNull: false
    },
    description: {
      type: "text",
      notNull: false
    },
    address: {
      type: "text",
      notNull: false
    },
    email: {
      type: "string",
      notNull: true
    },
    password: {
      type: "string",
      notNull: true
    }
  })
};

exports.down = function (db) {
  return db.dropTable("customer");
};

exports._meta = {
  "version": 1
};
