<template>
  <div v-click-outside="closeDropdown" class="min-w-40">
    <button
      class="bg-transparent rounded border p-2 w-full border-white hover:border-indigo-500 text-sm flex justify-between items-center"
      @click="toggleDropdown"
    >
      {{ modelValue.text }}
      <VIcon :name="showDropdown ? 'arrow-up' : 'arrow-down'" />
    </button>
    <div class="relative">
      <div
        v-show="showDropdown"
        class="absolute top-0 left-0 border border-white rounded-b border-t-0 rounded- w-full"
      >
        <button
          v-for="option in options"
          :key="option.value"
          @click="onSelect(option)"
          class="block px-2 py-2 hover:bg-white hover:text-indigo-700 w-full text-left"
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
import { ref } from 'vue'
import { vClickOutside } from '@/directives/v-click-outside'

interface Option {
  value: string
  text: string
}

interface Props {
  options: Option[]
  modelValue: Option
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:modelValue'])
const showDropdown = ref(false)

const onSelect = (option: Option) => {
  emit('update:modelValue', option)
  toggleDropdown()
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
  showDropdown.value = false
}
</script>
