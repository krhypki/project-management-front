<template>
  <RouterLink v-bind="$props" class="hover:underline" :class="variantClassList">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouterLinkProps } from 'vue-router'

interface Props extends RouterLinkProps {
  variant?: 'dark' | 'light'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light'
})

const variantClassList = computed(() => (props.variant === 'light' ? 'text-white' : 'text-black'))
</script>
