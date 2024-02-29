<template>
  <component :is="size" :class="sizeClassList" class="font-bold mb-12">
    <slot />
  </component>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface Props {
  tag: Heading
  variant?: Heading
}

const props = defineProps<Props>()

const size = computed(() => props.variant || props.tag)

const sizeClassList = computed(() => {
  switch (size.value) {
    case 'h1':
      return 'text-3xl'
    case 'h2':
      return 'text-2xl'
    case 'h3':
      return 'text-xl'
    case 'h4':
      return 'text-lg'
    case 'h5':
      return ''
    case 'h6':
      return 'text-sm'
    default:
      return ''
  }
})
</script>
