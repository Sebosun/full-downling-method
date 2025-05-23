import { Kysely } from 'kysely'
import { Database } from '@/db_types'

// TODO: WIP
export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema.alterTable('exercises')
        .addColumn('type', 'varchar', (col) => col.notNull())
        .dropColumn('base_word')
        .dropColumn('case')
        .dropColumn('gender')
        .dropColumn('declension')
        .dropColumn('number')
        .execute()

    await db.schema
        .createTable('noun_metadata')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('exercise_id', 'integer', (col) => col.references('exercises.id').notNull())
        .addColumn('base_word', 'varchar', (col) => col.notNull())
        .addColumn('case', 'varchar', (col) => col.notNull())
        .addColumn('gender', 'varchar', (col) => col.notNull())
        .addColumn('declension', 'varchar', (col) => col.notNull())
        .addColumn('number', 'varchar', (col) => col.notNull())
        .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema.alterTable('exercises')
        .dropColumn('type')
        .addColumn('base_word', 'varchar', (col) => col.notNull())
        .addColumn('case', 'varchar', (col) => col.notNull())
        .addColumn('gender', 'varchar', (col) => col.notNull())
        .addColumn('declension', 'varchar', (col) => col.notNull())
        .addColumn('number', 'varchar', (col) => col.notNull())
        .execute()

    await db.schema.dropType('noun_metadata').execute()
}
