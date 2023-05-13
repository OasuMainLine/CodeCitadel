import Image from "next/image";
import Link from "next/link";
import React from "react";

export enum Icon {
	INSTAGRAM = "instagram icon",
	LINKENDL = "linkendl icon",
	GMAIL = "gmail icon",
}
type SocialIconProps = {
	icon: Icon;
};

const LINKS = {
	[Icon.INSTAGRAM]: "https://www.instagram.com",
	[Icon.LINKENDL]: "https://www.linkedin.com/in/orlandosandi/",
	[Icon.GMAIL]: "mailto:thecodecitadel@gmail.com",
};
const ICONS = {
	[Icon.INSTAGRAM]: "/icons/icon_instagram.png",
	[Icon.LINKENDL]: "/icons/icon_linkendl.png",
	[Icon.GMAIL]: "/icons/icon_email.png",
};
export default function SocialIcon({ icon }: SocialIconProps) {
	return (
		<a
			href={LINKS[icon]}
			className="relative before:rounded-full before:pointer-events-none before:z-0 
            before:absolute before:-top-10 before:-left-1 before:opacity-0 before:block before:content-{''} 
            before:w-12 before:h-12 before:bg-white before:hover:opacity-100 before:hover:-top-[5px] 
            before:transition-all before:ease-in-out"
			target="_blank"
		>
			<Image
				src={ICONS[icon]}
				alt={icon}
				width={36}
				height={36}
				className="z-20 w-10 h-9 object-contain hover:mix-blend-difference"
			/>
		</a>
	);
}
