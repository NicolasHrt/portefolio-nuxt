<script setup lang="ts">
const config = useRuntimeConfig()


const availableForWork = ref(true)
</script>

<template>
  <div class="relative">
    <div
        class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"/>
    <ULandingHero v-motion-fade-visible :ui="{wrapper: 'md:py-24'}"
                  title="Hi, I'm Nicolas"
                  description="A Front-End Web Developer, specialized in Vue.js and Nuxt.js. I am passionate about creating beautiful and responsive websites."
                  orientation="horizontal"
                  :links="[{ label: 'My CV', icon: 'i-pepicons-pop-cv', size: 'lg' },{ label: 'Contact Me',to:`mailto:${config.public.email}` ,color: 'black' ,icon: 'i-material-symbols-android-chat', size: 'lg' }]"
    >
      <template #headline>
        <UButton v-if="availableForWork" color="gray" class="relative" :to="'mailto:' + config.public.email">Available
          for freelance work
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
        </UButton>
        <UButton v-else color="gray" class="relative" :to="'mailto:' + config.public.email">Not
          available
          for freelance work
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </UButton>
      </template>
      <template #default>
        <div v-motion-slide-visible-left
             class="max-w-[400px] w-full aspect-square mx-auto rounded-full overflow-hidden ring-2 ring-gray-300 dark:ring-gray-700 shadow-2xl">
          <img
              src="https://pbs.twimg.com/profile_images/1779583028324347904/QTTnRa_0_400x400.jpg"
              class="w-full h-full object-cover"
          />
        </div>
      </template>
    </ULandingHero>
  </div>

</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image: linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
  linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}

.dark {
  .landing-grid {
    background-image: linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}
</style>