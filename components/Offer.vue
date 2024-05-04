<script setup lang="ts">

</script>

<template>
  <div>
    <h2 class="text-4xl font-bold mb-8">What I Offer ?</h2>
    <ULandingGrid>
      <ULandingCard class="col-span-6 row-span-2" icon="i-heroicons-computer-desktop" title="Front-End Development"
                    description="I create responsive and reactive web applications with Vue.js and Nuxt.js."/>
      <ULandingCard class="col-span-6 row-span-4" icon="i-heroicons-wrench-screwdriver" title="Back-End Development"
                    description="I develop APIs using Supabase and Prisma Next generation ORM."/>
      <ULandingCard class="col-span-6 row-span-4" icon="i-material-symbols-design-services-outline" title="UX Design"
                    description="I design user interfaces with Tailwind CSS and Nuxt UI to provide a great user experience."/>
      <ULandingCard class="col-span-6 row-span-2" icon="i-heroicons-magnifying-glass" title="SEO Optimization"
                    description="Creating websites according to best practices for effective SEO. Implementing microdata markup on the pages."/>
    </ULandingGrid>
  </div>
</template>

<style scoped>

</style>