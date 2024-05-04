<script setup>
defineProps({
  experience: Object
})
</script>

<template>
  <div
      class="shadow-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900  rounded-xl p-4">
    <div class="sm:flex items-start gap-4">
      <div v-if="experience.img" class="max-w-20 max-sm:mb-2 aspect-square flex-shrink-0 ">
        <img class="w-full h-full object-cover rounded-xl"
             :src="experience.img.url"
             :alt="experience.img.alt">
      </div>
      <div>
        <div class="mb-4">
          <h3 class="text-2xl font-bold">{{ experience.job }}</h3>
          <p class="text-xl font-medium">{{ experience.company }} - {{ experience.contractType }}</p>
          <p>From September 2020 to September 2021</p>
        </div>
        <p class="text-lg mb-4">{{ experience.description }}</p>
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-lg font-medium mb-2">Technologies used:</p>
            <div class="flex gap-4 items-center">
              <UPopover v-for="techno in experience.technologies" mode="hover">
                <UIcon :name="techno.icon" class="w-10 h-10 flex-shrink-0"/>
                <template #panel>
                  <div class="p-4 font-medium">
                    {{ techno.name }}
                  </div>
                </template>
              </UPopover>
            </div>
          </div>
          <div v-if="experience.works">

            <UButton v-if="experience.works.length === 1" :to="experience.works[0].url" icon="i-heroicons-pencil"
                     target="_blank" size="xl"
                     color="black">Check
              work
            </UButton>
            <UPopover v-else mode="hover">
              <UButton color="white" size="xl" label="Check works" icon="i-heroicons-pencil"/>

              <template #panel>
                <div class="p-4 grid gap-2">
                  <div v-for="work in experience.works">
                    <UButton :to="work.url" target="_blank" size="xl" color="black">{{ work.name }}</UButton>
                  </div>
                </div>
              </template>
            </UPopover>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>