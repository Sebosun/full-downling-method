<script setup lang="ts">

type LoginForm = {
  username: string
  password: string
}

const form = ref<LoginForm>({
  username: '',
  password: ''
})

const API_LINK = "http://localhost:3000";
const store = useUserStore()
const { token } = storeToRefs(store)

const submit = async () => {
  try {
    const response = await $fetch<{ token: string }>(API_LINK + "/login", {
      method: "POST",
      body: form.value
    });
    token.value = response.token
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
