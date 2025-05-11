import { Kysely } from 'kysely'
import { Database } from '@/db_types'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema
        .alterTable('user_settings')
        .addColumn('alt_exercise_label', 'boolean', (col) => col.notNull().defaultTo(false))
        .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema
        .alterTable('user_settings')
        .dropColumn('alt_exercise_label')
        .execute()
}

