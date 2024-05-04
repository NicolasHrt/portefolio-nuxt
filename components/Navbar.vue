<script setup lang="ts">


const links = [{
  label: 'What I Offer ?',
  to: '/#offer',
  active: false
}, {
  label: 'My experiences',
  to: '/#experiences',
  active: false
}, {
  label: 'Blog',
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

      <UButton to="https://github.com/NicolasHrt" target="_blank" icon="i-simple-icons-github" color="gray"
               variant="ghost"/>
    </template>

    <template #panel>
    </template>
  </UHeader>
</template>

