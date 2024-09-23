import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('exercises')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('question', 'varchar', (col) => col.notNull())
    .addColumn('answer', 'varchar', (col) => col.notNull())
    .addColumn('created_at', 'varchar', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('updated_at', 'varchar', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('exercises').execute()
}
