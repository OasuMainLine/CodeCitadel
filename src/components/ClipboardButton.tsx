import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
type ClipboardButtonProps = {
	targetText: string;
};
export default function ClipboardButton({ targetText }: ClipboardButtonProps) {
	const [showCopied, setShowCopied] = useState(false);

	let timeoutRef = useRef<number | null>(null);
	function onCopy() {
		navigator.clipboard.writeText(targetText);
		setShowCopied(true);

		timeoutRef.current = window.setTimeout(() => {
			setShowCopied(false);
		}, 1500);
	}

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				window.clearTimeout(timeoutRef.current);
			}
		};
	}, []);
	return (
		<button
			className="not-prose absolute right-5 top-2 z-40 flex items-center gap-2 rounded-md bg-slate-600 px-4 py-1"
			onClick={onCopy}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="h-6 w-6"
			>
				<AnimatePresence mode="wait">
					{showCopied && (
						<motion.path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.5 12.75l6 6 9-13.5"
							key={"yes"}
							transition={{
								duration: 0.5,
								delay: 0.1,
							}}
							initial={{
								pathLength: 0,
							}}
							animate={{ pathLength: 1, pathOffset: 0 }}
							exit={{
								pathOffset: 1,
							}}
						/>
					)}
					{!showCopied && (
						<motion.path
							strokeLinecap="round"
							strokeLinejoin="round"
							transition={{ duration: 0.5, delay: 0.2 }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							key={"clip"}
							d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
						/>
					)}
				</AnimatePresence>
			</motion.svg>
		</button>
	);
}
