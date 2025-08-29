// eslint.config.mjs
import next from 'eslint-config-next';

export default [
  // Base Next.js rules
  next,

  // Our overrides
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Let builds pass while we iterate
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'react/no-unescaped-entities': 'off',
      '@next/next/no-html-link-for-pages': 'off',
    },
  },

  // Ignore generated/build folders
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
];
