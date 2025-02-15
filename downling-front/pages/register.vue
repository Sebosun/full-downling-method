<script setup lang="ts">
const step = ref<'register' | 'post-register'>('register')
</script>

<template>
  <BaseCard>
    <div class="grid gap-4 justify-center p-10 max-w-2xl">
      <ViewsRegisterForm
        v-if="step === 'register'"
        @success="step = 'post-register'"
      />
      <div v-else-if="step === 'post-register'">
        <div class="mb-4">
          <p class="text-center mb-4">
            Congratulations!
          </p>
          <p>
            You have successfully registered.
          </p>
        </div>

        <div class="flex justify-center">
          <NuxtLink
            class="text-center"
            to="/login"
          >
            <BaseButton>
              Go back to login
            </BaseButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
