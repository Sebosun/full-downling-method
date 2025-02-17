import { Kysely } from 'kysely'
import { Database } from '@/types'

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('user_settings')
    .addColumn('user_id', 'integer', (col) =>
      col.references('user.id').onDelete('cascade').notNull().primaryKey().unique()
    )
    .addColumn('easy_mode', 'boolean', (col) => col.notNull().defaultTo(false))
    .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
  await
    db.schema.dropTable('user_settings').execute()
}

