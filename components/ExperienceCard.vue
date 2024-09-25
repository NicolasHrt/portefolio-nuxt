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
          <p class="text-xl font-medium mb-1">{{ experience.company }} - {{ experience.contractType }}</p>
          <UBadge color="gray">{{ experience.period }}</UBadge>
        </div>
        <p class="text-lg mb-6" v-html="experience.description"></p>
        <div class="flex sm:items-center justify-between gap-4 max-sm:flex-col">
          <div>
            <p class="text-lg font-bold mb-2">{{ $t('technologies_used') }} :</p>
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

            <UButton v-if="experience.works.length === 1" :to="experience.works[0].url"
                     trailing-icon="i-heroicons-arrow-small-right"
                     target="_blank" size="xl"
                     :label="$t('check_work')"/>

            <UPopover v-else mode="hover">
              <UButton size="xl" :label="$t('check_works')" color="gray"
                       trailing-icon="i-heroicons-arrow-small-right"/>

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