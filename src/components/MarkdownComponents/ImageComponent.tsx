import React from "react";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";

export default function ImageComponent({
	loading,
	node,
}: React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
> &
	ReactMarkdownProps) {
	const { figure, caption, ...props } = node.properties || {};
	if (figure) {
		return (
			<figure>
				<img loading="lazy" {...props} />
				<figcaption>{caption}</figcaption>
			</figure>
		);
	}
	return <img loading="lazy" {...props} />;
}
