/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('user_account', table => {
      table.increments('id');
      table.string('first_name');
      table.string('last_name');
      table.string('username');
      table.string('password');
    })
    .createTable('item', table => {
      table.increments('id');
      table.integer('user_id');
      table.foreign('user_id').references('user_account.id');
      table.string('item_name');
      table.string('description');
      table.integer('quantity');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('item')
    .dropTableIfExists('user_account');
};
