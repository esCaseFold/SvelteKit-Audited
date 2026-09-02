// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'SvelteKit Docs Audited',
			favicon: './svelte-logo.png',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      		logo: {
        		src: './src/assets/svelte-logo.png',
      		},
			sidebar: [
				{
					label: 'Getting Started',
					items: [{ autogenerate: { directory: 'getting-started' } }],
				},
				{
					label: 'Core Concepts',
					items: [{ autogenerate: { directory: 'core-concepts' } }],
				},
				{
					label: 'Build and Deploy',
					items: [{ autogenerate: { directory: 'build-and-deploy' } }],
				},
				{
					label: 'Advanced',
					items: [{ autogenerate: { directory: 'advanced' } }],
				},
				{
					label: 'Best Practices',
					items: [{ autogenerate: { directory: 'best-practices' } }],
				},
				{
					label: 'Appendix',
					items: [{ autogenerate: { directory: 'appendix' } }],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
			components: {
	   			Header: './src/components/CustomHeader.astro',
			},
			customCss: [
				'./src/styles/custom.css'
			],
		}),
	],
});