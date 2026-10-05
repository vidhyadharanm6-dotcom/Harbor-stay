import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  server: { proxy: { '/api': 'http://localhost:5000' } },
  plugins: [react()],
  resolve: {
    alias: {
      '@exp1': path.resolve(__dirname, 'src/experiment1'),
      '@exp2': path.resolve(__dirname, 'src/experiment2'),
      '@exp3': path.resolve(__dirname, 'src/experiment3'),
      '@exp4': path.resolve(__dirname, 'src/experiment4'),
    },
  },
})
