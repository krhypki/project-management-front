<template>
  <component
    :is="tag"
    :to="to"
    class="block rounded transition-all duration-300 disabled:opacity-75 text-center"
    :class="[variantClassList, sizeClassList, { 'w-full': block }]"
    :disabled="disabled"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type RouteLocationRaw } from 'vue-router'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  to?: RouteLocationRaw
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  block: false
})

const tag = computed(() => (props.to ? 'RouterLink' : 'button'))

const variantClassList = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-indigo-700 text-white enabled:hover:bg-white enabled:hover:text-indigo-700'
    case 'secondary':
      return 'border-2 border-indigo-700 text-indigo-500 enabled:hover:bg-indigo-700 enabled:hover:text-white'
    default:
      return ''
  }
})

const sizeClassList = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-2 py-1'
    case 'md':
      return 'px-2 py-1.5'
    case 'lg':
      return 'p-2.5 text-lg'

    default:
      return ''
  }
})
</script>
