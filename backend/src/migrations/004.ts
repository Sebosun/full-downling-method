import { Kysely } from 'kysely'
import { Database } from '@/db_types'

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('selected_exercises')
    .addColumn('selected', 'boolean', col => col.notNull().defaultTo(false))
    .addColumn('user_id', 'integer', (col) =>
      col.references('user.id').onDelete('cascade').notNull()
    )
    .addColumn('exercise_id', 'integer', (col) =>
      col.references('exercises.id').onDelete('cascade').notNull()
    )
    .addPrimaryKeyConstraint('primary_key', ['exercise_id', 'user_id'])
    .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
  await
    db.schema.dropTable('selected_exercises').execute()
}

