import { db } from '@/database'
import { User, UserUpdate, UserNew } from '@/db_types'

export async function findUserById(id: number) {
  return await db.selectFrom('user')
    .where('id', '=', id)
    .select(['id', 'username', 'created_at', 'updated_at'])
    .executeTakeFirst()
}

export async function findUser(username: string) {
  return await db.selectFrom('user')
    .where('username', '=', username)
    .selectAll()
    .executeTakeFirst()
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

export async function findAllUsers(): Promise<Omit<User, 'password'>[]> {
  return await db.selectFrom('user')
    .select(['id', 'username', 'created_at', 'updated_at'])
    .execute()
}
