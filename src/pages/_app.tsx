import "@/styles/globals.css";

import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Quicksand } from "next/font/google";
import localFont from "next/font/local";
import Layout from "@/layout/Layout";

import DefaultHead from "@/components/DefaultHead";
import PostsContexts from "@/contexts/PostsContexts";
import { Analytics } from "@vercel/analytics/react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const quicksand = Quicksand({
	variable: "--font-quicksand",
	subsets: ["latin", "latin-ext"],
});
const almaMono = localFont({
	src: [
		{
			path: "../styles/fonts/almamono-bold-webfont.woff2",
			weight: "700",
			style: "bold",
		},
		{
			path: "../styles/fonts/almamono-bold-webfont.woff",
			weight: "700",
			style: "bold",
		},
		{
			path: "../styles/fonts/almamono-regular-webfont.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../styles/fonts/almamono-regular-webfont.woff",
			weight: "400",
			style: "normal",
		},
		{
			path: "../styles/fonts/almamono-thin-webfont.woff2",
			weight: "100",
			style: "thin",
		},
		{
			path: "../styles/fonts/almamono-light-webfont.woff2",
			weight: "300",
			style: "light",
		},
		{
			path: "../styles/fonts/almamono-light-webfont.woff",
			weight: "300",
			style: "light",
		},
		{
			path: "../styles/fonts/almamono-thin-webfont.woff",
			weight: "100",
			style: "thin",
		},
		{
			path: "../styles/fonts/almamono-heavy-webfont.woff2",
			weight: "800",
			style: "extra-bold",
		},
		{
			path: "../styles/fonts/almamono-heavy-webfont.woff",
			weight: "800",
			style: "extra-bold",
		},
	],
	variable: "--font-almamono",
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
	return (<>
		
			<PostsContexts>
				<div className={`${quicksand.variable} ${almaMono.variable} font-sans `}>
					<DefaultHead title={Component.displayName} />
					{getLayout(<Component {...pageProps} />)}
				</div>
		</PostsContexts>
		<Analytics />
	</>
	);
}
