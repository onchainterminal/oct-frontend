import { defineNuxtConfig, type NuxtConfig } from 'nuxt/config';

// Defines config.
const config: NuxtConfig = {};

// Register Nuxt modules.
config.modules = [
  '@nuxtjs/tailwindcss',
  '@nuxtjs/i18n',
  'nuxt-viewport',
  'nuxt-quasar-ui',
  'nuxt-lodash',
  'nuxt-swiper'
];

// Static css files to load.
config.css = ['quasar/css'];

// Dev tools settings.
config.devtools = {
  enabled: true
};

// I18n custom settings.
config.i18n = {
  bundle: {
    optimizeTranslationDirective: false
  }
};

// Nitro server settings.
config.nitro = {
  experimental: {
    websocket: true
  }
};

// Register Nuxt future.
config.future = {
  compatibilityVersion: 4
};

// Dev Server settings.
config.devServer = {
  port: 3333
};

// Presets compatibility date.
config.compatibilityDate = '2025-01-01';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(config);
