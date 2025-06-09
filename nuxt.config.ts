import { defineNuxtConfig, type NuxtConfig } from 'nuxt/config';

// Defines configuration.
const config: NuxtConfig = {};

// Register Nuxt modules.
config.modules = ['@nuxtjs/i18n', '@nuxtjs/device', '@nuxt/ui-pro', 'nuxt-viewport', 'nuxt-lodash'];

// Static CSS files to load.
config.css = ['~/assets/css/main.css'];

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
  },
  serverAssets: [
    {
      baseName: 'sql',
      dir: './storage/queries'
    }
  ]
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
