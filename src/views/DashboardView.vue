<template>
  <VSection>
    <div class="max-w-xl mx-auto">
      <VHeading tag="h2">Reported tasks</VHeading>
      <TaskTable :tasks="reportedTasks" class="mb-20" />
      <VHeading tag="h2">Assigneed tasks</VHeading>
      <TaskTable :tasks="assignedTasks" />
    </div>
  </VSection>
</template>
<script lang="ts" setup>
import type { Task } from '@/types/Task'
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const reportedTasks = ref<Task[]>([])
const assignedTasks = ref<Task[]>([])

onBeforeMount(async () => {
  try {
    const { data } = await axios.get('/api/users/current-user')

    reportedTasks.value = data.reportedTasks
    assignedTasks.value = data.assignedTasks
  } catch (err) {
    router.push({ name: 'not-found' })
  }
})
</script>
