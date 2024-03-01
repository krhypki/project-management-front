<template>
  <label :for="name">
    {{ label }}
  </label>
  <textarea
    :id="name"
    :name="name"
    :value="modelValue"
    @input="updateValue"
    class="bg-transparent border-2 border-white rounded outline-none focus:border-indigo-500 p-2"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  name: string
}

defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}
</script>
