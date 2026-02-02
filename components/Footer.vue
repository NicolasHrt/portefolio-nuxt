<script setup lang="ts"></script>

<template>
  <UFooter>
    <template #left> Copyright © {{ new Date().getFullYear() }} </template>
    <template #center>
    </template>
    <template #right>
      <UButton icon="i-simple-icons-linkedin" color="gray" variant="ghost"
        to="https://www.linkedin.com/in/nicolasharter" target="_blank" />
      <UButton icon="i-simple-icons-github" color="gray" variant="ghost" to="https://github.com/NicolasHrt"
        target="_blank" />
    </template>
  </UFooter>
</template>
