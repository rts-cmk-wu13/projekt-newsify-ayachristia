import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    base: '/',
    build: {
        mpa: true,
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                saved: resolve(__dirname, 'pages/saved.html'),
                popular: resolve(__dirname, 'pages/popular.html'),
                settings: resolve(__dirname, 'pages/settings.html'),
                splash: resolve(__dirname, 'pages/splash.html'),
                onboarding: resolve(__dirname, 'pages/onboarding.html'),
                login: resolve(__dirname, 'pages/login.html'),
            },
            output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
            }
        }
    },
    //proxy server nødvendig for at køre fetch gennem server da det er til brug via server, da der er mere info og følsomme evt ældre data, derfor sender archive api ikke cors headers med der giver adgang
    server: {
        proxy: {
            '/nyt': {
                target: 'https://api.nytimes.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/nyt/, ''),
            }
        }
    },
},
)