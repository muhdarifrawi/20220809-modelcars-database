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
    customer_username: {
      type: "string",
      notNull: true
    },
    customer_first_name: {
      type: "string",
      notNull: false
    },
    customer_last_name: {
      type: "string",
      notNull: false
    },
    customer_date_of_birth: {
      type: "date",
      notNull: false
    },
    customer_description: {
      type: "text",
      notNull: false
    },
    customer_address: {
      type: "text",
      notNull: true
    },
    customer_email: {
      type: "string",
      notNull: true
    },
    customer_password: {
      type: "string",
      notNull:true
    }
  })
};

exports.down = function (db) {
  return db.dropTable("customer")
};

exports._meta = {
  "version": 1
};
