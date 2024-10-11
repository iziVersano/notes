// jest.setup.ts

// Mock import.meta.env
Object.defineProperty(global, 'import.meta', {
  value: {
    env: {
      VITE_API_BASE_URL: 'http://localhost:5173/api',
      VITE_APP_ENV: 'test',
    },
  },
});
