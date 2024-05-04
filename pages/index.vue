<script setup lang="ts">

import FavoriteTechno from "~/components/FavoriteTechno.vue";
import Experiences from "~/components/Experiences.vue";
</script>

<template>
  <Hero/>
  <UContainer class="">
    <FavoriteTechno id="offer" class="mb-24"/>
    <Offer class="mb-20"/>
    <Experiences id="experiences" class="mb-20"/>
    <ULandingCTA class="mb-20"
                 title="Trusted and supported by our amazing community"
                 description="We've built a strong, lasting partnership. Their trust is our driving force, propelling us towards shared success."
                 card
                 :links="[{ label: 'Get started', color: 'gray', size: 'md' }, { label: 'Learn more', variant: 'link', color: 'gray', size: 'md', trailingIcon: 'i-heroicons-arrow-right-20-solid' }]"
    />
    <FAQ class="mb-10"/>
  </UContainer>

</template>

<style scoped>

</style>