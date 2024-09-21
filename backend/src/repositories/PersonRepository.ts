import { db } from '@/database'
import { User, UserUpdate, UserNew } from '@/types'

export async function findUserById(id: number) {
  return await db.selectFrom('user')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findUser(criteria: Partial<User>) {
  let query = db.selectFrom('user')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
  }

  if (criteria.username) {
    query = query.where('username', '=', criteria.username)
  }

  if (criteria.created_at) {
    query = query.where('created_at', '=', criteria.created_at)
  }

  if (criteria.updated_at) {
    query = query.where('created_at', '=', criteria.updated_at)
  }

  return await query.selectAll().execute()
}

export async function updateUser(id: number, updateWith: UserUpdate) {
  await db.updateTable('user').set(updateWith).where('id', '=', id).execute()
}

export async function createUser(person: UserNew) {
  return await db.insertInto('user')
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function deleteUser(id: number) {
  return await db.deleteFrom('user').where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}
