import Head from "next/head";
import React from "react";
import Meta from "./Meta";

type HeadProps = {
	title?: string;
};

export default function DefaultHead({ title }: HeadProps) {
	return (
		<>
			<Head>
				<title>{`${title} | Code Citadel`}</title>
				<link
					rel="shortcut icon"
					href="/favicons/favicon-32x32.png"
					type="image/png"
				/>
				<meta name="keywords" content="blog, programming, tech" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />

				<meta
					name="description"
					content="This blog is aimed to programmers and computer science enthuasiasts"
				/>
				<meta property="og:image" content="https://thecodecitadel.com/public/logo.png" />
				<meta property="og:url" content="https://thecodecitadel.com/home" />
			</Head>
		</>
	);
}
