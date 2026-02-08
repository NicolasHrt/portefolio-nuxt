<script setup lang="ts">
import { Line, Doughnut, Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Filler,
);

useSeoMeta({
  title: 'Freelance vs Salariat : La Retraite en 2026',
  ogTitle: 'Freelance vs Salariat : La Retraite en 2026',
  description:
    'Pourquoi être freelance en 2026 peut être la meilleure stratégie pour ta retraite.',
});

// ---------- Chart options helpers ----------
const fontColor = ref('#94a3b8');
const gridColor = ref('#1e293b');

onMounted(() => {
  const isDark = document.documentElement.classList.contains('dark');
  fontColor.value = isDark ? '#94a3b8' : '#64748b';
  gridColor.value = isDark ? '#1e293b' : '#e2e8f0';
});

// ---------- 1. Demographic chart (actifs / retraités) ----------
const demoLabels = ['2000', '2005', '2010', '2015', '2020', '2025', '2030', '2040', '2050'];
const demoData = {
  labels: demoLabels,
  datasets: [
    {
      label: 'Actifs par retraité',
      data: [2.1, 1.95, 1.83, 1.72, 1.67, 1.55, 1.45, 1.3, 1.2],
      borderColor: '#f97316',
      backgroundColor: 'rgba(249,115,22,0.12)',
      tension: 0.35,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: '#f97316',
    },
  ],
};
const demoOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: fontColor.value } },
    tooltip: {
      callbacks: {
        label: (ctx: any) => `${ctx.parsed.y} actifs / retraité`,
      },
    },
  },
  scales: {
    x: { ticks: { color: fontColor.value }, grid: { color: gridColor.value } },
    y: {
      min: 0.5,
      max: 2.5,
      ticks: { color: fontColor.value },
      grid: { color: gridColor.value },
    },
  },
}));

// ---------- 2. Salary breakdown doughnut ----------
const salaryData = {
  labels: ['Net salarié', 'Cotisations retraite', 'Cotisations santé/chômage', 'Charges patronales autres'],
  datasets: [
    {
      data: [2900, 940, 640, 920],
      backgroundColor: ['#22c55e', '#ef4444', '#f97316', '#64748b'],
      borderWidth: 0,
      hoverOffset: 8,
    },
  ],
};
const salaryOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { color: fontColor.value, padding: 16, usePointStyle: true },
    },
    tooltip: {
      callbacks: {
        label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed.toLocaleString('fr-FR')} €`,
      },
    },
  },
}));

// ---------- 3. Compound growth line chart ----------
function buildGrowthData() {
  const years = Array.from({ length: 31 }, (_, i) => i);
  const labels = years.map((y) => `${y} ans`);

  // Freelance: 1500€/mois à 7% annuels
  const freelance = years.map((y) => {
    if (y === 0) return 0;
    const r = 0.07;
    const monthly = 1500;
    return Math.round(monthly * 12 * ((Math.pow(1 + r, y) - 1) / r));
  });

  // Salarié: cotisations retraite ~900€/mois = 10800€/an, rendement implicite ~1.5%
  const salarie = years.map((y) => {
    if (y === 0) return 0;
    const r = 0.015;
    const monthly = 900;
    return Math.round(monthly * 12 * ((Math.pow(1 + r, y) - 1) / r));
  });

  return {
    labels,
    datasets: [
      {
        label: 'Freelance (1 500 €/mois à 7%)',
        data: freelance,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34,197,94,0.08)',
        tension: 0.3,
        fill: true,
        pointRadius: 0,
        borderWidth: 3,
      },
      {
        label: 'Cotisations salarié (rendement implicite ~1.5%)',
        data: salarie,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.08)',
        tension: 0.3,
        fill: true,
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
  };
}
const growthData = buildGrowthData();
const growthOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: fontColor.value } },
    tooltip: {
      callbacks: {
        label: (ctx: any) =>
          ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('fr-FR')} €`,
      },
    },
  },
  scales: {
    x: { ticks: { color: fontColor.value, maxTicksLimit: 8 }, grid: { color: gridColor.value } },
    y: {
      ticks: {
        color: fontColor.value,
        callback: (v: string | number) => (Number(v) / 1000).toLocaleString('fr-FR') + ' k€',
      },
      grid: { color: gridColor.value },
    },
  },
}));

