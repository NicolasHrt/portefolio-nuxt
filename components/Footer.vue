<script setup lang="ts"></script>

<template>
  <UFooter>
    <template #left> Copyright © {{ new Date().getFullYear() }} </template>
    <template #center>
      <p class="font-medium">
        Made by me with
        <ULink to="https://ui.nuxt.com/" class="text-primary">Nuxt UI pro</ULink>
      </p>
    </template>
    <template #right>
      <UButton
        icon="i-simple-icons-x"
        color="gray"
        variant="ghost"
        to="https://x.com/nicolasharter_"
        target="_blank"
      />
      <UButton
        icon="i-simple-icons-linkedin"
        color="gray"
        variant="ghost"
        to="https://www.linkedin.com/in/nicolas-harter-b34913207/"
        target="_blank"
      />
      <UButton
        icon="i-simple-icons-github"
        color="gray"
        variant="ghost"
        to="https://github.com/NicolasHrt"
        target="_blank"
      />
    </template>
  </UFooter>
</template>
