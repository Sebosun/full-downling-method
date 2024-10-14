<script setup lang="ts">
import type { LoginForm } from '@/types/UserTypes'
import { register } from '~/helpers/client/fetch';

const form = ref<LoginForm>({
  username: '',
  password: ''
})

const isError = ref<boolean>(false)

const submit = async () => {
  try {
    await register(form.value)
    navigateTo('/')
  } catch (e) {
    isError.value = true
    console.error(e)
  }
}
</script>

<template>
  <BaseCard>
    <div class="grid gap-4 justify-center p-10 max-w-2xl">
      <h1 class="text-center">
        Register
      </h1>
      <div class="text-center text-sm text-red-500" v-if="isError">
        User already exists or some of the values are incorrect
      </div>
      <BaseInput placeholder="username" v-model:input="form.username" />
      <BaseInput type="password" placeholder="password" v-model:input="form.password" />
      <BaseButton @click="submit">
        Submit
      </BaseButton>
    </div>
  </BaseCard>
</template>
