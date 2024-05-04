<script setup>
const experiences = [
  {
    year: 'Today',
    job: 'Web Developer',
    description: "Significant contribution to the development and improvement of the Hoplunch website, using the Nuxt.js framework. Optimized front-end component logic for improved user experience.\n Active participation in team meetings, contributing ideas and suggestions to improve the site\'s UI/UX.",
    company: 'Hoplunch',
    contractType: 'Apprenticeship',
    img: {
      url: 'https://media.licdn.com/dms/image/C4D0BAQHwjG056x0Hnw/company-logo_100_100/0/1630573803410/hoplunch_logo?e=1723075200&v=beta&t=4dq8ltyeCJmJyDFyRbSfn-RdVBfEbLkrxv-tMW6MgJo',
      alt: 'Hoplunch logo'
    },
    technologies: [
      {
        name: 'Vue.js',
        icon: 'i-devicon-vuejs',
      },
      {
        name: 'Nuxt.js',
        icon: 'i-logos-nuxt-icon',
      },
      {
        name: 'Tailwind CSS',
        icon: 'i-logos-tailwindcss-icon',
      }
    ],
    works: [
      {
        name: 'Hoplunch',
        url: 'https://hoplunch.com'
      }
    ]
  },
  {
    year: '2023',
    job: 'Web Developer',
    description: "Created several operational Wordpress sites with custom themes for well-known Irish companies, including Mcorm and Natural Stockcare, as well as international companies such as Indorama Ventures.\n" +
        "Collaborated with designers to translate their vision into responsive web interfaces for all devices.\n" +
        "Directed website development from concept to launch, demonstrating expertise in independent web development.",
    company: 'Hoplunch',
    contractType: 'Freelance',
    img: {
      url: 'https://media.licdn.com/dms/image/C4E0BAQEHT5nDyjyJKQ/company-logo_200_200/0/1630630531607/bradleythebrandagency_logo?e=2147483647&v=beta&t=C-3smmKgbtxrLDvLU2UfIVykmJNz4gBzOhkVzMy4kBo',
      alt: 'Hoplunch logo'
    },
    technologies: [
      {
        name: 'Wordpress',
        icon: 'i-bi-wordpress',
      },
      {
        name: 'Php',
        icon: 'i-devicon-php',
      },
      {
        name: 'Tailwind CSS',
        icon: 'i-logos-tailwindcss-icon',
      }
    ],
    works: [
      {
        name: 'Mcorm.com',
        url: 'https://mcorm.com/'
      },
      {
        name: 'Naturalstockcare.com',
        url: 'https://naturalstockcare.com/'
      }
    ]
  },
  {
    year: '2022',
    job: 'Web Developer ',
    description: "Development and production of PHP/JQuery/Oracle applications.\n" +
        "Documentation writing.",
    company: 'Caisse d\'Epargne Grand Est Europe',
    contractType: 'Internship',
    img: {
      url: 'https://pbs.twimg.com/profile_images/1719989559272857600/3DO4qKF-_400x400.jpg',
      alt: 'Hoplunch logo'
    },
    technologies: [
      {
        name: 'Php',
        icon: 'i-devicon-php',
      },
      {
        name: 'JQuery',
        icon: 'i-devicon-jquery',
      },
    ]
  },
]
</script>

<template>
  <div class="relative">
    <h2 class="text-4xl font-bold text-center mb-20">My Experiences</h2>

    <div class="absolute h-[1600px] top-16   w-1 rounded-2xl bg-gray-200 right-1/2 translate-x-1/2"></div>
    <div class="relative max-w-2xl" :class="[index % 2 === 0 ? '' : 'ml-auto']"
         v-for="(experience,index) in experiences">
      <p class="text-3xl font-bold ml-28 mb-20"
         :class="[(index % 2 === 0) ? 'text-right mr-28' : 'ml-28', (index === 0) ? 'text-primary' : '']">
        {{ experience.year }}</p>
      <ExperienceCard v-if="index % 2 === 0" v-motion-slide-visible-left :experience="experience" class="mb-20"/>
      <ExperienceCard v-else v-motion-slide-visible-right :experience="experience" class="mb-20"/>

    </div>


  </div>
</template>

<style scoped>

</style>