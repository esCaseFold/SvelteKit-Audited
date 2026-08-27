---
title: "@sveltejs/kit"
---

//```js {2-3}
//function demo() {
  // This line (#2) and the next one are highlighted
  //return 'This is line #3 of this snippet';
//}
//```


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

## error
Throws an error with a HTTP status code and an optional message. When called during request handling, this will cause SvelteKit to return an error response without invoking `handleError`. Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
```js
function error(status: number, body: App.Error): never;
```
```js
function error(
	status: number,
	body?: {
		message: string;
	} extends App.Error
		? App.Error | string | undefined
		: never
): never;
```
## fail
Create an `ActionFailure` object. Call when form submission fails.
```js
function fail(status: number): ActionFailure<undefined>;
```
```js
function fail<T = undefined>(
	status: number,
	data: T
): ActionFailure<T>;
```
## invalid 
:::note
AVAILABLE SINCE 2.47.3
:::
Use this to throw a validation error to imperatively fail form validation. Can be used in combination with `issue` passed to form actions to create field-specific issues.

## isActionFailure
Checks whether this is an action failure thrown by `fail`.
```js
function isActionFailure(e: unknown): e is ActionFailure;
```
## isHttpError
Checks whether this is an error thrown by `error`.
```js
function isHttpError<T extends number>(
	e: unknown,
	status?: T
): e is HttpError_1 & {
	status: T extends undefined ? never : T;
};
```
## isRedirect
Checks whether this is a redirect thrown by `redirect`.
```js
function isRedirect(e: unknown): e is Redirect_1;
```
## isValidationError
:::note
AVAILABLE SINCE 2.47.3
:::
Checks whether this is an validation error thrown by `invalid`.
```js
function isValidationError(e: unknown): e is ActionFailure;
```
## json
Create a JSON `Response` object from the supplied data.
```js
function json(data: any, init?: ResponseInit): Response;
```
## normalizeUrl
:::note
AVAILABLE SINCE 2.18.0
:::
Strips possible SvelteKit-internal suffixes and trailing slashes from the URL pathname. Returns the normalized URL as well as a method for adding the potential suffix back based on a new pathname (possibly including search) or URL.
```js
import { normalizeUrl } from '@sveltejs/kit';

const { url, denormalize } = normalizeUrl('/blog/post/__data.json');
console.log(url.pathname); // /blog/post
console.log(denormalize('/blog/post/a')); // /blog/post/a/__data.json
```
```js
function normalizeUrl(url: URL | string): {
	url: URL;
	wasNormalized: boolean;
	denormalize: (url?: string | URL) => URL;
};
```
## redirect
Redirect a request. When called during request handling, SvelteKit will return a redirect response. Make sure you’re not catching the thrown redirect, which would prevent SvelteKit from handling it.

Most common status codes:

- `303 See Other`: redirect as a GET request (often used after a form POST request)
- `307 Temporary Redirect`: redirect will keep the request method
- `308 Permanent Redirect`: redirect will keep the request method, SEO will be transferred to the new page

[See all redirect status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages)
```js
function redirect(
	status:
		| 300
		| 301
		| 302
		| 303
		| 304
		| 305
		| 306
		| 307
		| 308
		| ({} & number),
	location: string | URL
): never;
```
## text
Create a Response object from the supplied body.

function text(body: string, init?: ResponseInit): Response;
Action
Shape of a form action method that is part of export const actions = {...} in +page.server.js. See form actions for more information.

type Action<
	Params extends AppLayoutParams<'/'> =
		AppLayoutParams<'/'>,
	OutputData extends Record<string, any> | void = Record<
		string,
		any
	> | void,
	RouteId extends AppRouteId | null = AppRouteId | null
> = (
	event: RequestEvent<Params, RouteId>
) => MaybePromise<OutputData>;
ActionFailure
interface ActionFailure<T = undefined> {…}
status: number;
data: T;
[uniqueSymbol]: true;
ActionResult
When calling a form action via fetch, the response will be one of these shapes.


<form method="post" use:enhance={() => {
	return ({ result }) => {
		// result is of type ActionResult
	};
}}
type ActionResult<
	Success extends Record<string, unknown> | undefined =
		Record<string, any>,
	Failure extends Record<string, unknown> | undefined =
		Record<string, any>
> =
	| { type: 'success'; status: number; data?: Success }
	| { type: 'failure'; status: number; data?: Failure }
	| { type: 'redirect'; status: number; location: string }
	| { type: 'error'; status?: number; error: any };
Actions
Shape of the export const actions = {...} object in +page.server.js. See form actions for more information.

type Actions<
	Params extends AppLayoutParams<'/'> =
		AppLayoutParams<'/'>,
	OutputData extends Record<string, any> | void = Record<
		string,
		any
	> | void,
	RouteId extends AppRouteId | null = AppRouteId | null
> = Record<string, Action<Params, OutputData, RouteId>>;
Adapter
Adapters are responsible for taking the production build and turning it into something that can be deployed to a platform of your choosing.

interface Adapter {…}
name: string;
The name of the adapter, using for logging. Will typically correspond to the package name.
adapt: (builder: Builder) => MaybePromise<void>;
builder An object provided by SvelteKit that contains methods for adapting the app
This function is called after SvelteKit has built your app.
supports?: {…}
Checks called during dev and build to determine whether specific features will work in production with this adapter.

