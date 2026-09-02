---
title: "@sveltejs/kit/node"
sidebar:
    order: 5
slug: reference/@sveltejs-kit-node
---
```js
import {
	createReadableStream,
	getRequest,
	setResponse
} from '@sveltejs/kit/node';
```
## createReadableStream
:::note
AVAILABLE SINCE 2.4.0
:::
Converts a file on disk to a readable stream
```js
function createReadableStream(file: string): ReadableStream;
```
## getRequest
```js
function getRequest({
	request,
	base,
	bodySizeLimit
}: {
	request: import('http').IncomingMessage;
	base: string;
	bodySizeLimit?: number;
}): Promise<Request>;
```
## setResponse
```js
function setResponse(
	res: import('http').ServerResponse,
	response: Response
): Promise<void>;
```