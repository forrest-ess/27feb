import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('product_category').del();

  // Inserts seed entries
  await knex('product_category').insert([
    { category_name: 'Electronics' },
    { category_name: 'Books' },
    { category_name: 'Clothing' },
    { category_name: 'Home & Garden' },
    { category_name: 'Sports' },
    { category_name: 'Health & Beauty' },
    { category_name: 'Toys' },
    { category_name: 'Automotive' },
    { category_name: 'Music' },
    { category_name: 'Movies' },
  ]);
}
