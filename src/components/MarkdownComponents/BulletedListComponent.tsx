import { UnorderedListProps } from "react-markdown/lib/ast-to-react";

export const BulletedListComponent = ({
	children, className, ordered, depth, node, ...props
}: UnorderedListProps) => {
	return (
		<ul className={`bulleted-list list-depth-${depth} ${className ?? ""}`} {...props}>
			{children}
		</ul>
	);
};
