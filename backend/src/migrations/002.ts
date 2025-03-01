import { Kysely, sql } from 'kysely'
import { Database } from '@/db_types'

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('exercises')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('question', 'varchar', (col) => col.notNull().unique())
    .addColumn('answer', 'varchar', (col) => col.notNull())
    .addColumn('created_at', 'varchar', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('updated_at', 'varchar', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('exercises').execute()
}
