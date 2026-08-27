---
title: "@sveltejs/kit"
---

```js
import {
	Server,
	VERSION,
	error,
	fail,
	invalid,
	isActionFailure,
	isHttpError,
	isRedirect,
	isValidationError,
	json,
	normalizeUrl,
	redirect,
	text
} from '@sveltejs/kit';
```

## Server

```js
class Server {…}
```
```js
constructor(manifest: SSRManifest);
```
```js
init(options: ServerInitOptions): Promise<void>;
```
```js
respond(request: Request, options: RequestOptions): Promise<Response>;
```

## VERSION
```js
const VERSION: string;
```
Throws an error with a HTTP status code and an optional message. When called during request handling, this will cause SvelteKit to return an error response without invoking

