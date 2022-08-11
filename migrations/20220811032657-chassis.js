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
  return db.createTable("chassis",{
    id: {
      type: "int",
      primaryKey:true,
      autoIncrement:true,
      unsigned:true
    },
    name:{
      type:"string",
      length:"21",
      notNull:false
    },
    description: {
      type:"text",
      length: 125,
      notNull:false
    }
  })
};

exports.down = function(db) {
  return db.dropTable("chassis");
};

exports._meta = {
  "version": 1
};
