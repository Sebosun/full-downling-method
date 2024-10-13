<script setup lang="ts">
import type { LoginForm } from '@/types/UserTypes'
import { login } from '~/helpers/client/fetch';

const form = ref<LoginForm>({
  username: '',
  password: ''
})

const runtimeConfig = useRuntimeConfig()
const store = useUserStore()

const submit = async () => {
  try {
    const result = await login(form.value)
    if (!result) return
    store.saveToken(result.token)
    navigateTo('/exercises')
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="grid gap-4 justify-center">
    <BaseInput placeholder="username" v-model:input="form.username" />

    <BaseInput type="password" placeholder="password" v-model:input="form.password" />
    <BaseButton @click="submit">
      Submit
    </BaseButton>
  </div>
</template>
