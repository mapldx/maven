export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  vite: {
      esbuild: {
          target: 'esnext',
      },
      build: {
          target: 'esnext',
      },
      optimizeDeps: {
          include: ['@project-serum/anchor', '@solana/web3.js', 'buffer'],
          esbuildOptions: {
              target: 'esnext'
          }
      },
      define: {
          'process.env.BROWSER': true
      }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})