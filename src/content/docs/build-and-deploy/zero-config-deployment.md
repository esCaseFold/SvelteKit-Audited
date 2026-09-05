---
title: Zero-config Deployment
sidebar:
    order: 3
slug: build-and-deploy/adapter-auto
---
When you create a new SvelteKit project with `npx sv create`, it installs [`adapter-auto`](https://github.com/sveltejs/kit/tree/main/packages/adapter-auto) by default. This adapter automatically installs and uses the correct adapter for supported environments when you deploy:

- [`@sveltejs/adapter-cloudflare`](https://svelte.dev/docs/kit/adapter-cloudflare) for [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [`@sveltejs/adapter-netlify`](https://svelte.dev/docs/kit/adapter-netlify) for [Netlify](https://netlify.com/)
- [`@sveltejs/adapter-vercel`](https://svelte.dev/docs/kit/adapter-vercel) for [Vercel](https://vercel.com/)
- [`svelte-adapter-azure-swa`](https://github.com/geoffrich/svelte-adapter-azure-swa) for [Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [`svelte-kit-sst`](https://github.com/sst/v2/tree/master/packages/svelte-kit-sst) for [AWS via SST](https://sst.dev/docs/start/aws/svelte)
- [`@sveltejs/adapter-node`](/build-and-deploy/adapter-node) for [Google Cloud Run](https://cloud.google.com/run)

It's recommended to install the appropriate adapter to your `devDependencies` once you've settled on a target environment, since this will add the adapter to your lockfile and slightly improve install times on CI.

## Environment-specific Configuration

To add configuration options, such as `{ edge: true }` in [`adapter-vercel`](https://svelte.dev/docs/kit/adapter-vercel) and [`adapter-netlify`](https://svelte.dev/docs/kit/adapter-netlify), you must install the underlying adapter — `adapter-auto` does not take any options.

## Adding Community Adapters

You can add zero-config support for additional adapters by editing [adapters.js](https://github.com/sveltejs/kit/blob/main/packages/adapter-auto/adapters.js) and opening a pull request.