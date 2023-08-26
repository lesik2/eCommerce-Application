/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
    plugins: [
        react(),
        nodePolyfills({
            // To exclude specific polyfills, add them to this list.
            // exclude: [
            //   'fs', // Excludes the polyfill for fs and node:fs.
            // ],
            // Whether to polyfill specific globals.
            globals: {
                Buffer: true, // can also be 'build', 'dev', or false
                global: true,
                process: true,
            },
            // Whether to polyfill node: protocol imports.
            protocolImports: true,
        }),
    ],
    define: {
        global: 'window',
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
    },
    envDir: './',
});
