import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely'
import { Cases, DeclensionKeys, NumberKeys } from './types/ExerciseTypes'

export interface Database {
    exercises: ExerciseTable,
    user: UserTable
    selected_exercises: SelectedExercisesTable
    user_settings: SettingsTable
    completed_exercises: CompletedExercisesTable
}

export interface UserTable {
    id: Generated<number>
    username: string
    password: string
    created_at: ColumnType<Date, string | undefined, never>
    updated_at: ColumnType<Date, string | undefined, never>
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
    case: Cases
    answer: string
    base_word: string
    gender: string
    declension: DeclensionKeys
    number: NumberKeys
    created_at: ColumnType<Date, string | undefined, never>
    updated_at: ColumnType<Date, string | undefined, never>
}

export type Exercise = Selectable<ExerciseTable>
export type ExerciseNew = Insertable<ExerciseTable>
export type ExerciseUpdate = Updateable<ExerciseTable>

export interface SelectedExercisesTable {
    selected: boolean
    user_id: number
    exercise_id: number
}

export type SelectedExercises = Selectable<SelectedExercisesTable>
export type SelectedExercisesNew = Insertable<SelectedExercisesTable>
export type SelectedExercisesUpdate = Updateable<SelectedExercisesTable>


export interface SettingsTable {
    user_id: number
    easy_mode: boolean
    alt_exercise_label: boolean
}

export type Settings = Selectable<SettingsTable>
export type SettingsNew = Insertable<SettingsTable>
export type SettingsUpdate = Updateable<SettingsTable>


export interface CompletedExercisesTable {
    user_id: number
    exercise_id: number
    created_at: ColumnType<Date, string | undefined, never>
}

export type CompletedExercises = Selectable<CompletedExercisesTable>
export type CompletedExercisesNew = Insertable<CompletedExercisesTable>
export type CompletexExercisesUpdate = Updateable<CompletedExercisesTable>

