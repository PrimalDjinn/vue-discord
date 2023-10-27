<script setup lang="ts">
import { SignUp } from 'vue-clerk'
const AfterSignUpUrl = import.meta.env.VITE_PUBLIC_AFTER_SIGN_UP_URL
const AfterSignInUrl= import.meta.env.VITE_PUBLIC_AFTER_SIGN_IN_URL
</script>

<template>
  <SignUp 
    :afterSignUpUrl="AfterSignUpUrl" 
    :afterSignInUrl="AfterSignInUrl"
  />
  />
</template>