// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    extends: ['@nuxt/ui-pro'],
    modules: ["@nuxt/ui", '@vueuse/motion/nuxt', "@nuxt/content", "@nuxt/image", '@nuxthq/studio', "@nuxtjs/i18n"],
    i18n: {
        strategy: 'prefix_except_default',

        vueI18n: './i18n.config.ts',
    },

})