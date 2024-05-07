<script setup lang="ts">
const {locale} = useI18n()

const articles = await queryContent(`${locale.value}/blog`).find()
console.log(articles)
</script>

<template>
  <UContainer v-motion-fade class="mt-20">
    <h1 class="text-5xl font-bold mb-20">My Blog</h1>
    <UBlogList orientation="horizontal">
      <UBlogPost v-for="article in articles"
                 :title="article.title"
                 :description="article.description"
                 :image="{ src: 'https://picsum.photos/640/360', alt: 'Nuxt 3.9' }"
                 :date="article.date"
                 :to="article._path"
      />

    </UBlogList>
  </UContainer>
</template>

<style scoped>

</style>