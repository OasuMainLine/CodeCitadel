import Head from "next/head";
import React from "react";

export default function NotFound() {
	return (
		<>
			<Head>
				<title>Not Found | Code Citadel</title>
			</Head>
			<div className="mx-auto py-20">
				<h1 className="text-center font-mono text-3xl">
					{" "}
					<span className="font-bold text-alt">404 CODE !!!</span> <br />
					The requested page don&apos;t exist
				</h1>
			</div>
		</>
	);
}
