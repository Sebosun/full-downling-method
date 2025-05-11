import { Kysely } from 'kysely'
import { Database } from '@/db_types'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema
        .alterTable('exercises')
        .addColumn('case', 'varchar', (col) => col.notNull())
        .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema.alterTable('exercises').dropColumn('case').execute()
}
