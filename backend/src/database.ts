import { Database } from '@/db_types' // this is the Database interface we defined earlier
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

import { configDotenv } from "dotenv";

configDotenv()

const DB_PASSWORD = process.env.DB_PASSWORD
const DB_PORT = process.env.DB_PORT
const DB_DATABASE = process.env.DB_DATABASE
const DB_USER = process.env.DB_USER

if (!(DB_PASSWORD || DB_PORT || DB_DATABASE || DB_USER)) {
  throw new Error('Database .envs are not set')
}

const dialect = new PostgresDialect({
  pool: new Pool({
    database: DB_DATABASE,
    password: DB_PASSWORD,
    user: DB_USER,
    port: Number(DB_PORT),
    host: 'localhost',
    max: 10,
  })
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
})
