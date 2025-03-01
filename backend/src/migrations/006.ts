import { Kysely, sql } from 'kysely'
import { Database } from '@/db_types'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema
        .createTable('completed_exercises')
        .addColumn('user_id', 'integer', (col) => col.references('user.id').onDelete('cascade').notNull())
        .addColumn('exercise_id', 'integer', (col) => col.references('exercises.id').notNull())
        .addColumn('created_at', 'varchar', (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
        )
        .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await
        db.schema.dropTable('completed_exercises').execute()
}

