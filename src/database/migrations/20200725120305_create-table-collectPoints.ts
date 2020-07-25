import Knex from 'knex';

exports.up = function(knex: Knex) {
  return knex.schema.createTable('collectpoints', (t) => {
    t.increments('id').primary();
    t.string('image').notNullable();
    t.string('name').notNullable();
    t.string('email').notNullable();
    t.string('whatsapp').notNullable();
    t.string('city').notNullable();
    t.string('uf', 2).notNullable();
    t.decimal('latitude').notNullable();
    t.decimal('longitude').notNullable();
  });
};

exports.down = function(knex: Knex) {
 return knex.schema.dropTable('collectpoints');
};
