<script setup lang="ts">
const {locale, setLocale} = useI18n()

const isOpen = ref(false)

onMounted(() => {
  //get language from local storage
  const language = localStorage.getItem('language')
  if (language) {
    setLanguage(language)
  }
})

function setLanguage(language: string) {
  setLocale(language)
  //put language in local storage
  localStorage.setItem('language', language)
  isOpen.value = false
}

</script>

<template>
  <div>
    <!--    <USelect v-model="language" :options="languages" option-attribute="name"/>-->
    <UPopover v-model:open="isOpen">
      <UButton icon="i-heroicons-language" square variant="ghost" color="gray"/>
      <template #panel>
        <div class="p-1 grid gap-1">
          <UButton @click="setLanguage('fr')" :variant="locale === 'fr' ? 'solid' : 'ghost'" color="gray" size="lg">
            {{ $t('french') }}
          </UButton>
          <UButton @click="setLanguage('en')" :variant="locale === 'en' ? 'solid' : 'ghost'" color="gray" size="lg">
            {{ $t('english') }}
          </UButton>
        </div>
      </template>
    </UPopover>
  </div>

</template>

