import Knex from 'knex';

exports.up = function(knex: Knex) {
  return knex.schema.createTable('itemscollect', (t) => {
    t.increments('id').primary();
    t.string('image').notNullable();
    t.string('title').notNullable();
  });
};

exports.down = function(knex: Knex) {
 return knex.schema.dropTable('itemscollect');
};
