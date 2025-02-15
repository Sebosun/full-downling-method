<script setup lang="ts">
import type { LoginForm } from '@/types/UserTypes'
import type { ValidationPair } from '@/composables/useValidate'
import { register } from '~/helpers/client/fetch'

const form = ref<LoginForm>({
  username: '',
  password: '',
})

const emit = defineEmits<{
  (event: 'success'): void
}>()

const submitCount = ref<number>(0)
const isFetchError = ref<boolean>(false)
const { checkStringValidity } = useValidate()

const isPasswordValid = computed<ValidationPair>(() => {
  return checkStringValidity(form.value.password, {
    minLength: 4,
    maxLength: 99,
    hasCapitalCaseLetters: true,
    hasLowerCaseLetters: true, hasNumerals: true,
  })
})

const isUsernameValid = computed<ValidationPair>(() => {
  return checkStringValidity(form.value.username, {
    minLength: 2,
    maxLength: 99,
  })
})

const showErrors = computed(() => {
  return submitCount.value > 0
})

const showPasswordErrors = computed(() => {
  return showErrors.value && !isPasswordValid.value.isValid
})

const showUsernameErrors = computed(() => {
  return showErrors.value && !isUsernameValid.value.isValid
})

const canSubmit = computed<boolean>(() => {
  const passwordOk = isPasswordValid.value.isValid
  const usernameOk = isUsernameValid.value.isValid

  return passwordOk && usernameOk
})

const submit = async () => {
  submitCount.value++
  if (!canSubmit.value) {
    return
  }
  try {
    await register(form.value)
    emit('success')
  }
  catch (e) {
    isFetchError.value = true
    console.error(e)
  }
}
</script>

<template>
  <h1 class="text-center">
    Register
  </h1>
  <div
    v-if="isFetchError"
    class="text-center text-sm text-red-500"
  >
    User already exists or some of the values are incorrect
  </div>
  <div>
    <BaseInput
      v-model:input="form.username"
      label="Username"
      name="username"
      placeholder="username"
    />
    <div
      v-if="showUsernameErrors"
      class="text-lg text-red-500 mt-2"
    >
      {{ isUsernameValid.message }}
    </div>
  </div>

  <div>
    <BaseInput
      v-model:input="form.password"
      label="Password"
      name="password"
      type="password"
      placeholder="password"
    />
    <div
      v-if="showPasswordErrors"
      class="text-lg text-red-500 mt-2"
    >
      {{ isPasswordValid.message }}
    </div>
  </div>
  <BaseButton @click="submit">
    Submit
  </BaseButton>
</template>
