<template>
  <VContainer class="pt-10">
    <VHeading tag="h1" class="text-center">List of all projects</VHeading>
    <VTable>
      <thead>
        <VTr>
          <VTh>Name</VTh>
          <VTh>Code</VTh>
          <VTh>Owner</VTh>
        </VTr>
      </thead>
      <tbody>
        <VTr
          v-for="{ name, code, owner } in projects"
          :key="code"
          hoverable
          @click="navigateToProjectPage(code)"
        >
          <VTd>
            {{ name }}
          </VTd>
          <VTd>
            {{ code }}
          </VTd>
          <VTd>
            {{ `${owner.firstName} ${owner.lastName}` }}
          </VTd>
        </VTr>
      </tbody>
    </VTable>
  </VContainer>
</template>
<script setup lang="ts">
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
import { type Project } from '@/types/Project'
import { useRouter } from 'vue-router'

const router = useRouter()
const projects = ref<Project[]>([])

onBeforeMount(async () => {
  try {
    const { data } = await axios.get('/api/projects')

    projects.value = data
  } catch (err) {
    console.log(err)
  }
})

const navigateToProjectPage = (code: string) => {
  router.push({ name: 'project', params: { code: code.toLowerCase() } })
}
</script>
