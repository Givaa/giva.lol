import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = 'giva ─ pentester';
	const description = "Hey 👋 I'm Giovanni, a pentester";

	return {
		title,
		description,
		canonical: `https://giva.lol/${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: 'giva',
			url: `https://giva.lol/${router.asPath}`,
			type: 'website',
			images: [
				{
					url: 'https://giva.lol/banner.png',
					alt: description,
					width: 1280,
					height: 720,
				},
			],
		},
		twitter: {
			cardType: 'summary_large_image',
			handle: '@nurodev',
			site: '@nurodev',
		},
		...props,
	};
}
