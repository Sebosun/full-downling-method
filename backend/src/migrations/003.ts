import { Kysely } from 'kysely'
import { Database } from '@/types'

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable('exercises')
    .addColumn('base_word', 'varchar', (col) => col.notNull())
    .addColumn('gender', 'varchar', (col) => col.notNull())
    .addColumn('declension', 'varchar', (col) => col.notNull())
    .addColumn('number', 'varchar', (col) => col.notNull())
    .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
  await
    db.schema.
      alterTable('exercises')
      .dropColumn('base_word')
      .dropColumn('gender')
      .dropColumn('declension')
      .dropColumn('number')
      .execute()
}

