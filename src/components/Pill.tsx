import React, { useState } from "react";
import { CategoryType } from "../../lib/types";

type PillProps = {
	value: string;
	type: CategoryType;
	forceActive?: boolean;
	callBack?: (active: boolean, value: string) => void;
};
export default function Pill({
	value,
	type,
	forceActive = false,
	callBack,
}: PillProps) {
	const [active, setActive] = useState(forceActive);

	function toggle() {
		setActive(!active);
		if (callBack) {
			callBack(!active, value);
		}
	}
	let border = "border-2 ";
	let background;
	let notActiveHover;
	switch (type) {
		case CategoryType.OTHER:
			border += "border-primary";
			background = "bg-primary";
			notActiveHover = "hover:bg-primary";
			break;
		case CategoryType.WEB:
			border += "border-secondary";
			background = "bg-secondary";
			notActiveHover = "hover:bg-secondary";
			break;
		case CategoryType.BACKEND:
			border += "border-alt";
			background = "bg-alt";
			notActiveHover = "hover:bg-alt";
			break;
	}

	return (
		<button
			onClick={toggle}
			className={`border-2 font-mono text-sm transition-colors duration-200 ease-in-out ${border} h-fit w-fit rounded-xl px-2  py-1 ${
				active ? background : ""
			} ${!active ? `${notActiveHover} hover:bg-opacity-60` : ""}`}
		>
			{value}
		</button>
	);
}
