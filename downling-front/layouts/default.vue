<template>
  <div class="min-h-screen bg-slate-950 text-zinc-200">
    <header
      class="bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50 lg:mb-0 lg:border-0">
      <div class="mx-auto max-w-7xl flex items-center justify-between gap-3 h-[4rem]">
        <div> Menu </div>
        <ul class="flex gap-8">
          <li> Main </li>
          <li> Dupa </li>
        </ul>
      </div>
    </header>
    <main class="mx-auto max-w-7xl">
      <slot />
    </main>
  </div>
</template>
