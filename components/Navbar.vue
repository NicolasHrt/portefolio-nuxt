<script setup lang="ts">


const links = [{
  label: 'About me',
  icon: 'i-heroicons-book-open',
  to: '/getting-started'
}, {
  label: 'My experiences',
  icon: 'i-heroicons-square-3-stack-3d',
  to: '/pro'
}, {
  label: 'My contacts',
  icon: 'i-heroicons-rocket-launch',
  to: '/releases'
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <h1 class="text-2xl ">Nicolas H.</h1>
    </template>

    <template #right>
      <UColorModeButton/>

      <UButton to="https://github.com/nuxt/ui" target="_blank" icon="i-simple-icons-github" color="gray"
               variant="ghost"/>
    </template>

    <template #panel>
    </template>
  </UHeader>
</template>

