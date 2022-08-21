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
  return db.removeForeignKey("order", "order_admin_fk")
    .then(
      db.removeForeignKey("model_kit", "model_kit_admin_fk")
    )
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
