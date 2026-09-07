import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	publicDir: false,
	build: {
		lib: {
			entry: resolve(__dirname, 'lib/index.js'),
			fileName: 'keycode',
			name: 'keycode',
			formats: ['es', 'umd'],
		},
		outDir: './dist',
		minify: true,
	},
});
