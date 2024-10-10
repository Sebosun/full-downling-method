import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
  JSONColumnType
} from 'kysely'
import { DeclensionKeys, NumberKeys, GenderType, } from './types/ExerciseTypes'

export interface Database {
  exercises: ExerciseTable,
  user: UserTable
}

export interface UserTable {
  id: Generated<number>
  username: string
  password: string
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
  settings: JSONColumnType<{
    exercises: number[]
  }> | null
}



// You should not use the table schema interfaces directly. Instead, you should
// use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// make sure that the correct types are used in each operation.
//
// Most of the time you should trust the type inference and not use explicit
// types at all. These types can be useful when typing function arguments.
export type User = Selectable<UserTable>
export type UserNew = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>


export interface ExerciseTable {
  id: Generated<number>
  question: string
  answer: string
  base_word: string
  gender: GenderType
  declension: DeclensionKeys
  number: NumberKeys
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}


export type Exercise = Selectable<ExerciseTable>
export type ExerciseNew = Insertable<ExerciseTable>
export type ExerciseUpdate = Updateable<ExerciseTable>
