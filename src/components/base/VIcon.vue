<template>
  <i :class="`fa-solid fa-${name} align-middle`"></i>
</template>

<script setup lang="ts">
interface Props {
  name: string
}

defineProps<Props>()
</script>
