<script lang="ts">
  import { onMount } from 'svelte'
  import { site } from '$lib/config/site'
  import type { GiscusConfig } from '$lib/types/post'

  // change this to your giscus stuff configs
  export let config: GiscusConfig = {
    src: 'https://giscus.app/client.js',
    repo: 'valiantlynx/urara',
    repoID: 'R_kgDOJ7llog',
    category: 'General',
    categoryID: 'DIC_kwDOJ7llos4CYz8Z',
    mapping: 'pathname',
    strict: false,
    reactionsEnabled: true,
    inputPosition: 'top',
    emitMetadata: true,
    theme: 'light',
    lang: 'en'
  }

  onMount(() => {
    const giscus = document.createElement('script')
    Object.entries({
      src: config.src ?? 'https://giscus.app/client.js',
      'data-repo': config.repo,
      'data-repo-id': config.repoID,
      'data-category': config.category ?? '',
      'data-category-id': config.categoryID,
      'data-mapping': 'pathname',
      'data-reactions-enabled': config.reactionsEnabled === false ? '0' : '1',
      'data-input-position': config.inputPosition === 'top' ? 'top' : 'bottom',
      'data-theme': config.theme ?? 'preferred_color_scheme',
      'data-lang': config.lang ?? site.lang ?? 'en',
      'data-loading': config.loading ?? 'lazy',
      crossorigin: 'anonymous',
      async: ''
    }).forEach(([key, value]) => giscus.setAttribute(key, value))
    setTimeout(() => {
      const observer = new MutationObserver(() => {
        document.getElementById('giscus-loading')!.remove()
        observer.disconnect()
      })
      observer.observe(document.getElementById('giscus')!, {
        childList: true
      })
      document.getElementById('giscus-container')!.appendChild(giscus)
    }, 1000)
  })
</script>

<div id="giscus-container">
  <button id="giscus-loading" class="btn btn-lg flex mx-auto my-4 btn-ghost btn-circle loading" />
  <div id="giscus" class="giscus" />
</div>
