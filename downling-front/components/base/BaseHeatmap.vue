<script setup lang="ts">
export interface HeatmapDataPoint {
  date: Date
  count: number
}

const props = defineProps<{
  data: HeatmapDataPoint[]
}>()

/* const daysInYear = (year: number) => { */
/*   const isDivisibleBy4 = year % 4 === 0 */
/*   const yearIsNotDivisibleBy100 = year % 100 > 0 */
/*   const yearIsDivisibleBy400 = year % 400 === 0 */
/**/
/*   return isDivisibleBy4 && (yearIsNotDivisibleBy100 || yearIsDivisibleBy400) ? 366 : 365 */
/* } */

function areDatesOnSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate()
  )
}

const last365Days = computed(() => {
  const acc = [[]] as HeatmapDataPoint[][]
  const today = new Date() // Get today's date

  for (let i = 0; i < 365; i++) {
    const pastDate = new Date(today) // Create a new Date object based on today
    pastDate.setDate(today.getDate() - i) // Subtract 'i' days

    if (pastDate.getDay() === 0) {
      acc[acc.length - 1].reverse() // this is stupid, also works
      acc.push([])
    }

    const dupa = props.data.find((item) => {
      const dbDate = new Date(item.date)
      return areDatesOnSameDay(dbDate, pastDate)
    })

    if (!dupa) {
      acc[acc.length - 1].push({
        date: pastDate,
        count: 0,
      })
    }
    else {
      acc[acc.length - 1].push({
        date: pastDate,
        count: Number(dupa?.count),
      })
    }
  }

  return acc.reverse()
})
</script>

<template>
  <div class="flex overflow-x-auto xl:overflow-visible">
    <div
      v-for="(j, idx) in last365Days"
      :key="idx"
      class="mr-1"
    >
      <div
        v-for="(day, dayIdx) in j"
        :key="day.toString()"
        class="h-4 w-4 mb-1"
      >
        <BaseTooltip :title="`${day.date.toDateString()} - ${day.count}`">
          <div
            class="h-4 w-4 text-xs dark:text-zinc-100 text-center border dark:border-0 border-black"
            :class="{
              'bg-white dark:bg-slate-800': day.count == 0,
              'bg-emerald-50 dark:bg-emerald-950': day.count >= 1 && day.count < 10,
              'bg-emerald-100 dark:bg-emerald-900': day.count >= 10 && day.count < 15,
              'bg-emerald-200 dark:bg-emerald-800': day.count >= 15 && day.count < 25,
              'bg-emerald-300 dark:bg-emerald-700': day.count >= 25 && day.count < 45,
              'bg-emerald-400 dark:bg-emerald-600': day.count >= 45 && day.count < 65,
              'bg-emerald-500 dark:bg-emerald-500': day.count >= 65 && day.count < 75,
              'bg-emerald-800 dark:bg-emerald-400': day.count >= 75,
              'bg-emerald-900 dark:bg-emerald-300': day.count >= 90,
            }
            "
          />
        </BaseTooltip>
      </div>
    </div>
  </div>
</template>
