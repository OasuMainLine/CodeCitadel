import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItem from "../Nav/NavItem";
import SocialIcon, { Icon } from "../Nav/SocialIcon";
export default function Footer() {
	return (
		<div className="w-full h-fit md:h-52 bg-white grid grid-rows-[60%_40%]">
			<div className="bg-footerBlue w-full h-full flex px-4 md:px-36 items-center gap-8 flex-col md:flex-row md:gap-0 py-10">
				<div className="w-[12rem] h-60 md:w-[12.875rem] md:h-[5.25rem] relative aspect-video">
					<Link href="/">
						<Image
							src="/logo.png"
							alt="Code Citadel Logo"
							fill={true}
							className="object-contain"
						/>
					</Link>
				</div>

				<ul className="flex gap-2 md:gap-8 text-center md:text-left md:mx-auto md:flex-row flex-col">
					<NavItem to="/" textSize="text-2xl md:text-xl">
						Home
					</NavItem>
					<NavItem to="/about" textSize="text-2xl md:text-xl">
						About
					</NavItem>
					<NavItem to="/blog" textSize="text-2xl md:text-xl">
						Blog
					</NavItem>
				</ul>

				<ul className="flex gap-2 md:ml-10">
					<li>
						<SocialIcon icon={Icon.LINKENDL} />
					</li>
					<li>
						<SocialIcon icon={Icon.GMAIL} />
					</li>
				</ul>
			</div>
			<div className="bg-footerLightBlue w-full h-full px-4 md:px-36 flex items-center justify-between">
				<p className="text-center text-base font-sans font-bold">
					This website was programmed and <br /> designed by me
				</p>
				<p className="text-center text-base font-sans font-bold">
					©2023 CodeCitadel
					<br />
					All Rights Reserved
				</p>
			</div>
		</div>
	);
}
