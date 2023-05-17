import Link from "next/link";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export enum LinkPillType {
	DEFAULT,
	SECONDARY,
}
type LinkPillProps = {
	type?: LinkPillType;
	to: string;
	children: ReactNode;
};

export default function LinkPill({
	type = LinkPillType.DEFAULT,
	to,
	children,
}: LinkPillProps) {
	let border = "";
	let background = "";
	switch (type) {
		case LinkPillType.DEFAULT:
			border = "border-secondary";

			break;
		case LinkPillType.SECONDARY:
			border = "border-alt";

			break;
	}

	return (
		<motion.div
			whileHover={{ scale: 1.2 }}
			className={`w-screen md:w-[20vw] md:portrait:w-[15vw] max-w-[17.75rem] overflow-visible transition-colors h-10 flex items-center justify-center font-mono text-base border-2 rounded-[11px] ${border} ${background}`}
		>
			{children}
		</motion.div>
	);
}
