<script setup lang="ts">
import type { LoginForm } from '@/types/UserTypes'
import { register } from '~/helpers/client/fetch';

interface PasswordValidatorOptions {
  minLength?: number
  maxLength?: number
  hasCapitalCaseLetters?: boolean
  hasLowerCaseLetters?: boolean
  hasNumerals?: boolean
}

type ValidationPair = {
  isValid: boolean
  message: string
};

const form = ref<LoginForm>({
  username: '',
  password: '',
})
const submitCount = ref<number>(0)

const isError = ref<boolean>(false)

const checkStringValidity = (password: string, options: PasswordValidatorOptions): ValidationPair => {
  if (options.minLength && password.length < options.minLength) {
    return { isValid: false, message: `Fields length is lower than required minimum of ${options.minLength}` }
  }

  if (options.maxLength && password.length > options.maxLength) {
    return { isValid: false, message: `Fields length is larger than required maximum of ${options.maxLength}` }
  }

  if (options.hasLowerCaseLetters) {
    const re = /[a-z]/
    const is = new RegExp(re).test(password)
    if (!is) {
      return { isValid: false, message: `Field does not include small characters` }
    }
  }

  if (options.hasCapitalCaseLetters) {
    const re = /[A-Z]/
    const is = new RegExp(re).test(password)
    if (!is) {
      return { isValid: false, message: `Field does not include capital letters` }
    }
  }

  if (options.hasNumerals) {
    const re = /[0-9]/
    const is = new RegExp(re).test(password)
    if (!is) {
      return { isValid: false, message: `Field does not include numeric values` }
    }
  }

  return { isValid: true, message: `` }
}

const isPasswordValid = computed<ValidationPair>(() => {
  return checkStringValidity(form.value.password, {
    minLength: 4,
    maxLength: 99,
    hasCapitalCaseLetters: true,
    hasLowerCaseLetters: true,
    hasNumerals: true
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
      <div>
        <BaseInput placeholder="username" v-model:input="form.username" />
        <div class="text-sm text-red-500 mt-2" v-if="showErrors && !isUsernameValid.isValid">
          {{ isUsernameValid.message }}
        </div>
      </div>

      <div>
        <BaseInput type="password" placeholder="password" v-model:input="form.password" />
        <div class="text-sm text-red-500 mt-2" v-if="showErrors && !isUsernameValid.isValid">
          {{ isPasswordValid.message }}
        </div>
      </div>
      <BaseButton @click="submit">
        Submit
      </BaseButton>
    </div>
  </BaseCard>
</template>
