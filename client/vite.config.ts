import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { VitePWA } from "vite-plugin-pwa";


// https://vitejs.dev/config/
const config = ({mode}) => {
  const env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          "short_name": "avocado.run",
          "name": "avocado.run",
          "icons": [
            {
              "src": "logo64.png",
              "sizes": "64x64 32x32 24x24 16x16",
              "type": "image/png"
            },
            {
              "src": "logo192.png",
              "type": "image/png",
              "sizes": "192x192",
              "purpose": "any maskable"
            },
            {
              "src": "logo512.png",
              "type": "image/png",
              "sizes": "512x512",
              "purpose": "any maskable"
            }
          ],
          "start_url": ".",
          "display": "standalone",
          "theme_color": "#382F33",
          "background_color": "#F5F4F3"
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,png}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                },
              }
            }
          ],
        },
      }),
    ],
    resolve: {
      alias: [
        {find: '@src', replacement: path.resolve(__dirname, './src/')},
        {find: '@config', replacement: path.resolve(__dirname, './src/config')},
        {find: '@components', replacement: path.resolve(__dirname, './src/components/')},
        {find: '@spotify', replacement: path.resolve(__dirname, './src/spotify/')},
      ],
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: Number(env.VITE_PORT),
    }
  });
}

export default config;