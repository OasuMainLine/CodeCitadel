import "@/styles/globals.css";

import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Quicksand } from "next/font/google";
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

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
	return (
		<PostsContexts>
			<div className={`${quicksand.variable} font-sans `}>
				<DefaultHead title={Component.displayName} />
				{getLayout(<Component {...pageProps} />)}

				<Analytics />
			</div>
		</PostsContexts>
	);
}
