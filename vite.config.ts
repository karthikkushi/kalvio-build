import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Build output, screenshots and local Cloudflare state are not app source.
    watch: { ignored: ['**/dist/**', '**/dist-ssr/**', '**/docs/**', '**/.scratch/**', '**/.wrangler/**', '**/functions/**'] },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    // scripts/postbuild.mjs reads this to preload each demo's chunks.
    manifest: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // The build-time prerender imports every preset eagerly on purpose; the browser build still splits them.
        if (warning.code === 'INEFFECTIVE_DYNAMIC_IMPORT') return
        warn(warning)
      },
    },
  },
})
