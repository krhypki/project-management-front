<template>
  <div v-click-outside="closeDropdown" class="min-w-40">
    <span v-if="label" class="block mb-3"> {{ label }}</span>
    <button
      class="bg-transparent rounded border p-2 w-full border-white hover:border-indigo-500 text-sm flex justify-between items-center"
      type="button"
      @click="toggleDropdown"
    >
      {{ selectedDisplay.text }}
      <VIcon :name="showDropdown ? 'arrow-up' : 'arrow-down'" class="ml-auto" />
    </button>
    <div class="relative">
      <div
        v-show="showDropdown"
        class="absolute top-0 left-0 border bg-slate-900 border-white rounded-b min-w-full z-10"
      >
        <button
          v-for="option in cOptions"
          :key="option.value"
          @click="onSelect(option)"
          class="block px-2 py-2 hover:bg-white hover:text-indigo-700 w-full text-left"
          type="button"
        >
          <slot name="option" :option="option">
            {{ option.text }}
          </slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { vClickOutside } from '@/directives/v-click-outside'

interface Option {
  value: string
  text: string
}

interface Props {
  options: Option[] | string[]
  modelValue: Option | string
  label?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const showDropdown = ref(false)

const cOptions = computed(() => {
  return props.options.map((option) => {
    if (typeof option === 'string') {
      return mapStringToOption(option)
    }
    return option
  })
})

const selectedDisplay = computed(() => {
  if (typeof props.modelValue === 'string') {
    return mapStringToOption(props.modelValue)
  }
  return props.modelValue
})

const mapStringToOption = (value: string) => {
  return {
    value: value,
    text: value
  }
}

const onSelect = (option: Option) => {
  const value = typeof props.modelValue === 'string' ? option.value : option
  emit('update:modelValue', value)
  toggleDropdown()
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
  showDropdown.value = false
}
</script>
