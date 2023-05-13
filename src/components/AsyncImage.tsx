import Image, { ImageProps } from "next/image";
import React, { useState } from "react";
import Spinner from "./Spinner";

export default function AsyncImage(props: ImageProps) {
	const [loading, setLoading] = useState(true);
	return (
		<>
			<Image onLoadingComplete={() => setLoading(false)}  {...props}></Image>
            {loading && <Spinner bgWidth={props.width} bgHeight={props.height}/>}
		</>
	);
}
