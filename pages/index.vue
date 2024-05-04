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
    <FAQ class="mb-10"/>
  </UContainer>

</template>

<style scoped>

</style>