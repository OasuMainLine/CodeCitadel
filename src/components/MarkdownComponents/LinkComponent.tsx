import Link from "next/link";

export const LinkComponent = ({
	href, children, ...props
}: React.DetailedHTMLProps<
	React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement
>) => {
	if (href?.includes("codecitadel")) {
		return <Link href={href}>{children}</Link>;
	} else {
		return (
			<a href={href} target="_blank">
				{children}
			</a>
		);
	}
};
