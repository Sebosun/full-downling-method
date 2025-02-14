import { Database } from '@/types'
import { parseNouns } from './parseNouns'
import { Pool } from 'pg'
import {
    Kysely,
    PostgresDialect,
} from 'kysely'
// Keep imports there relative

const DB_PASSWORD = process.env.DB_PASSWORD
const DB_PORT = process.env.DB_PORT
const DB_DATABASE = process.env.DB_DATABASE
const DB_USER = process.env.DB_USER

if (!(DB_PASSWORD || DB_PORT || DB_DATABASE || DB_USER)) {
    throw new Error('Database .envs are not set')
}

const db = new Kysely<Database>({
    dialect: new PostgresDialect({
        pool: new Pool({
            database: DB_DATABASE,
            password: DB_PASSWORD,
            user: DB_USER,
            port: Number(DB_PORT),
            host: 'localhost',
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
