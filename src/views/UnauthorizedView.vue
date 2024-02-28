<template>
  <main class="h-full flex flex-col align-stretch max-w-80 w-full justify-center mx-auto px-4">
    <VButton :to="{ name: 'login' }" size="lg" class="mb-6">Login</VButton>
    <VButton :to="{ name: 'register' }" size="lg" variant="secondary">Create Account</VButton>
  </main>
</template>
