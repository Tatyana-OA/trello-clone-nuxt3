// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/ui", "@vueuse/nuxt"],
  colorMode: {
    preference: "light",
  },
  css: ["~/assets/css/vello.css"],
});
