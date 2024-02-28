<template>
  <div>
    <label v-if="label" :for="name" class="block mb-2"> {{ label }}</label>
    <input
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      class="rounded w-full border-2 bg-transparent px-2 py-1.5 outline-none focus:border-indigo-500"
      :class="{ 'border-red-400': errorMessage, 'px-2 py-3': lg }"
    />
    <p v-show="errorMessage" class="text-red-400 text-sm">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

interface Props {
  type?: string
  value?: string
  name: string
  label?: string
  placeholder?: string
  lg?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  lg: false
})

const {
  value: inputValue,
  handleBlur,
  handleChange,
  errorMessage
} = useField(props.name, undefined, {
  initialValue: props.value
})
</script>
