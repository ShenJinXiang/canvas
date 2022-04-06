import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
// export default defineConfig({
// plugins: [vue()]
// })

const envResolve = (mode: string) => {
  return loadEnv(mode, process.cwd());
}

const pathResolve = (dir: string) => {
  return resolve(__dirname, '.', dir);
}

const alias = {
  '@': pathResolve('src'),
};

const project = ({ mode }) => {
  const env = envResolve(mode);
  return defineConfig({
    plugins: [
      vue(),
      // AutoImport({
      //   resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),
    ],
    base: env.VITE_APP_BASE_URL || '/',
    resolve: {
      alias,
    },
    server: {
      port: 4004,
      host: '0.0.0.0',
      open: false,
    }
  });
}

export default project;

