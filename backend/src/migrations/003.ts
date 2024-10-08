import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('exercises')
    .addColumn('base_word', 'varchar', (col) => col.notNull())
    .addColumn('gender', 'varchar', (col) => col.notNull())
    .addColumn('declension', 'varchar', (col) => col.notNull())
    .addColumn('number', 'varchar', (col) => col.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await
    db.schema.alterTable('exercises').dropColumn('type').execute()
}
