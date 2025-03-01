import { Database } from '@/db_types'
import { parseNouns } from './parseNouns'
import { Pool } from 'pg'
import {
    Kysely,
    PostgresDialect,
} from 'kysely'
import { encryptPassword } from '@/helpers/encryptPassword'
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
    const users = [{ username: 'admin', password: 'admin' }]

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

    try {
        // Silly way to seed users
        // But works for now
        let idx = 1;
        for (const user of users) {
            const hashedPasswd = await encryptPassword(user.password)
            await db.insertInto('user')
                .values({
                    username: user.username,
                    password: hashedPasswd,
                })
                .execute()

            await db.insertInto('user_settings')
                .values({
                    user_id: idx,
                    easy_mode: false,
                })
                .execute()
            idx++;
        }
    } catch (e) {
        console.error(e)
        throw new Error("Seed failed")
    }
    console.log("All seeds completed")
}

seedExercises(db)
