import { db } from '@/database'
import { User, UserUpdate, UserNew } from '@/types'

export async function findUserById(id: number) {
  return await db.selectFrom('user')
    .where('id', '=', id)
    .selectAll()
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
