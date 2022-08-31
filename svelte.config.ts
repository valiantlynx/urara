// sveltekit config type
import type { Config } from '@sveltejs/kit'
// svelte preprocess
import preprocess from 'svelte-preprocess'
import adapterAuto from '@sveltejs/adapter-auto'
import adapterNode from '@sveltejs/adapter-node'
import adapterStatic from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'

const defineConfig = (config: Config) => config

export default defineConfig({
  extensions: ['.svelte', ...(mdsvexConfig.extensions as string[])],
  preprocess: [mdsvex(mdsvexConfig), preprocess()],
  kit: {
    adapter: Object.keys(process.env).some(key => ['VERCEL', 'CF_PAGES', 'NETLIFY'].includes(key))
      ? adapterAuto()
      : process.env.ADAPTER === 'node'
      ? adapterNode({ out: 'build' })
      : adapterStatic({
          pages: 'build',
          assets: 'build',
          fallback: undefined
        }),
    csp: { mode: 'auto' }
  }
})
