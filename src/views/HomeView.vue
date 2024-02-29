<template>
  <component :is="currentView" />
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed, onMounted } from 'vue'
import UnauthorizedView from './UnauthorizedView.vue'
import DashboardView from './DashboardView.vue'

const { token } = useAuthStore()

const currentView = computed(() => (token ? DashboardView : UnauthorizedView))
</script>
