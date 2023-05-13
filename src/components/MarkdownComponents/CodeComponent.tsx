import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as CodeTheme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import ClipboardButton from "@/components/ClipboardButton";
import LanguageIcon, { ICON_KEY } from "../LanguageIcon";

export const CodeComponent = ({
	node,
	inline,
	className,
	children,
	...props
}: CodeProps) => {
	const match = /language-(\w+)/.exec(className || "");
	const filenameRegex = /^\/\/filename:([^/].*)/;

	let childrenStr = String(children);
	const filename = filenameRegex.exec(
		childrenStr.slice(0, childrenStr.indexOf("\n"))
	);

	if (filename) {
		childrenStr = childrenStr.slice(childrenStr.indexOf("\n") + 1);
	}
	return !inline && match ? (
		<div className="relative [&>button]:hidden [&:hover>button]:flex not-prose bg-[#1e1e1e] custom-scroll">
			{filename && (
				<span className="w-full h-8 mb-1 -top-6 text-sm pt-1 flex pl-5 items-center gap-2 text-gray-300 bg-slate-700 font-sans">
					{match && match.length >= 1 && (
						<LanguageIcon language={match[1] as ICON_KEY} />
					)}
					{filename[1]}{" "}
				</span>
			)}
			<ClipboardButton targetText={childrenStr} />
			<SyntaxHighlighter
				{...props}
				children={childrenStr.replace(/\n$/, "")}
				style={CodeTheme}
				language={match[1]}
				PreTag="div"
			/>
		</div>
	) : (
		<code {...props} className={className}>
			{children}
		</code>
	);
};
