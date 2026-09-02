---
title: "@sveltejs/node/polyfills"
sidebar:
    order: 4
slug: reference/@sveltejs-kit-node-polyfills
---
```js
import { installPolyfills } from '@sveltejs/kit/node/polyfills';
```
## installPolyfills
Make various web APIs available as globals:
- `crypto`
- `File`
```js
function installPolyfills(): void;
```