<script setup>
defineProps({
  experience: Object,
});
</script>

<template>
  <div
    class="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-xl dark:border-gray-800 dark:bg-gray-900"
  >
    <div class="items-start gap-4 sm:flex">
      <div
        v-if="experience.img"
        class="aspect-square max-w-20 flex-shrink-0 max-sm:mb-2"
      >
        <img
          class="h-full w-full rounded-xl object-cover"
          :src="experience.img.url"
          :alt="experience.img.alt"
        />
      </div>
      <div>
        <div class="mb-4">
          <h3 class="text-2xl font-bold">{{ experience.job }}</h3>
          <p class="mb-1 text-xl font-medium">
            {{ experience.company }} - {{ experience.contractType }}
          </p>
          <UBadge color="gray">{{ experience.period }}</UBadge>
        </div>
        <p class="mb-6 text-lg" v-html="experience.description"></p>
        <div class="flex justify-between gap-4 max-sm:flex-col sm:items-center">
          <div>
            <p class="mb-2 text-lg font-bold">
              {{ $t('technologies_used') }} :
            </p>
            <div class="flex items-center gap-4">
              <UPopover v-for="techno in experience.technologies" mode="hover">
                <UIcon :name="techno.icon" class="h-10 w-10 flex-shrink-0" />
                <template #panel>
                  <div class="p-4 font-medium">
                    {{ techno.name }}
                  </div>
                </template>
              </UPopover>
            </div>
          </div>
          <div v-if="experience.works">
            <UButton
              v-if="experience.works.length === 1"
              :to="experience.works[0].url"
              trailing-icon="i-heroicons-arrow-small-right"
              target="_blank"
              size="xl"
              :label="$t('check_work')"
            />

            <UPopover v-else mode="hover">
              <UButton
                size="xl"
                :label="$t('check_works')"
                color="gray"
                trailing-icon="i-heroicons-arrow-small-right"
              />

              <template #panel>
                <div class="grid gap-2 p-4">
                  <div v-for="work in experience.works">
                    <UButton
                      :to="work.url"
                      target="_blank"
                      size="xl"
                      color="black"
                      >{{ work.name }}</UButton
                    >
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

<style scoped></style>
