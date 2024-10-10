<script setup lang="ts">
defineProps({
  availability: Boolean,
  email: String,
});
</script>

<template>
  <UButton
    v-if="availability"
    color="gray"
    class="relative"
    :to="'mailto:' + email"
  >
    {{ $t('available') }}
    <span class="relative flex h-3 w-3">
      <span
        class="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
      ></span>
      <span class="bg-primary relative inline-flex h-3 w-3 rounded-full"></span>
    </span>
  </UButton>
  <UButton v-else color="gray" class="relative" :to="'mailto:' + email">
    {{ $t('not_available') }}
    <span class="relative flex h-3 w-3">
      <span
        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"
      ></span>
      <span class="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
    </span>
  </UButton>
</template>

<style scoped></style>
