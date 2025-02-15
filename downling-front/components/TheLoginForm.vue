<script setup lang="ts">
import type { LoginForm } from '@/types/UserTypes'
import { login } from '~/helpers/client/fetch'

const form = ref<LoginForm>({
  username: '',
  password: '',
})

const error = ref<boolean>(false)
const store = useUserStore()

const submit = async () => {
  error.value = false
  try {
    const result = await login(form.value)
    if (!result) return
    store.saveToken(result.token)
    navigateTo('/exercises')
  }
  catch {
    error.value = true
  }
}
</script>

<template>
  <div class="grid gap-4 justify-center p-4">
    <DumbError
      v-if="error"
      tag="div"
      class="mx-auto"
    >
      Username is wrong or missing
    </DumbError>
    <BaseInput
      v-model:input="form.username"
      name="username"
      placeholder="username"
    />

    <BaseInput
      v-model:input="form.password"
      name="password"
      type="password"
      placeholder="password"
    />

    <BaseButton @click="submit">
      Submit
    </BaseButton>

    <NuxtLink
      class="text-sm text-center"
      to="/register"
    >
      Dont have an account? <span class="underline">Register here</span>
    </NuxtLink>
  </div>
</template>
