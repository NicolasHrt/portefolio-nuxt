<script setup lang="ts">
const items = [{
  label: 'Do you have a free trial?',
  content: 'Ea est ex aliqua exercitation quis et cillum adipisicing sit tempor veniam incididunt labore.'
}, {
  label: 'Can I use Nuxt UI Pro for Open Source projects?',
  content: 'Et adipisicing do do do sunt irure proident consequat fugiat tempor occaecat commodo fugiat in proident.'
}, {
  label: 'What does “Unlimited minor & patch updates” include?',
  content: 'Dolor dolor consectetur tempor consectetur sint ut id ex quis voluptate dolore incididunt qui mollit.'
}, {
  label: 'Do you offer technical support?',
  content: 'Sint id sint incididunt culpa.'
}]
</script>

<template>
  <div>
    <h2 class="text-4xl font-bold mb-4">FAQ</h2>
    <ULandingFAQ :items="items" multiple/>
  </div>
</template>

