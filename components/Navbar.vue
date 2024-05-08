<script setup lang="ts">
const {locale, setLocale} = useI18n()
const localePath = useLocalePath()

import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const links = reactive([
  {
    label: 'Home',
    to: localePath('/'),
  },
  {
    label: 'My experiences',
    to: '#experiences',
    active: false
  },
  {
    label: 'FAQ',
    to: '#FAQ',
    active: false
  },
  // {
  //   label: 'Blog',
  //   to: '/blog'
  // }
])
watch(locale, () => {
  links[0].label = t('home')
  links[1].label = t('experiences')

})
</script>
<template>
  <UHeader :links="links">
    <template #logo>
      <NuxtLink :to="localePath('/')"><h1 class="text-2xl ">Nicolas H.</h1></NuxtLink>
    </template>


    <template #right>
      <UButton to="https://github.com/NicolasHrt" target="_blank" icon="i-simple-icons-github" color="gray"
               variant="ghost"/>
      <UColorModeButton/>
      <LanguageSelect/>

    </template>
    <template #panel>

    </template>
  </UHeader>
</template>

