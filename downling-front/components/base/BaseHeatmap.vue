<script setup lang="ts">
const daysInYear = (year: number) => {
  const isDivisibleBy4 = year % 4 === 0
  const yearIsNotDivisibleBy100 = year % 100 > 0
  const yearIsDivisibleBy400 = year % 400 === 0

  return isDivisibleBy4 && (yearIsNotDivisibleBy100 || yearIsDivisibleBy400) ? 366 : 365
}

interface DataPoint {
  date: Date
  value: number
}

const days = (year: number) => {
  const acc = [] as DataPoint[][]
  const TOTAL_WEEKS = 53 // 52 + 1 for "remainder" days
  const d = daysInYear(year)

  const weeks = Array.from(Array(TOTAL_WEEKS))

  for (let i = 0; i < weeks.length; i++) {
    const days = [] as DataPoint[]

    for (let j = 1; j <= 7; j++) {
      const date = new Date(year, 0)
      const dayOfYear = i * 7 + j
      if (dayOfYear > d) break
      date.setDate(dayOfYear)
      let lowest = 100
      for (let i = 0; i < 3; i++) {
        const value = Math.floor(Math.random() * 100)
        if (value < lowest) {
          lowest = value
        }
      }

      days.push({ date, value: lowest })
    }
    acc.push(days)
  }

  return acc
}
</script>

<template>
  <div class="flex overflow-x-auto xl:overflow-visible">
    <div
      v-for="(j, idx) in days(2024)"
      :key="idx"
      class="mr-1"
    >
      <div
        v-for="(day, dayIdx) in j"
        :key="day.toString()"
        class="h-4 w-4 mb-1"
      >
        <BaseTooltip :title="`${day.date.toDateString()} - ${day.value}`">
          <div
            class="h-4 w-4 text-xs dark:text-zinc-100 text-center border dark:border-0 border-black"
            :class="{
              'bg-white dark:bg-slate-950': day.value == 0,
              'bg-emerald-50 dark:bg-emerald-950': day.value >= 1 && day.value < 10,
              'bg-emerald-100 dark:bg-emerald-900': day.value >= 10 && day.value < 15,
              'bg-emerald-200 dark:bg-emerald-800': day.value >= 15 && day.value < 25,
              'bg-emerald-300 dark:bg-emerald-700': day.value >= 25 && day.value < 45,
              'bg-emerald-400 dark:bg-emerald-600': day.value >= 45 && day.value < 65,
              'bg-emerald-500 dark:bg-emerald-500': day.value >= 65 && day.value < 75,
              'bg-emerald-800 dark:bg-emerald-400': day.value >= 75,
              'bg-emerald-900 dark:bg-emerald-300': day.value >= 90,
            }
            "
          />
        </BaseTooltip>
      </div>
    </div>
  </div>
</template>
