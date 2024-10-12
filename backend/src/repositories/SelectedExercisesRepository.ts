import { db } from '@/database'
import { SelectedExercises } from '@/types'


export async function upsertSelectedExercises(values: SelectedExercises[]) {
  return await db.insertInto('selected_exercises')
    .values(values)
    .returningAll()
    .onConflict((oc) =>
      oc.column("exercise_id").column('user_id').doUpdateSet({
        selected: cb => cb.ref('excluded.selected')
      })
    )
    .execute()
}

export async function getSelectedExercises(user_id: number) {
  return await db.selectFrom('selected_exercises')
    .where('user_id', '=', user_id)
    .select(['exercise_id', 'selected'])
    .execute()
}
