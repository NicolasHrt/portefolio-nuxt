<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: 'Newsletter',
  ogTitle: 'Newsletter',
});

const email = ref('');
const status = ref<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle');

async function subscribe() {
  status.value = 'loading';
  try {
    const res = await $fetch('/api/newsletter', {
      method: 'POST',
      body: { email: email.value },
    });
    if (res.message === 'already_subscribed') {
      status.value = 'already';
    } else {
      status.value = 'success';
      email.value = '';
    }
  } catch {
    status.value = 'error';
  }
}
</script>

<template>
  <UContainer class="py-24">
    <div class="mx-auto max-w-lg">
      <h1 class="mb-4 text-4xl font-bold">Newsletter</h1>
      <p class="mb-8 text-lg text-gray-500 dark:text-gray-400">
        {{ t('newsletter_description') }}
      </p>

      <UCard>
        <form @submit.prevent="subscribe" class="flex flex-col gap-4">
          <UInput
            v-model="email"
            type="email"
            :placeholder="t('newsletter_placeholder')"
            icon="i-material-symbols-mail"
            size="lg"
            required
          />
          <UButton
            type="submit"
            :label="t('newsletter_subscribe')"
            :loading="status === 'loading'"
            size="lg"
            block
          />
        </form>

        <div v-if="status === 'success'" class="mt-4 rounded-md bg-green-50 p-3 text-green-700 dark:bg-green-900/20 dark:text-green-400">
          {{ t('newsletter_success') }}
        </div>
        <div v-else-if="status === 'already'" class="mt-4 rounded-md bg-yellow-50 p-3 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
          {{ t('newsletter_already') }}
        </div>
        <div v-else-if="status === 'error'" class="mt-4 rounded-md bg-red-50 p-3 text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {{ t('newsletter_error') }}
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
