import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('product_category', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('category_name').unique().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('product_category');
}
