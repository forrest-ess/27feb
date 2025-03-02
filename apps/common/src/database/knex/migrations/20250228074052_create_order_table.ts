import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').notNullable();
    table
      .enu(
        'order_status',
        ['pending', 'processing', 'completed', 'cancelled'],
        {
          useNative: true,
          enumName: 'order_status_enum',
        }
      )
      .notNullable()
      .defaultTo('pending');
    table.float('total_amount').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('orders');
}
