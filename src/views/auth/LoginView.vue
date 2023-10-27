<script setup lang="ts">
import { SignIn } from 'vue-clerk'
const AfterSignUpUrl = import.meta.env.VITE_PUBLIC_AFTER_SIGN_UP_URL
const AfterSignInUrl= import.meta.env.VITE_PUBLIC_AFTER_SIGN_IN_URL
</script>

<template>
  <SignIn 
    :afterSignUpUrl="AfterSignUpUrl" 
    :afterSignInUrl="AfterSignInUrl"
  />
</template>