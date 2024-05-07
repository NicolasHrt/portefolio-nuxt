<script setup lang="ts">
defineProps({
  availability: Boolean,
  email: String
})
</script>

<template>
  <UButton v-if="availability" color="gray" class="relative" :to="'mailto:' + email"
  >
    {{ $t('available') }}
    <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
  </UButton>
  <UButton v-else color="gray" class="relative" :to="'mailto:' + email"
  >
    {{ $t('not_available') }}
    <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
  </UButton>
</template>

<style scoped>

</style>