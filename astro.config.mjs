// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'SvelteKit Audited',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Guides',
					items: [{ autogenerate: { directory: 'guides' } }],
				},
				{
					label: 'Getting Started',
					items: [{ autogenerate: { directory: 'getting-started' } }],
				},
				{
					label: 'Core concepts',
					items: [{ autogenerate: { directory: 'core-concepts' } }],
				},
				{
					label: 'Build and Deploy',
					items: [{ autogenerate: { directory: 'build and deploy' } }],
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
		}),
	],
});
