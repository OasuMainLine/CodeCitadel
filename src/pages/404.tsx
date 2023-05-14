import Head from "next/head";
import React from "react";

export default function NotFound() {
	return (
		<>
			<Head>
				<title>Not Found | Code Citadel</title>
			</Head>
			<div className="mx-auto py-20">
				<h1 className="font-mono text-3xl text-center">
					{" "}
					<span className="text-alt font-bold">404 CODE !!!</span> <br />
					The requested page don&apos;t exist
				</h1>
			</div>
		</>
	);
}
