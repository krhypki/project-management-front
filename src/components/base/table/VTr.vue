<template>
  <tr :class="{ 'hover:bg-white hover:text-indigo-700 cursor-pointer': hoverable }">
    <slot />
  </tr>
</template>

<script lang="ts" setup>
interface Props {
  hoverable?: boolean
}

withDefaults(defineProps<Props>(), {
  hoverable: false
})
</script>
