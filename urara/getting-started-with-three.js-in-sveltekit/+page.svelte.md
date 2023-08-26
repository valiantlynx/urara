---
title: Getting Started with Three.js in SvelteKit
created: 2023-08-26
tags: ['SvelteKit', 'Three.js', 'Web Development', 'Graphics']
image: '/getting-started-with-three.js-in-sveltekit/image.png'
alt: 'Getting Started with Three.js in SvelteKit'
summary: Learn how to integrate Three.js, a popular 3D graphics library, with SvelteKit to create stunning interactive 3D visuals for your web applications.
---

SvelteKit and Three.js are powerful tools that can be combined to create impressive 3D graphics and interactive experiences right in your web applications. In this tutorial, we'll walk you through the process of integrating Three.js into your SvelteKit project and creating a simple 3D scene.

## Prerequisites

Before we begin, make sure you have the following set up:

- Node.js and npm installed on your machine
- Basic understanding of SvelteKit and JavaScript

## Setting Up the Project

First, let's create a new SvelteKit project and navigate to its root directory in the terminal:

```bash
npx degit sveltejs/template my-threejs-project
cd my-threejs-project
```

Next, install the `three` package, use your preferred package manager:

```bash
pnpm install three
```

Types always help,but if not just remove remove the type definitions, and you should be good to go.
so let's install the `@types/three` package as well:

```bash
pnpm install -D @types/three
```

## Creating a Basic 3D Scene

In your SvelteKit project, create a new Svelte component, let's call it `ThreeScene.svelte`:

```svelte
<script lang="ts">
  // Import required modules
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import * as THREE from 'three'

  // Declare a variable to hold the container element
  let canvasContainer: any

  // Check if the code is running in the browser environment
  if (browser) {
    // Declare variables for Three.js components
    let camera: THREE.PerspectiveCamera
    let scene: THREE.Scene
    let renderer: THREE.WebGLRenderer
    let cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>

    // Run this code when the component is mounted
    onMount(() => {
      // Create a Three.js scene, camera, and renderer
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000) // Aspect ratio set to 1 initially, the first parameter is the field of view, the second is the aspect ratio, the third is the near clipping plane, and the fourth is the far clipping plane
      renderer = new THREE.WebGLRenderer()

      // Calculate initial canvas size based on the container
      const canvasWidth = canvasContainer.clientWidth
      const canvasHeight = canvasContainer.clientHeight

      // Set renderer size and add Tailwind classes to make it responsive
      renderer.setSize(canvasWidth, canvasHeight)
      renderer.domElement.classList.add('w-full', 'h-full')

      // Append renderer's canvas to the container
      canvasContainer.appendChild(renderer.domElement)

      // Create a cube geometry and material, add it to the scene
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshBasicMaterial({ color: 0x66ccff }) // Blue color
      cube = new THREE.Mesh(geometry, material)
      scene.add(cube)

      // Set camera position
      camera.position.z = 5

      // Start the animation loop
      animate()
    })

    // Function to render the scene
    const render = () => {
      renderer.clear()
      renderer.render(scene, camera)
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate the cube
      cube.rotation.x += 0.05
      cube.rotation.y += 0.05

      // Update the camera's aspect ratio and position
      camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight
      camera.updateProjectionMatrix()

      // Render the scene
      render()
    }
  }
</script>

<svelte:head>
  <title>SvelteKit + Three.js</title>
</svelte:head>
<div class="flex flex-col items-center justify-center">
  <h1 class="text-3xl font-bold mb-6 text-center">SvelteKit + Three.js</h1>
  <p class="text-center">This is a demo of how to use Three.js with SvelteKit. The cube below is rendered using Three.js.</p>
  <section bind:this={canvasContainer} class="w-36 h-36 flex justify-center items-center">
    <!-- The canvas element will be appended here -->
  </section>
</div>
```

## Running the Project

To run the project, use the following command:

```bash
pnpm run dev
```

You should see a cube rendered on the page:

![Three.js cube](SvelteKit-Three-js.png)

## Conclusion

In this tutorial, we explored how to integrate Three.js into a SvelteKit project to create a simple 3D scene. This is just the beginning – Three.js offers a wide range of possibilities for creating stunning 3D visuals and interactive experiences in your web applications.

Now that you have a basic understanding of how to get started with Three.js in SvelteKit, feel free to experiment, explore the Three.js documentation, and take your 3D web development skills to the next level!

For more advanced features and optimizations, make sure to dive deeper into both SvelteKit and Three.js documentation.

Happy coding!

vbnet
Copy code

You can replace the placeholders with actual images, more detailed explanations, and further styling to suit your blog's aesthetic.
