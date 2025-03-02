import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('products', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('product_name').unique().notNullable();
    table
      .uuid('category_id')
      .references('id')
      .inTable('product_category')
      .notNullable();
    table.float('product_price').notNullable();
    table.integer('stock_quantity').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('products');
}
