<template>
  <VSection>
    <div class="flex items-center justify-between mb-20">
      <VHeading tag="h1" class="mb-0"> List of all tasks</VHeading>
      <VButton>Create new</VButton>
    </div>
    <TaskTable :tasks="tasks" />
  </VSection>
</template>

<script setup lang="ts">
import type { Task } from '@/types/Task'
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tasks = ref<Task>([])

onBeforeMount(async () => {
  try {
    const { data } = await axios.get('/api/tasks')

    tasks.value = data
  } catch (err) {
    router.push({ name: 'not-found' })
  }
})
</script>