// ---------- 4. Final comparison bar chart ----------
const comparisonCapitalData = {
  labels: ['Salarié', 'Freelance'],
  datasets: [
    {
      label: 'Capital à 60 ans',
      data: [0, 1500000],
      backgroundColor: ['#ef4444', '#22c55e'],
      borderRadius: 8,
      barThickness: 60,
    },
  ],
};
const comparisonCapitalOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: any) => ` ${ctx.parsed.y.toLocaleString('fr-FR')} €`,
      },
    },
  },
  scales: {
    x: { ticks: { color: fontColor.value }, grid: { display: false } },
    y: {
      ticks: {
        color: fontColor.value,
        callback: (v: string | number) => (Number(v) / 1000).toLocaleString('fr-FR') + ' k€',
      },
      grid: { color: gridColor.value },
    },
  },
}));

const comparisonRenteData = {
  labels: ['Salarié', 'Freelance'],
  datasets: [
    {
      label: 'Rente mensuelle',
      data: [1700, 5000],
      backgroundColor: ['#ef4444', '#22c55e'],
      borderRadius: 8,
      barThickness: 60,
    },
  ],
};
const comparisonRenteOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: any) => ` ${ctx.parsed.y.toLocaleString('fr-FR')} €/mois`,
      },
    },
  },
  scales: {
    x: { ticks: { color: fontColor.value }, grid: { display: false } },
    y: {
      ticks: {
        color: fontColor.value,
        callback: (v: string | number) => Number(v).toLocaleString('fr-FR') + ' €',
      },
      grid: { color: gridColor.value },
    },
  },
}));


function formatMoney(n: number) {
  return n.toLocaleString('fr-FR') + ' €';
}

