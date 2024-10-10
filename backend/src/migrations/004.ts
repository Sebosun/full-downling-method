import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('user')
    .addColumn('settings', 'json')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await
    db.schema.alterTable('exercises').dropColumn('settings').execute()
}

