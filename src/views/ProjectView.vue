<template>
  <VSection v-if="project">
    <VHeading tag="h1" class="text-center">{{ project.name }}</VHeading>
    <VHeading tag="h2" variant="h3" class="text-center">
      Owner:
      <span class="block text-indigo-500"> {{ project.owner.email }}</span>
    </VHeading>
    <TaskTable v-if="project.tasks.length" :tasks="project.tasks" />
    <h3 v-else>No task found in the project.</h3>
  </VSection>
</template>

<script lang="ts" setup>
import type { Project } from '@/types/Project'
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const project = ref<Project>()

onBeforeMount(async () => {
  try {
    const { data } = await axios.get(`/api/projects/${route.params.code}`)
    project.value = data
  } catch {
    router.push({ name: 'not-found' })
  }
})
</script>
