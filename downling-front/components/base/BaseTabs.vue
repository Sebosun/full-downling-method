<script setup lang="ts">
import { ref, watch } from 'vue';
import type { LocationQueryValue } from 'vue-router';

type Tabs = {
  key: string;
  label: string;
  component: Object
};

const props = defineProps<{ tabs: Tabs[] }>();

// We are assuming the first element in
// array is the one we want user to see first
const active = ref(props.tabs[0].key);

const handleSelectTab = (tabKey: string) => {
  active.value = tabKey;
};

const router = useRouter();

const route = useRoute();

watch(active, async (newVal) => {
  if (newVal !== props.tabs[0].key) {
    router.replace({ query: { tab: active.value } });
  } else {
    router.replace('');
  }
});

const checkRoute = () => {
  const { query } = route;
  const queryString = getQueryStringValue(query.tab);

  const isInTabs = props.tabs.find((item) => item.key === queryString);
  if (queryString && queryString != props.tabs[0].key && isInTabs) {
    active.value = queryString;
  }
}


const getQueryStringValue = (queryValue: LocationQueryValue | LocationQueryValue[]): string | undefined => {
  if (Array.isArray(queryValue)) return queryValue[0] || undefined;
  return queryValue || undefined;
};

onMounted(() => {
  const { query } = route;
  const queryString = getQueryStringValue(query.tab);

  const isInTabs = props.tabs.find((item) => item.key === queryString);
  if (queryString && queryString != props.tabs[0].key && isInTabs) {
    active.value = queryString;
  }
});
</script>

<template>
  <div role="tabpanel">
    <nav>
      <ul class="flex gap-4 max-w-fit mb-4 py-1 px-0 justify-center items-center mx-auto">
        <li class="dark:border-zinc-200 border rounded-sm p-2 cursor-pointer" @click="handleSelectTab(tab.key)"
          v-for="tab in tabs" :class="{ 'dark:bg-zinc-200 dark:text-black gumroadish': active === tab.key }"
          :key="tab.key">
          {{ tab.label }}
        </li>
      </ul>
    </nav>

    <template v-for="tab in tabs" :key="tab.key">
      <template v-if="active === tab.key">
        <component :is="tab.component" />
      </template>
    </template>
  </div>
</template>
<style>
.gumroadish {
  transition: all;
  transition-duration: 0.2s;
  /* transform: translate(-0.25rem, -0.25rem); */
  box-shadow: 0.25rem 0.25rem 0rem var(--color-brand);
}
</style>