// ---------- Newsletter ----------
const { t } = useI18n();
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
  <div>
    <!-- Hero -->
    <div class="relative overflow-hidden">
      <div
        class="page-grid absolute inset-0 z-[-1] [mask-image:radial-gradient(60%_60%_at_50%_30%,white,transparent)]"
      />
      <div class="mx-auto max-w-4xl px-6 pb-16 pt-24 text-center">
        <div
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-semibold text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400"
        >
          <UIcon name="i-material-symbols-play-circle" class="h-4 w-4" />
          Analyse Vidéo
        </div>

        <h1 class="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Pourquoi être freelance en 2026 peut être la
          <span class="text-primary">meilleure stratégie</span>
          pour ta retraite
        </h1>

        <p class="mx-auto max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
          Et pourquoi le salariat te coûte très cher. Chiffres, graphiques et comparaisons
          concrètes.
        </p>
      </div>
    </div>

    <!-- Hook -->
    <div class="mx-auto max-w-4xl px-6 pb-16">
      <div
        class="rounded-2xl border border-red-200 bg-red-50/50 p-8 dark:border-red-800/50 dark:bg-red-900/10"
      >
        <p class="mb-2 text-xs font-bold uppercase tracking-wider text-red-500">Le constat</p>
        <blockquote class="text-xl font-semibold italic text-gray-800 dark:text-gray-200">
          "Si tu es salarié aujourd'hui, tu finances une retraite... que tu n'auras probablement
          jamais dans les mêmes conditions."
        </blockquote>
        <p class="mt-4 text-gray-500 dark:text-gray-400">
          En France, on te prend jusqu'à 45-50% de ce que tu produis, et tu n'as presque aucun
          contrôle sur ta retraite. On va voir pourquoi le freelance peut être une vraie stratégie
          financière long terme, pas juste un choix de confort.
        </p>
      </div>
    </div>

    <!-- Section 1 : Le système de répartition -->
    <div class="bg-gray-50 dark:bg-gray-900/50">
      <div class="mx-auto max-w-4xl px-6 py-20">
        <div class="mb-6 flex items-center gap-3">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
            >1</span
          >
          <h2 class="text-2xl font-bold sm:text-3xl">Comment marche la retraite en France</h2>
        </div>
        <p class="mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
          Le système actuel fonctionne par <strong class="text-gray-800 dark:text-gray-200">répartition</strong> : tu ne cotises pas pour toi,
          tu payes les retraites des actuels retraités.
        </p>

        <div class="mb-10 grid gap-4 sm:grid-cols-3">
          <div
            class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <UIcon
              name="i-material-symbols-group-remove"
              class="mb-3 h-8 w-8 text-orange-500"
            />
            <p class="font-bold">Moins d'actifs</p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Le nombre de cotisants diminue d'année en année.
            </p>
          </div>
          <div
            class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <UIcon
              name="i-material-symbols-elderly"
              class="mb-3 h-8 w-8 text-orange-500"
            />
            <p class="font-bold">Plus de retraités</p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              L'espérance de vie augmente, les retraités sont plus nombreux.
            </p>
          </div>
          <div
            class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <UIcon
              name="i-material-symbols-trending-down"
              class="mb-3 h-8 w-8 text-red-500"
            />
            <p class="font-bold">Ratio en chute</p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              De 2.1 actifs par retraité en 2000 à ~1.2 estimé en 2050.
            </p>
          </div>
        </div>

        <!-- Demographic chart -->
        <div
          class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
        >
          <p class="mb-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
            Ratio actifs / retraité en France (source : COR)
          </p>
          <div class="h-[300px]">
            <Line :data="demoData" :options="demoOptions" />
          </div>
        </div>

        <div
          class="mt-8 rounded-xl border-l-4 border-orange-400 bg-orange-50 p-5 dark:bg-orange-900/10"
        >
          <p class="font-semibold text-orange-700 dark:text-orange-400">
            "C'est un système qui marche seulement si la pyramide démographique est saine.
            Spoiler : elle ne l'est plus."
          </p>
        </div>
      </div>
    </div>

    <!-- Section 2 : Le vrai coût du salariat -->
    <div class="mx-auto max-w-4xl px-6 py-20">
      <div class="mb-6 flex items-center gap-3">
        <span
          class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
          >2</span
        >
        <h2 class="text-2xl font-bold sm:text-3xl">Le vrai coût du salariat</h2>
      </div>
      <p class="mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
        Prenons un dev à <strong class="text-gray-800 dark:text-gray-200">45k € brut/an</strong>.
        Il coûte <strong class="text-gray-800 dark:text-gray-200">~5 400 €/mois</strong> à son employeur
        mais ne reçoit que <strong class="text-gray-800 dark:text-gray-200">~2 900 € net</strong>. Voici où passe l'argent :
      </p>

      <div class="grid items-center gap-10 md:grid-cols-2">
        <!-- Doughnut chart -->
        <div
          class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
        >
          <p class="mb-4 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
            Répartition de 5 400 €/mois brut employeur (dev à 45k brut)
          </p>
          <div class="mx-auto h-[300px] max-w-[300px]">
            <Doughnut :data="salaryData" :options="salaryOptions" />
          </div>
        </div>

        <!-- Key numbers -->
        <div class="space-y-4">
          <div class="rounded-xl bg-green-50 p-5 dark:bg-green-900/10">
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">Tu reçois</p>
            <p class="text-3xl font-bold text-green-600">~2 900 €</p>
            <p class="mt-1 text-sm text-gray-400">54% du coût total</p>
          </div>
          <div class="rounded-xl bg-red-50 p-5 dark:bg-red-900/10">
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">Cotisations retraite</p>
            <p class="text-3xl font-bold text-red-600">~940 €</p>
            <p class="mt-1 text-sm text-gray-400">Rendement inconnu, sans contrôle</p>
          </div>
          <div class="rounded-xl bg-gray-100 p-5 dark:bg-gray-800">
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">Autres cotisations</p>
            <p class="text-3xl font-bold text-gray-600 dark:text-gray-300">~1 560 €</p>
            <p class="mt-1 text-sm text-gray-400">Santé, chômage, patronales</p>
          </div>
        </div>
      </div>

      <div
        class="mt-8 rounded-xl border-l-4 border-red-400 bg-red-50 p-5 dark:bg-red-900/10"
      >
        <p class="font-semibold text-red-700 dark:text-red-400">
          "Tu investis 940 € par mois dans un produit financier... sans connaître le rendement."
        </p>
      </div>
    </div>

    <!-- Section 3 : Le manque à gagner -->
    <div class="bg-gray-50 dark:bg-gray-900/50">
      <div class="mx-auto max-w-4xl px-6 py-20">
        <div class="mb-6 flex items-center gap-3">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
            >3</span
          >
          <h2 class="text-2xl font-bold sm:text-3xl">Le manque à gagner colossal</h2>
        </div>
        <p class="mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
          Le même dev à <strong class="text-gray-800 dark:text-gray-200">45k € brut/an</strong> (~35k net). Il cotise environ
          <strong class="text-gray-800 dark:text-gray-200">11 300 €/an</strong> pour la retraite. Sur 40 ans :
        </p>

        <div class="mb-10 grid gap-4 sm:grid-cols-3">
          <div class="rounded-2xl border-2 border-red-300 bg-white p-6 dark:border-red-800 dark:bg-gray-800">
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Total cotisé sur 40 ans</p>
            <p class="text-3xl font-bold text-red-600">~450 000 €</p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Pension estimée</p>
            <p class="text-3xl font-bold">1 500 - 1 800 €<span class="text-lg">/mois</span></p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Capital transmissible</p>
            <p class="text-3xl font-bold text-red-600">0 €</p>
            <p class="mt-2 text-sm text-gray-400">Le capital est perdu au décès</p>
          </div>
        </div>

        <div
          class="rounded-xl border-l-4 border-red-400 bg-red-50 p-5 dark:bg-red-900/10"
        >
          <p class="font-semibold text-red-700 dark:text-red-400">
            "Tu as mis 450k, on te rend un abonnement Netflix version senior."
          </p>
        </div>
      </div>
    </div>

    <!-- Section 4 : Le modèle freelance -->
    <div class="mx-auto max-w-4xl px-6 py-20">
      <div class="mb-6 flex items-center gap-3">
        <span
          class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
          >4</span
        >
        <h2 class="text-2xl font-bold sm:text-3xl">Le modèle freelance</h2>
      </div>
      <p class="mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
        En freelance, tu contrôles tes flux. Prenons un TJM de 500 €, 18 jours/mois :
      </p>

      <div class="mb-10 grid gap-6 sm:grid-cols-2">
        <div class="rounded-2xl border-2 border-primary bg-white p-6 ring-4 ring-primary/10 dark:bg-gray-800">
          <p class="mb-1 text-sm font-medium text-primary">Chiffre d'affaires</p>
          <p class="text-3xl font-bold">9 000 €<span class="text-lg">/mois</span></p>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">500 € x 18 jours</p>
        </div>
        <div class="rounded-2xl border-2 border-primary bg-white p-6 ring-4 ring-primary/10 dark:bg-gray-800">
          <p class="mb-1 text-sm font-medium text-primary">Net estimé (SASU/EURL)</p>
          <p class="text-3xl font-bold">~6 500 €<span class="text-lg">/mois</span></p>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Après charges et IS</p>
        </div>
      </div>

      <div class="mb-10 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <p class="mb-4 text-lg font-bold">Où va l'argent en freelance ?</p>
        <div class="grid gap-3 sm:grid-cols-4">
          <div class="rounded-xl bg-green-50 p-4 text-center dark:bg-green-900/10">
            <UIcon name="i-material-symbols-savings" class="mx-auto mb-2 h-8 w-8 text-green-600" />
            <p class="text-sm font-bold">ETF / Actions</p>
          </div>
          <div class="rounded-xl bg-blue-50 p-4 text-center dark:bg-blue-900/10">
            <UIcon name="i-material-symbols-apartment" class="mx-auto mb-2 h-8 w-8 text-blue-600" />
            <p class="text-sm font-bold">Immobilier</p>
          </div>
          <div class="rounded-xl bg-purple-50 p-4 text-center dark:bg-purple-900/10">
            <UIcon name="i-material-symbols-business-center" class="mx-auto mb-2 h-8 w-8 text-purple-600" />
            <p class="text-sm font-bold">Holding</p>
          </div>
          <div class="rounded-xl bg-orange-50 p-4 text-center dark:bg-orange-900/10">
            <UIcon name="i-material-symbols-rocket-launch" class="mx-auto mb-2 h-8 w-8 text-orange-600" />
            <p class="text-sm font-bold">Side business</p>
          </div>
        </div>
        <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Capital réel, transmissible, que tu contrôles.
        </p>
      </div>
    </div>

    <!-- Section 5 : Comparaison sur 30 ans -->
    <div class="bg-gray-50 dark:bg-gray-900/50">
      <div class="mx-auto max-w-4xl px-6 py-20">
        <div class="mb-6 flex items-center gap-3">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
            >5</span
          >
          <h2 class="text-2xl font-bold sm:text-3xl">Comparaison sur 30 ans</h2>
        </div>
        <p class="mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
          Freelance investissant 1 500 €/mois à 7% vs cotisations retraite d'un salarié avec un
          rendement implicite de ~1.5%.
        </p>

        <!-- Growth chart -->
        <div
          class="mb-10 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
        >
          <p class="mb-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
            Capitalisation cumulée sur 30 ans
          </p>
          <div class="h-[350px]">
            <Line :data="growthData" :options="growthOptions" />
          </div>
        </div>

        <!-- Comparison bars -->
        <div class="grid gap-6 md:grid-cols-2">
          <div
            class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <p class="mb-4 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
              Capital à 60 ans
            </p>
            <div class="h-[250px]">
              <Bar :data="comparisonCapitalData" :options="comparisonCapitalOptions" />
            </div>
          </div>
          <div
            class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <p class="mb-4 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
              Rente mensuelle estimée
            </p>
            <div class="h-[250px]">
              <Bar :data="comparisonRenteData" :options="comparisonRenteOptions" />
            </div>
          </div>
        </div>

        <!-- Profile comparison table -->
        <div class="mt-10 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-800">
                <th class="p-4 text-left font-semibold"></th>
                <th class="p-4 text-center font-semibold text-red-600">Profil A - Salarié</th>
                <th class="p-4 text-center font-semibold text-green-600">Profil B - Freelance</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
              <tr>
                <td class="p-4 font-medium">Revenu net annuel</td>
                <td class="p-4 text-center">~35 000 €</td>
                <td class="p-4 text-center font-semibold text-green-600">60 000 €+</td>
              </tr>
              <tr>
                <td class="p-4 font-medium">Investissement mensuel</td>
                <td class="p-4 text-center text-gray-400">0 € (cotisations forcées)</td>
                <td class="p-4 text-center font-semibold text-green-600">1 500 €</td>
              </tr>
              <tr>
                <td class="p-4 font-medium">Capital à 60 ans</td>
                <td class="p-4 text-center text-red-600 font-bold">0 €</td>
                <td class="p-4 text-center text-green-600 font-bold">~1 500 000 €</td>
              </tr>
              <tr>
                <td class="p-4 font-medium">Rente mensuelle</td>
                <td class="p-4 text-center">~1 700 €</td>
                <td class="p-4 text-center font-semibold text-green-600">4 000 - 5 000 €</td>
              </tr>
              <tr>
                <td class="p-4 font-medium">Capital transmissible</td>
                <td class="p-4 text-center text-red-600">Non</td>
                <td class="p-4 text-center text-green-600 font-bold">Oui, intact</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="mt-8 rounded-xl border-l-4 border-green-400 bg-green-50 p-5 dark:bg-green-900/10"
        >
          <p class="font-semibold text-green-700 dark:text-green-400">
            "Le freelance fabrique un patrimoine. Le salarié fabrique un droit conditionnel."
          </p>
        </div>
      </div>
    </div>

    <!-- Section 6 : Pourquoi 2026 -->
    <div class="mx-auto max-w-4xl px-6 py-20">
      <div class="mb-6 flex items-center gap-3">
        <span
          class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
          >6</span
        >
        <h2 class="text-2xl font-bold sm:text-3xl">Pourquoi 2026 est le bon moment</h2>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <UIcon name="i-material-symbols-gavel" class="mb-3 h-8 w-8 text-red-500" />
          <p class="font-bold">Réformes retraite tous les 5 ans</p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            L'âge de départ recule sans cesse. 64 ans aujourd'hui, 67 demain ?
          </p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <UIcon name="i-material-symbols-trending-up" class="mb-3 h-8 w-8 text-orange-500" />
          <p class="font-bold">Inflation durable</p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            L'inflation grignote le pouvoir d'achat des pensions indexées insuffisamment.
          </p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <UIcon name="i-material-symbols-smart-toy" class="mb-3 h-8 w-8 text-purple-500" />
          <p class="font-bold">IA et pression sur le salariat</p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            L'IA transforme le marché de l'emploi. Les freelances s'adaptent plus vite.
          </p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <UIcon name="i-material-symbols-globe" class="mb-3 h-8 w-8 text-blue-500" />
          <p class="font-bold">Marché mondial & télétravail</p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Accès à des clients internationaux, fiscalité en société plus avantageuse.
          </p>
        </div>
      </div>

      <div
        class="mt-8 rounded-xl border-l-4 border-primary bg-green-50 p-5 dark:bg-green-900/10"
      >
        <p class="font-semibold text-green-700 dark:text-green-400">
          "Le risque aujourd'hui, ce n'est plus d'entreprendre. Le vrai risque, c'est de
          dépendre d'un système que tu ne contrôles pas."
        </p>
      </div>
    </div>

    <!-- Section 7 : Les limites -->
    <div class="bg-gray-50 dark:bg-gray-900/50">
      <div class="mx-auto max-w-4xl px-6 py-20">
        <div class="mb-6 flex items-center gap-3">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-sm font-bold text-white"
            >!</span
          >
          <h2 class="text-2xl font-bold sm:text-3xl">Les limites (honnêteté)</h2>
        </div>
        <p class="mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
          Ce n'est pas un discours "tout le monde devrait être freelance". Il y a des réalités.
        </p>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="flex gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-5 dark:border-yellow-800/50 dark:bg-yellow-900/10">
            <UIcon name="i-material-symbols-warning" class="h-6 w-6 flex-shrink-0 text-yellow-600" />
            <div>
              <p class="font-bold text-yellow-800 dark:text-yellow-400">Instabilité des revenus</p>
              <p class="mt-1 text-sm text-yellow-700 dark:text-yellow-500">
                Pas de salaire garanti chaque mois.
              </p>
            </div>
          </div>
          <div class="flex gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-5 dark:border-yellow-800/50 dark:bg-yellow-900/10">
            <UIcon name="i-material-symbols-warning" class="h-6 w-6 flex-shrink-0 text-yellow-600" />
            <div>
              <p class="font-bold text-yellow-800 dark:text-yellow-400">Discipline obligatoire</p>
              <p class="mt-1 text-sm text-yellow-700 dark:text-yellow-500">
                L'investissement régulier demande de la rigueur.
              </p>
            </div>
          </div>
          <div class="flex gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-5 dark:border-yellow-800/50 dark:bg-yellow-900/10">
            <UIcon name="i-material-symbols-warning" class="h-6 w-6 flex-shrink-0 text-yellow-600" />
            <div>
              <p class="font-bold text-yellow-800 dark:text-yellow-400">Pas pour tout le monde</p>
              <p class="mt-1 text-sm text-yellow-700 dark:text-yellow-500">
                Certains métiers / profils ne s'y prêtent pas.
              </p>
            </div>
          </div>
          <div class="flex gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-5 dark:border-yellow-800/50 dark:bg-yellow-900/10">
            <UIcon name="i-material-symbols-warning" class="h-6 w-6 flex-shrink-0 text-yellow-600" />
            <div>
              <p class="font-bold text-yellow-800 dark:text-yellow-400">Risques de marché</p>
              <p class="mt-1 text-sm text-yellow-700 dark:text-yellow-500">
                Les investissements ne sont pas garantis à 7%/an.
              </p>
            </div>
          </div>
        </div>

        <div
          class="mt-8 rounded-xl border-l-4 border-gray-400 bg-white p-5 dark:bg-gray-800"
        >
          <p class="font-semibold text-gray-700 dark:text-gray-300">
            "Mais financièrement, mathématiquement, le modèle est supérieur."
          </p>
        </div>
      </div>
    </div>

    <!-- Conclusion -->
    <div class="mx-auto max-w-3xl px-6 py-20 text-center">
      <h2 class="mb-6 text-3xl font-bold sm:text-4xl">Conclusion</h2>

      <div class="mb-10 space-y-6">
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Le salariat te <strong class="text-red-500">promet</strong> une retraite.
        </p>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Le freelance te <strong class="text-primary">permet</strong> de la construire.
        </p>
      </div>

      <div
        class="rounded-2xl border-2 border-primary bg-green-50 p-8 dark:bg-green-900/10"
      >
        <p class="text-2xl font-bold text-primary">
          "La vraie retraite moderne, ce n'est pas un âge légal. C'est un portefeuille."
        </p>
      </div>
    </div>

    <!-- CTA Newsletter -->
    <div class="bg-gray-50 dark:bg-gray-900/50">
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
  </div>
</template>

<style scoped>
.page-grid {
  background-size: 80px 80px;
  background-image: linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}
.dark .page-grid {
  background-image: linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.25s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
