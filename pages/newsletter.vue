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
  <div class="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
    <div
      class="newsletter-grid absolute inset-0 z-[-1] [mask-image:radial-gradient(60%_60%_at_50%_30%,white,transparent)]"
    />

    <div class="relative z-10 mx-auto w-full max-w-xl px-6 py-24 text-center">
      <div
        class="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/50 px-4 py-1.5 text-sm font-medium text-gray-600 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
      >
        <UIcon name="i-material-symbols-mail" class="h-4 w-4" />
        Newsletter
      </div>

      <h1 class="mb-4 text-5xl font-bold tracking-tight">
        {{ t('newsletter_title') }}
      </h1>

      <p class="mx-auto mb-10 max-w-md text-lg text-gray-500 dark:text-gray-400">
        {{ t('newsletter_description') }}
      </p>

      <Transition name="fade" mode="out-in">
        <div v-if="status === 'success'" class="space-y-4">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <UIcon name="i-material-symbols-check-circle" class="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <p class="text-lg font-medium text-green-700 dark:text-green-400">
            {{ t('newsletter_success') }}
          </p>
        </div>

        <form v-else @submit.prevent="subscribe" class="space-y-4">
          <div class="flex gap-3 sm:flex-row flex-col">
            <input
              v-model="email"
              type="email"
              required
              :placeholder="t('newsletter_placeholder')"
              class="flex-1 rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-base outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-primary dark:focus:ring-primary/20"
            />
            <button
              type="submit"
              :disabled="status === 'loading'"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
            >
              <UIcon
                v-if="status === 'loading'"
                name="i-material-symbols-progress-activity"
                class="h-5 w-5 animate-spin"
              />
              {{ t('newsletter_subscribe') }}
            </button>
          </div>

          <Transition name="slide-fade">
            <p
              v-if="status === 'already'"
              class="text-sm font-medium text-yellow-600 dark:text-yellow-400"
            >
              {{ t('newsletter_already') }}
            </p>
            <p
              v-else-if="status === 'error'"
              class="text-sm font-medium text-red-600 dark:text-red-400"
            >
              {{ t('newsletter_error') }}
            </p>
          </Transition>

          <p class="text-xs text-gray-400 dark:text-gray-500">
            {{ t('newsletter_privacy') }}
          </p>
        </form>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.newsletter-grid {
  background-size: 80px 80px;
  background-image: linear-gradient(
      to right,
      rgb(var(--color-gray-200)) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      rgb(var(--color-gray-200)) 1px,
      transparent 1px
    );
}

.dark .newsletter-grid {
  background-image: linear-gradient(
      to right,
      rgb(var(--color-gray-800)) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      rgb(var(--color-gray-800)) 1px,
      transparent 1px
    );
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
