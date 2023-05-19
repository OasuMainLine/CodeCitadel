import Image from "next/image";
import React, { useState } from "react";
import SearchBarBox from "./SearchBarBox";

type SearchBarProps = {
	containerClassName?: string;
	width?: number;
	height?: number;
	showBox: boolean;
	setShowBox: React.Dispatch<boolean>;
} & React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export default function SearchBar({
	containerClassName,
	setShowBox,
	width = 261,
	height = 41,
	showBox,
	...props
}: SearchBarProps) {
	const [text, setText] = useState("");

	const formattedWidth = width / 16 + "rem";
	const formmatedHeight = height / 16 + "rem";

	return (
		<div
			style={{ height: formmatedHeight, width: formattedWidth }}
			className={
				`relative z-10 flex items-center rounded-md border border-white pl-5 transition-shadow duration-200 ease-in-out hover:shadow-search` +
				" " +
				containerClassName
			}
		>
			<Image
				alt="Search Icon"
				src="/icons/icon=search.png"
				width={40}
				height={12}
				className="h-[2rem] w-5 object-contain"
			/>
			<input
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="absolute left-0 top-0 h-full w-full bg-transparent pl-12 font-mono text-sm focus-visible:border-none focus-visible:outline-none"
				{...props}
			/>
			<SearchBarBox
				setVisible={setShowBox}
				setSearchText={setText}
				search={text}
				visible={showBox}
			/>
		</div>
	);
}
