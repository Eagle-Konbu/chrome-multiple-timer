import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, ManifestV3Export } from '@crxjs/vite-plugin'

const manifest: ManifestV3Export = {
  name: 'Multiple Timer',
  version: '1.0.0',
  manifest_version: 3,
  action: {
    default_popup: 'index.html',
  },
  icons: {
    16: 'icons/icon16.png',
    48: 'icons/icon48.png',
    128: 'icons/icon128.png',
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  build: {
    chunkSizeWarningLimit: 1024
  }
})
