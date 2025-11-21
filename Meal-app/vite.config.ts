// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })
// // import { defineConfig, configDefaults } from 'vitest/config';
// // import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     css: true,
//     setupFiles: './vitest.setup.ts', // Optional: for custom setup
//     exclude: [...configDefaults.exclude, '**/e2e/**'], // Exclude e2e tests
//     coverage: {
//       provider: 'v8', // or 'istanbul'
//       reporter: ['text', 'json', 'html'], // Output formats
//       include: ['src/**/*.{ts,tsx}'], // Files to include in coverage
//       exclude: ['src/main.tsx'], // Files to exclude from coverage
//     },
//   },
// });

    // vite.config.ts
    /// <reference types="vitest" />
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
      plugins: [react()],
      test: {
        globals: true,
        environment: 'jsdom', // Or 'happy-dom'
        setupFiles: ['./vitest.setup.ts'], // Optional: for global setup like jest-dom
        coverage: {
          enabled: true, // Enable coverage collection
          reporter: ['text', 'json', 'html'], // Choose your desired reporters
          include: ['src/**/*.{ts,tsx,js,jsx}'], // Specify files to include in coverage
          exclude: ['node_modules/', 'dist/', '.idea/', '.git/', '.vscode/', 'coverage/'], // Exclude files/folders
        },
      },
    });

