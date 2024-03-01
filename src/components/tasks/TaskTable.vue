<template>
  <VTable>
    <thead>
      <VTr>
        <VTh></VTh>
        <VTh> Name </VTh>
        <VTh> Reporter </VTh>
        <VTh> Assignee </VTh>
        <VTh> Status </VTh>
      </VTr>
    </thead>
    <tbody>
      <VTr v-for="task in tasks" :key="task.code" hoverable @click="navigateToTask(task.code)">
        <VTd>
          {{ task.code }}
        </VTd>
        <VTd>
          {{ task.name }}
        </VTd>
        <VTd>
          {{ typeof task.reporter === 'string' ? task.reporter : task.reporter.email }}
        </VTd>
        <VTd>
          {{ typeof task.assignee === 'string' ? task.assignee : task.assignee?.email }}
        </VTd>
        <VTd>
          {{ task.status }}
        </VTd>
      </VTr>
    </tbody>
  </VTable>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task'
import { useRouter } from 'vue-router'

interface Props {
  tasks: Task[]
}

defineProps<Props>()
const router = useRouter()

const navigateToTask = (code: string) => {
  router.push({ name: 'task', params: { code: code.toLowerCase() } })
}
</script>
