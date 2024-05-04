<script setup lang="ts">

const technoList = [
  {
    name: 'Vue.js',
    icon: 'i-devicon-vuejs',
  },
  {
    name: 'Nuxt.js',
    icon: 'i-logos-nuxt-icon',
  },
  {
    name: 'Supabase',
    icon: 'i-devicon-supabase',
  },
  {
    name: 'Tailwind CSS',
    icon: 'i-logos-tailwindcss-icon',
  },
  {
    name: 'React',
    icon: 'i-devicon-react',
  },
  {
    name: 'Prisma',
    icon: 'i-devicon-prisma',
  },
]
</script>

<template>
  <ULandingLogos v-motion-slide-bottom title="The technologies I use
" :ui="{title:'text-3xl'}" align="center">
    <UPopover v-for="techno in technoList" mode="hover">
      <UIcon :name="techno.icon" class="w-20 h-20 flex-shrink-0"/>
      <template #panel>
        <div class="p-4 font-medium">
          {{ techno.name }}
        </div>
      </template>
    </UPopover>
  </ULandingLogos>

</template>

<style scoped>

</style>