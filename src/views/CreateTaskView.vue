<template>
  <VSection>
    <div class="max-w-screen-sm mx-auto">
      <VAlert v-show="errorMessage" variant="error" class="mb-8">{{ errorMessage }}</VAlert>
      <VHeading tag="h1">Create new task</VHeading>
      <form class="grid gap-y-6" @submit.prevent="onSubmit">
        <VInput v-model="formData.name" name="taskName" label="Name" />
        <VTextarea v-model="formData.desc" name="taskDesc" label="Description" />
        <VSelect
          v-model="formData.status"
          :options="['Created', 'In Progress', 'Done']"
          label="Status"
        />
        <VSelect v-model="formData.project" :options="projects" label="Project" />
        <VSelect v-model="formData.reporter" :options="users" label="Reporter" />
        <VSelect v-model="formData.assignee" :options="users" label="Assignee" class="mb-10" />
        <VButton type="submit" size="lg">Create task</VButton>
      </form>
    </div>
  </VSection>
</template>
<script lang="ts" setup>
import type { Project } from '@/types/Project'
import axios from 'axios'
import { onBeforeMount, reactive, ref } from 'vue'
import type { Task } from '@/types/Task'
import { useRouter } from 'vue-router'

const router = useRouter()
const projects = ref<string[]>([])
const users = ref<string[]>([])
const formData = reactive<Task>({
  name: 'name',
  desc: '',
  status: 'Created',
  reporter: '',
  assignee: '',
  project: ''
})
const errorMessage = ref('')

onBeforeMount(async () => {
  try {
    const { data: projectsData } = await axios.get('/api/projects')
    const { data: usersData } = await axios.get('/api/users')

    projects.value = projectsData.map((project: Project) => project.code)
    users.value = usersData
    formData.project = projects.value[0]
  } catch (err) {
    console.log(err)
  }
})

const onSubmit = async () => {
  try {
    const { data: task } = await axios.post('/api/tasks', {
      ...formData
    })

    router.push({ name: 'task', params: { code: task.code } })
  } catch (err) {
    if (axios.isAxiosError(err)) {
      errorMessage.value = err.response?.data.message[0]
    }
  }
}
</script>
