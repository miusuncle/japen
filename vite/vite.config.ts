import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { getRepoCommitId } from './utils';

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig(async ({ mode }) => {
  const gitCommitId = mode === 'development' ? 'local-dev' : await getRepoCommitId(8);
  process.env.VITE_GIT_COMMIT_ID = gitCommitId;

  return {
    base: '/japen',
    server: {
      host: true,
    },
    plugins: [react(), ViteMinifyPlugin()],
    esbuild: {
      legalComments: 'none',
      charset: 'ascii',
    },
    build: {
      modulePreload: false,
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['antd'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, '../src'),
        'path': 'path-browserify',
      },
    },
  };
});
