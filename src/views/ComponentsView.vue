<template>
  <div>
    <div class="flex"></div>
    <VButton>test</VButton>
    <VButton variant="secondary">test</VButton>
    <VButton variant="secondary" size="lg">test</VButton>
    <VButton variant="secondary">test</VButton>
    <VButton variant="secondary" disabled>test</VButton>
    <VButton to="/" variant="secondary" disabled>test</VButton>

    <VLink to="/">light</VLink>
    <VLink to="/" variant="dark">dark</VLink>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
