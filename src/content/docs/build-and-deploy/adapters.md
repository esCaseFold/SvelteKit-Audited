---
title: Adapters
sidebar:
    order: 2
--- 
Before you can deploy your SvelteKit app, you need to _adapt_ it for your deployment target. Adapters are small plugins that take the built app as input and generate output for deployment.

Official adapters exist for a variety of platforms — these are documented on the following pages:

- [`@sveltejs/adapter-cloudflare`](https://svelte.dev/docs/kit/adapter-cloudflare) for Cloudflare Workers and Cloudflare Pages
- [`@sveltejs/adapter-netlify`](https://svelte.dev/docs/kit/adapter-netlify) for Netlify
- [`@sveltejs/adapter-node`](/build-and-deploy/adapter-node/) for Node servers
- [`@sveltejs/adapter-static`](/build-and-deploy/adapter-static/) for static site generation (SSG)
- [`@sveltejs/adapter-vercel`](https://svelte.dev/docs/kit/adapter-vercel) for Vercel

Additional [community-provided adapters](https://svelte.dev/packages#sveltekit-adapters) exist for other platforms.

## Using Adapters

Your adapter is specified in `svelte.config.js`:

```js
/// file: svelte.config.js
import adapter from 'svelte-adapter-foo';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// adapter options go here
		})
	}
};

export default config;
```

## Platform-specific Context

Some adapters may have access to additional information about the request. For example, Cloudflare Workers can access an `env` object containing KV namespaces etc. This can be passed to the `RequestEvent` used in [hooks](/SvelteKit-Audited/advanced/hooks/) and [server routes](/SvelteKit-Audited/core-concepts/routing#server) as the `platform` property — consult each adapter's documentation to learn more.