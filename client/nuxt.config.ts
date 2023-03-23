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
          'process.env.BROWSER': true,
      },
  },
  runtimeConfig: {
    public: {
      IMGBB_API: 'ce1628672996251db11cbd283f5e0af7',
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})