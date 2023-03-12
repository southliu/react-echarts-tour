import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 全局组件路径
const COMP_PATH = '/src/components/'
// 页面路径
const PAGES_PATH = '/src/pages/'
// 布局路径
const LAYOUTS_PATH = '/src/layouts'
// 全局组件的前缀
const COMP_PREFIX = 'components_'
// 布局组件的前缀
const LAYOUTS_NAME = 'layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    open: true
  },
  // 去除console和debugger
  esbuild: {
    pure: ["console.log", "debugger"]
  },
  build: {
    chunkSizeWarningLimit: 1000, // 大于1000k才警告
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]'
      },
      manualChunks(id) {
        // JS模块
        if (id.includes('node_modules')) {
          return splitJSModules(id)
        }

        // 布局
        if (id.includes(LAYOUTS_PATH)) {
          return LAYOUTS_NAME
        }

        // 公共组件
        if (id.includes(COMP_PATH)) {
          const result = id
            .split(COMP_PATH)[1]
            .split('/')[0]

          return `${COMP_PREFIX}${result}`
        }

        // 页面分包
        if (id.includes(PAGES_PATH)) {
          return splitPage(id)
        }
      }
    }
  }
})

/**
 * JS模块分包
 * @param id - 标识符
 */
function splitJSModules(id: string) {
  // pnpm兼容
  const pnpmName = id.includes('.pnpm') ? '.pnpm/' : ''
  const fileName = `node_modules/${pnpmName}`

  let result = id
    .split(fileName)[1]
    .split('/')[0]

  if (result.includes('@')) {
    const first = result.indexOf('@')
    if (first > 0) {
      result = result.substring(0, first)
    } else {
      const second = result.indexOf('@', 1)
      result = result.substring(0, second)
    }
  }

  return result
}

/**
 * 页面分包处理
 * @param id - 标识符
 */
function splitPage(id: string) {
	// 打包页面文件的前缀
	const PAGE_PREFIX = 'page_'
	// 页面路径
	const PAGES_PATH = '/src/pages/'
  const fileName = PAGES_PATH
  const file = id.split(fileName)[1]
  const categorize = file?.split('/')?.[0] || ''
  let result = file?.split('/')?.[1] || 'index'

  if (result.includes('/')) result = result?.split('/')[0] || ''
  if (result.includes('.tsx')) result = result.substring(0, result.length - 4)

  // 组件
  if (result === 'components' || result === 'component') {
    let compName = '/components/'
    if (id.includes('/component/')) compName = '/component/'

    let comResult = id.split(compName)[1]
    if (comResult.includes('/')) comResult = comResult?.split('/')[0] || ''
    if (comResult.includes('.tsx')) comResult = comResult.substring(0, comResult.length - 4)

    return `${PAGE_PREFIX}${categorize}_comp_${comResult}`
  }

  return `${PAGE_PREFIX}${categorize}_${result}`
}