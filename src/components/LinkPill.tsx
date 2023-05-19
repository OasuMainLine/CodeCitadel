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
			className={`flex h-10 w-screen max-w-[17.75rem] items-center justify-center overflow-visible rounded-[11px] border-2 font-mono text-base transition-colors md:w-[20vw] md:portrait:w-[15vw] ${border} ${background}`}
		>
			{children}
		</motion.div>
	);
}
