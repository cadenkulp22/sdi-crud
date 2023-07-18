/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_account').del()
  await knex('user_account').insert([
    {id: 1, first_name: 'test', last_name: 'user', username: 'test', password: 'test'}
  ]);
};
