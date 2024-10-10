<script setup lang="ts">
const { locale } = useI18n();
const localePath = useLocalePath();
</script>
<template>
  <UHeader :to="localePath('/')">
    <template #logo>
      <h1 class="text-2xl">Nicolas H.</h1>
    </template>
    <template #right>
      <UButton
        to="https://github.com/NicolasHrt"
        target="_blank"
        icon="i-simple-icons-github"
        color="gray"
        variant="ghost"
      />
      <UColorModeButton />
      <LanguageSelect />
    </template>
    <template #panel> </template>
  </UHeader>
</template>
