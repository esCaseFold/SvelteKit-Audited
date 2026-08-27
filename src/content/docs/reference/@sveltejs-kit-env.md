---
title: "@sveltejs/kit/env"
sidebar:
    order: 2
---
```js
import { defineEnvVars } from '@sveltejs/kit/env';
```
## defineEnvVars
Utility for defining [environment variables](https://svelte.dev/docs/kit/environment-variables), which are made available via `$app/env/public` and `$app/env/private`.
```js
function defineEnvVars<
	T extends Record<
		string,
		import('@sveltejs/kit').EnvVarConfig<any>
	>
>(variables: T): T;
```