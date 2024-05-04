<script setup>
const route = useRoute()
const {data: article} = await useAsyncData(route.path, () => queryContent(route.path).findOne())

const {data: surround} = await useAsyncData(`${route.path}-surround`, () => queryContent('/blog')
    .where({_extension: 'md'})
    .sort({date: -1})
    .findSurround((route.path))
)
console.log(article)

</script>

<template>
  <UContainer class="mt-20">

    <UPageBody prose class="dark:text-gray-300 dark:prose-pre:!bg-gray-800/60">
      <ContentRenderer v-if="article && article.body" :value="article"/>

      <div class="flex items-center justify-between mt-12 not-prose">
        <NuxtLink href="/blog" class="text-primary">
          ← Back to blog
        </NuxtLink>

      </div>
      <hr v-if="surround?.length">
      <UContentSurround :surround="surround"/>
    </UPageBody>
  </UContainer>
</template>

<style scoped>

</style>