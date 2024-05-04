// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    extends: ['@nuxt/ui-pro'],
    modules: ["@nuxt/ui", '@vueuse/motion/nuxt', "@nuxt/content", "@nuxt/image"],
    runtimeConfig: {


        // Public keys that are exposed to the client
        public: {
            email: 'harternicolas134@gmail.com'
        }
    }
})