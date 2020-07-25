import Knex from 'knex';

exports.up = function(knex: Knex) {
  return knex.schema.createTable('itemsonpoints', (t) => {
    t.increments('id').primary();
    t.integer('collectPointId').notNullable().references('id').inTable('collectpoints');
    t.integer('itemCollectId').notNullable().references('id').inTable('itemscollect');
  });
};

exports.down = function(knex: Knex) {
 return knex.schema.dropTable('itemsonpoints');
};
