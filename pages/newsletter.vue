<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: 'Newsletter',
  ogTitle: 'Newsletter',
});

// Newsletter form
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

// Simulator
const tjm = ref(500);
const joursParAn = ref(218);
const esnMargin = ref(40);

const esnNet = computed(() => {
  const ca = tjm.value * joursParAn.value;
  const afterMargin = ca * (1 - esnMargin.value / 100);
  const brut = afterMargin / 1.45;
  return Math.round(brut * 0.75);
});

const freelanceNet = computed(() => {
  const ca = tjm.value * joursParAn.value;
  return Math.round(ca * 0.789);
});

const difference = computed(() => freelanceNet.value - esnNet.value);

const differenceMonthly = computed(() => Math.round(difference.value / 12));

function formatMoney(n: number) {
  return n.toLocaleString('fr-FR') + ' €';
}
</script>

<template>
  <div>
    <!-- Hero -->
    <div class="relative overflow-hidden">
      <div
        class="newsletter-grid absolute inset-0 z-[-1] [mask-image:radial-gradient(60%_60%_at_50%_30%,white,transparent)]"
      />
      <div class="mx-auto max-w-3xl px-6 pb-16 pt-24 text-center">
        <div
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-semibold text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400"
        >
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
          </span>
          {{ t('nl_badge') }}
        </div>

        <h1 class="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {{ t('nl_hero_1') }}
          <span class="text-primary">{{ t('nl_hero_highlight') }}</span>
          {{ t('nl_hero_2') }}
        </h1>

        <p class="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
          {{ t('nl_subtitle') }}
        </p>

        <!-- Hero CTA -->
        <div class="mx-auto max-w-md">
          <Transition name="fade" mode="out-in">
            <div v-if="status === 'success'" class="space-y-4">
              <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <UIcon name="i-material-symbols-check-circle" class="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <p class="text-lg font-medium text-green-700 dark:text-green-400">
                {{ t('newsletter_success') }}
              </p>
            </div>

            <form v-else @submit.prevent="subscribe" class="space-y-3">
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
                <p v-if="status === 'already'" class="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  {{ t('newsletter_already') }}
                </p>
                <p v-else-if="status === 'error'" class="text-sm font-medium text-red-600 dark:text-red-400">
                  {{ t('newsletter_error') }}
                </p>
              </Transition>

              <p class="text-xs text-gray-400 dark:text-gray-500">{{ t('newsletter_privacy') }}</p>
            </form>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Value props -->
    <div class="mx-auto max-w-4xl px-6 pb-20">
      <div class="grid gap-6 sm:grid-cols-3">
        <div
          v-for="i in 3"
          :key="i"
          class="rounded-2xl border border-gray-200 bg-white/60 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/60"
        >
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <UIcon
              :name="
                i === 1
                  ? 'i-material-symbols-rocket-launch'
                  : i === 2
                    ? 'i-material-symbols-attach-money'
                    : 'i-material-symbols-shield'
              "
              class="h-5 w-5 text-primary"
            />
          </div>
          <h3 class="mb-2 text-lg font-bold">{{ t(`nl_prop${i}_title`) }}</h3>
          <p class="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {{ t(`nl_prop${i}_desc`) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Simulator -->
    <div class="bg-gray-50 dark:bg-gray-900/50">
      <div class="mx-auto max-w-4xl px-6 py-20">
        <div class="mb-10 text-center">
          <h2 class="mb-3 text-3xl font-bold sm:text-4xl">{{ t('nl_sim_title') }}</h2>
          <p class="text-gray-500 dark:text-gray-400">{{ t('nl_sim_subtitle') }}</p>
        </div>

        <!-- Sliders -->
        <div class="mb-10 grid gap-8 sm:grid-cols-2">
          <div>
            <label class="mb-2 flex items-center justify-between text-sm font-medium">
              <span>{{ t('nl_sim_tjm') }}</span>
              <span class="font-bold text-primary">{{ tjm }} €</span>
            </label>
            <input
              v-model.number="tjm"
              type="range"
              min="200"
              max="1200"
              step="10"
              class="sim-slider w-full"
            />
            <div class="mt-1 flex justify-between text-xs text-gray-400">
              <span>200 €</span>
              <span>1 200 €</span>
            </div>
          </div>
          <div>
            <label class="mb-2 flex items-center justify-between text-sm font-medium">
              <span>{{ t('nl_sim_days') }}</span>
              <span class="font-bold text-primary">{{ joursParAn }}j</span>
            </label>
            <input
              v-model.number="joursParAn"
              type="range"
              min="100"
              max="230"
              step="1"
              class="sim-slider w-full"
            />
            <div class="mt-1 flex justify-between text-xs text-gray-400">
              <span>100j</span>
              <span>230j</span>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="grid gap-4 sm:grid-cols-3">
          <!-- ESN -->
          <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <p class="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">{{ t('nl_sim_esn') }}</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ formatMoney(esnNet) }}</p>
            <p class="mt-1 text-sm text-gray-400">{{ t('nl_sim_net_year') }}</p>
            <p class="mt-3 text-sm text-gray-500">{{ formatMoney(Math.round(esnNet / 12)) }}/{{ t('nl_sim_month') }}</p>
          </div>

          <!-- Freelance -->
          <div class="rounded-2xl border-2 border-primary bg-white p-6 ring-4 ring-primary/10 dark:bg-gray-800">
            <p class="mb-1 text-sm font-medium text-primary">{{ t('nl_sim_freelance') }}</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ formatMoney(freelanceNet) }}</p>
            <p class="mt-1 text-sm text-gray-400">{{ t('nl_sim_net_year') }}</p>
            <p class="mt-3 text-sm font-medium text-primary">{{ formatMoney(Math.round(freelanceNet / 12)) }}/{{ t('nl_sim_month') }}</p>
          </div>

          <!-- Difference -->
          <div class="flex flex-col justify-center rounded-2xl bg-red-50 p-6 dark:bg-red-900/20">
            <p class="mb-1 text-sm font-medium text-red-600 dark:text-red-400">{{ t('nl_sim_lost') }}</p>
            <p class="text-3xl font-bold text-red-600 dark:text-red-400">+{{ formatMoney(difference) }}</p>
            <p class="mt-1 text-sm text-red-500/80">{{ t('nl_sim_per_year') }}</p>
            <p class="mt-3 text-sm font-semibold text-red-600 dark:text-red-400">
              {{ t('nl_sim_thats') }} {{ formatMoney(differenceMonthly) }}/{{ t('nl_sim_month') }}
            </p>
          </div>
        </div>

        <p class="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
          {{ t('nl_sim_disclaimer') }}
        </p>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="mx-auto max-w-xl px-6 py-20 text-center">
      <h2 class="mb-3 text-3xl font-bold">{{ t('nl_cta_title') }}</h2>
      <p class="mb-8 text-gray-500 dark:text-gray-400">{{ t('nl_cta_desc') }}</p>

      <Transition name="fade" mode="out-in">
        <div v-if="status === 'success'" class="space-y-4">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <UIcon name="i-material-symbols-check-circle" class="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <p class="text-lg font-medium text-green-700 dark:text-green-400">
            {{ t('newsletter_success') }}
          </p>
        </div>

        <form v-else @submit.prevent="subscribe" class="space-y-3">
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
            <p v-if="status === 'already'" class="text-sm font-medium text-yellow-600 dark:text-yellow-400">
              {{ t('newsletter_already') }}
            </p>
            <p v-else-if="status === 'error'" class="text-sm font-medium text-red-600 dark:text-red-400">
              {{ t('newsletter_error') }}
            </p>
          </Transition>

          <p class="text-xs text-gray-400 dark:text-gray-500">{{ t('newsletter_privacy') }}</p>
        </form>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.newsletter-grid {
  background-size: 80px 80px;
  background-image: linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}
.dark .newsletter-grid {
  background-image: linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
}

.sim-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 999px;
  background: rgb(var(--color-gray-200));
  outline: none;
}
.dark .sim-slider {
  background: rgb(var(--color-gray-700));
}
.sim-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgb(var(--color-primary-500));
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.25s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
