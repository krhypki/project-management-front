<template>
  <VSection v-if="task">
    <VAlert
      v-show="taskStore.alertMessage"
      :variant="taskStore.alertVariant"
      class="mb-12 max-w-80 mx-auto"
    >
      {{ taskStore.alertMessage }}
    </VAlert>
    <div class="flex justify-center">
      <div class="basis-1/4">
        <VHeading tag="h1">{{ `${task.code} ${task.name}` }}</VHeading>
        <p class="text-lg">
          {{ task.desc }}
        </p>
      </div>
      <div class="basis-1/6">
        <TaskPropertySelect
          v-model="reporter"
          :options="users"
          api-property="reporter"
          label="Reporter"
          class="mb-8"
        />
        <TaskPropertySelect
          v-model="assignee"
          :options="users"
          api-property="assignee"
          label="Assignee"
          class="mb-8"
        />

        <TaskPropertySelect
          v-model="status"
          :options="['Created', 'In Progress', 'Done']"
          api-property="status"
          label="Status"
        />
      </div>
    </div>

    <div class="flex justify-center mt-24">
      <VButton @click="router.go(-1)" size="lg">Go back</VButton>
    </div>
  </VSection>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task'
import type { Task, TaskStatus } from '@/types/Task'
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const taskStore = useTaskStore()

const task = ref<Task>()
const users = ref<string[]>([])
const reporter = ref<string>()
const assignee = ref<string>()
const status = ref<TaskStatus>('Created')

onBeforeMount(async () => {
  try {
    const { data: taskData } = await axios.get(`/api/tasks/${route.params.code}`)
    const { data: usersList } = await axios.get('/api/users')

    reporter.value = taskData.reporter.email
    assignee.value = taskData.assignee.email
    task.value = taskData
    users.value = usersList
    status.value = taskData.status
  } catch (err) {
    router.push({ name: 'not-found' })
  }
})
</script>
