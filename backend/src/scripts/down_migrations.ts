import * as path from 'path'
import { Pool } from 'pg'
import { promises as fs } from 'fs'
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from 'kysely'
// Keep imports there relative
import { Database } from '../types'

const DB_PASSWORD = process.env.DB_PASSWORD
const DB_PORT = process.env.DB_PORT
const DB_DATABASE = process.env.DB_DATABASE
const DB_USER = process.env.DB_USER

if (!(DB_PASSWORD || DB_PORT || DB_DATABASE || DB_USER)) {
  throw new Error('Database .envs are not set')
}

async function migrateToLatest() {
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

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, '../migrations'),
    }),
  })

  const { error, results } = await migrator.migrateDown()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`DOWN migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

migrateToLatest()
