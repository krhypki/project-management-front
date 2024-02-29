<template>
  <Transition>
    <div :class="variantClassList" class="w-full rounded px-3 py-2">
      <slot />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant: 'error' | 'info' | 'success'
}

const props = defineProps<Props>()

const variantClassList = computed(() => {
  switch (props.variant) {
    case 'error':
      return 'bg-red-500'
    case 'info':
      return 'bg-blue-500'
    case 'success':
      return 'bg-green-500'
    default:
      return ''
  }
})
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
