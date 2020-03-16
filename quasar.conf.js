/* eslint-disable */
// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
const envparser = require('./config/envparser');

const path = require('path');


module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'i18n',
      'vClipboard',
      'axios',
      'base32',
      'wallet',
    ],

    css: [
      'app.styl'
    ],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
      'fontawesome-v5',
    ],

    framework: {
      // iconSet: 'ionicons-v4',
      // lang: 'de', // Quasar language

      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QSeparator',
        'QCard',
        'QCardSection',
        'QMarkupTable',
        'QCircularProgress',
        'QAvatar',
        'QInput',
        'QField',
        'QScrollArea',
        'QDialog',
        'QSpace',
        'QRating',
        'QTooltip',
        'QCardActions',
        'QChip',
        'QToggle',
        'QFile',
      ],

      directives: [
        'Ripple',
        'ClosePopup',

      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'LocalStorage',
      ]
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          },
        });

        const wasmExtensionRegExp = /\.wasm$/;

        cfg.resolve.extensions.push('.wasm');

        // cfg.module.rules.forEach(rule => {
        //   (rule.oneOf || []).forEach(oneOf => {
        //   if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
        //   // make file-loader ignore WASM files
        //   oneOf.exclude.push(wasmExtensionRegExp);
        // }
        // });
        // });

        // add a dedicated loader for WASM
        cfg.module.rules.push({
        test: wasmExtensionRegExp,
        type: 'javascript/auto',
        // include: path.resolve(__dirname, './src/'),
        use: [{ loader: require.resolve('wasm-loader'), options: {} }]
      });

        // cfg.entry = "./bootstrap.js";
        // cfg.output = {
        //   path: path.resolve(__dirname, "dist"),
        //   filename: "bootstrap.js",
        // };

        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          '@': path.resolve(__dirname, './src/'),
        };
      },
      env: envparser(),
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Catalyst Node Dashboard',
        // short_name: 'Catalyst Node Dashboard',
        // description: '.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'node-dashboard'
      }
    }
  }
}
