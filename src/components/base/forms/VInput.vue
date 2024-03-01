<template>
  <div>
    <label v-if="label" :for="name" class="block mb-2"> {{ label }}</label>
    <input
      :id="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateValue"
      class="rounded w-full border-2 bg-transparent px-2 py-1.5 outline-none focus:border-indigo-500"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: string
  modelValue: string
  name: string
  label?: string
  placeholder?: string
  lg?: boolean
}
const emit = defineEmits(['update:modelValue'])
withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  lg: false
})

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
