<template>
  <header class="bg-slate-950 px-4 py-3 sticky top-0">
    <nav class="flex justify-between">
      <RouterLink :to="{ name: 'home' }">
        <img :src="logo" alt="logo" class="w-10" />
      </RouterLink>

      <RouterLink v-for="{ name, text } in links" :key="name" :to="{ name }">
        {{ text }}</RouterLink
      >

      <VButton v-if="auth.token" variant="secondary" @click="auth.logout">Logout</VButton>
    </nav>
  </header>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.svg'
import { useAuthStore } from '@/stores/auth'

interface NavLink {
  name: string
  text: string
}

const auth = useAuthStore()
const links: NavLink[] = [
  {
    name: 'account',
    text: 'Account'
  }
]
</script>
