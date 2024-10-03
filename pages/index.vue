<script setup lang="ts">
import WorkAvailability from "~/components/WorkAvailability.vue";

const {locale} = useI18n()

const {data: page} = await useAsyncData('index', () => queryContent(`/${locale.value}`).findOne())


watch(locale, () => {
  queryContent(`/${locale.value}`).findOne().then((data) => {
    page.value = data
  })
})

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description
})
</script>

<template>
  <div v-if="page">
    <div class="relative">
      <div
          class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"/>
      <ULandingHero v-motion-fade-visible :ui="{wrapper: 'md:py-24'}"
                    v-bind="page.hero"
                    orientation="horizontal"
                    :links="[{ label: $t('my_CV'), to:`${page.contact.CV}#zoom=55`, target:'_blank',color:'black', icon: 'i-pepicons-pop-cv', size: 'lg' },{ label: $t('contact_me'),to:`mailto:${page.contact.email}`  ,icon: 'i-material-symbols-mail', size: 'lg' }]">
        <template #headline>
          <WorkAvailability v-bind="page.contact"/>
        </template>
        <template #default>
          <div v-motion-slide-visible-left
               class="max-w-[400px] w-full aspect-square mx-auto rounded-full overflow-hidden ring-2 ring-gray-300 dark:ring-gray-700 shadow-2xl">
            <NuxtImg
                :src="page.hero.img"
                class="w-full h-full object-cover"
            />
          </div>
        </template>
      </ULandingHero>
    </div>
    <UContainer class="">
      <ULandingLogos class="mb-20" v-motion-slide-bottom :title="page.technologies.title"
                     :ui="{title:'text-3xl font-bold'}"
                     align="center">
        <UPopover v-for="techno in page.technologies.list" mode="hover">
          <UIcon :name="techno.icon" class="w-20 h-20 flex-shrink-0"/>
          <template #panel>
            <div class="p-4 font-medium">
              {{ techno.name }}
            </div>
          </template>
        </UPopover>
      </ULandingLogos>

      <div class="mb-20">
        <h2 class="text-4xl font-bold mb-8">{{ page.offers.title }}</h2>
        <ULandingGrid>
          <ULandingCard v-for="offer in page.offers.list"
                        v-bind="offer"/>
        </ULandingGrid>
      </div>

      <div class="relative mb-20" id="experiences">
        <h2 class="text-4xl font-bold text-center mb-20">{{ page.experiences.title }}</h2>
        <div class="absolute h-[calc(100%-6rem)] top-20   w-1 rounded-2xl bg-gray-200 right-1/2 translate-x-1/2"></div>
        <div class="relative max-w-2xl" :class="[index % 2 === 0 ? '' : 'ml-auto']"
             v-for="(experience,index) in page.experiences.list">
          <p class="text-3xl font-bold  mb-20"
             :class="[(index % 2 === 0) ? 'sm:text-right sm:mr-28' : 'sm:ml-28', (index === 0) ? 'text-primary' : '']">
            {{ experience.year }}</p>
          <ExperienceCard v-if="index % 2 === 0" v-motion-slide-visible-left :experience="experience" class="mb-20"/>
          <ExperienceCard v-else v-motion-slide-visible-right :experience="experience" class="mb-20"/>
        </div>
      </div>
      <div id="FAQ">
        <h2 class="text-4xl font-bold mb-4">FAQ</h2>
        <ULandingFAQ :items="page.faq" multiple/>
      </div>

      <ULandingCTA id="contactMe"
                   :title="page.cta.title"
                   :description="page.cta.description"
                   :card="false"
                   :links="[{ label: $t('contact_me'),to:`mailto:${page.contact.email}` ,icon: 'i-material-symbols-android-chat', size: 'lg' }]"
      />

    </UContainer>
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