read?: (details: { config: any; route: { id: string } }) => boolean;
details.config The merged adapter-specific route config exported from the route with export const config
Test support for read from $app/server.
instrumentation?: () => boolean;
AVAILABLE SINCE v2.31.0
Test support for instrumentation.server.js. To pass, the adapter must support running instrumentation.server.js prior to the application code.
emulate?: () => MaybePromise<Emulator>;
Creates an Emulator, which allows the adapter to influence the environment during dev, build and prerendering.
AfterNavigate
The argument passed to afterNavigate callbacks.

type AfterNavigate = (Navigation | NavigationEnter) & {
	type: Exclude<NavigationType, 'leave'>;
	/**
	 * Since `afterNavigate` callbacks are called after a navigation completes, they will never be called with a navigation that unloads the page.
	 */
	willUnload: false;
};
AwaitedActions
type AwaitedActions<
	T extends Record<string, (...args: any) => any>
> = OptionalUnion<
	{
		[Key in keyof T]: UnpackValidationError<
			Awaited<ReturnType<T[Key]>>
		>;
	}[keyof T]
>;
BeforeNavigate
The argument passed to beforeNavigate callbacks.

type BeforeNavigate = Navigation & {
	/**
	 * Call this to prevent the navigation from starting.
	 */
	cancel: () => void;
};
Builder
This object is passed to the adapt function of adapters. It contains various methods and properties that are useful for adapting the app.

interface Builder {…}
log: Logger;
Print messages to the console. log.info and log.minor are silent unless Vite’s logLevel is info.
rimraf: (dir: string) => void;
Remove dir and all its contents.
mkdirp: (dir: string) => void;
Create dir and any required parent directories.
config: ValidatedConfig;
The fully resolved Svelte config.
prerendered: Prerendered;
Information about prerendered pages and assets, if any.
routes: RouteDefinition[];
An array of all routes (including prerendered)
createEntries: (fn: (route: RouteDefinition) => AdapterEntry) => Promise<void>;
fn A function that groups a set of routes into an entry point
DEPRECATED Use builder.routes instead
Create separate functions that map to one or more routes of your app.
findServerAssets: (routes: RouteDefinition[]) => string[];
Find all the assets imported by server files belonging to routes
generateFallback: (dest: string) => Promise<void>;
Generate a fallback page for a static webserver to use when no route is matched. Useful for single-page apps.
generateEnvModule: () => void;
Generate a module exposing build-time environment variables as $env/dynamic/public or $app/env/public if the app uses it.
generateManifest: (opts: { relativePath: string; routes?: RouteDefinition[] }) => string;
opts a relative path to the base directory of the app and optionally in which format (esm or cjs) the manifest should be generated
Generate a server-side manifest to initialise the SvelteKit server with.
getBuildDirectory: (name: string) => string;
name path to the file, relative to the build directory
Resolve a path to the name directory inside outDir, e.g. /path/to/.svelte-kit/my-adapter.
getClientDirectory: () => string;
Get the fully resolved path to the directory containing client-side assets, including the contents of your static directory.
getServerDirectory: () => string;
Get the fully resolved path to the directory containing server-side code.
getAppPath: () => string;
Get the application path including any configured base path, e.g. my-base-path/_app.
writeClient: (dest: string) => string[];
dest the destination folder
RETURNS an array of files written to dest
Write client assets to dest.
writePrerendered: (dest: string) => string[];
dest the destination folder
RETURNS an array of files written to dest
Write prerendered files to dest.
writeServer: (dest: string) => string[];
dest the destination folder
RETURNS an array of files written to dest
Write server-side code to dest.
copy: (
	from: string,
	to: string,
	opts?: {
		filter?(basename: string): boolean;
		replace?: Record<string, string>;
	}
) => string[];
from the source file or directory
to the destination file or directory
opts.filter a function to determine whether a file or directory should be copied
opts.replace a map of strings to replace
RETURNS an array of files that were copied
Copy a file or directory.
hasServerInstrumentationFile: () => boolean;
RETURNS true if the server instrumentation file exists, false otherwise
AVAILABLE SINCE v2.31.0
Check if the server instrumentation file exists.
instrument: (args: {
	entrypoint: string;
	instrumentation: string;
	start?: string;
	module?:
		| {
				exports: string[];
		  }
		| {
				generateText: (args: { instrumentation: string; start: string }) => string;
		  };
}) => void;
options an object containing the following properties:
options.entrypoint the path to the entrypoint to trace.
options.instrumentation the path to the instrumentation file.
options.start the name of the start file. This is what entrypoint will be renamed to.
options.module configuration for the resulting entrypoint module.
options.module.generateText a function that receives the relative paths to the instrumentation and start files, and generates the text of the module to be traced. If not provided, the default implementation will be used, which uses top-level await.
AVAILABLE SINCE v2.31.0
Instrument entrypoint with instrumentation.

Renames entrypoint to start and creates a new module at entrypoint which imports instrumentation and then dynamically imports start. This allows the module hooks necessary for instrumentation libraries to be loaded prior to any application code.

Caveats:

“Live exports” will not work. If your adapter uses live exports, your users will need to manually import the server instrumentation on startup.
If tla is false, OTEL auto-instrumentation may not work properly. Use it if your environment supports it.
Use hasServerInstrumentationFile to check if the user has a server instrumentation file; if they don’t, you shouldn’t do this.
compress: (directory: string) => Promise<void>;
directory The directory containing the files to be compressed
Compress files in directory with gzip and brotli, where appropriate. Generates .gz and .br files alongside the originals.
ClientInit
AVAILABLE SINCE 2.10.0
The init will be invoked once the app starts in the browser

type ClientInit = () => MaybePromise<void>;
Config