<template>
  <VSelect v-model="cModelValue" :options="options" @update:modelValue="onSelect" />
</template>

<script setup lang="ts">
import axios from 'axios'
import { nextTick } from 'process'
import { computed } from 'vue'
import { useTaskStore } from '@/stores/task'

interface Props {
  options: string[]
  modelValue: string
  apiProperty: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const taskStore = useTaskStore()

const cModelValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

const onSelect = async () => {
  await nextTick(() => {
    updateData()
  })

  const updateData = async () => {
    try {
      await axios.patch('/api/tasks/mk1', {
        [props.apiProperty]: cModelValue.value
      })
      taskStore.updateAlert(`${props.apiProperty} has been updated`, 'success')
    } catch (err) {
      taskStore.updateAlert(err, 'error')
    }
  }
}
</script>
