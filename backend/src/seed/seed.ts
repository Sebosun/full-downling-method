import { Database } from '@/types'
import { parseNouns } from './parseNouns'
import { Pool } from 'pg'
import {
  Kysely,
  PostgresDialect,
} from 'kysely'
// Keep imports there relative

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: 'test',
      host: 'localhost',
      password: 'postgres',
      user: 'sebastian',
      port: 5432,
      max: 10,
    }),
  }),
})

export async function seedExercises(db: Kysely<Database>): Promise<void> {
  const nouns = parseNouns()

  for (const key of nouns) {
    try {

      await db.insertInto('exercises')
        .values(key)
        .returningAll()
        .executeTakeFirstOrThrow()
    } catch (e) {
      console.error(e)
      throw new Error("Seed failed")
    }
  }
  console.log("All seeds completed")
}

seedExercises(db)
