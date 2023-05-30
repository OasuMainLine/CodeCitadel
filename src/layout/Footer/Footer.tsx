import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItem from "../Nav/NavItem";
import SocialIcon, { Icon } from "../Nav/SocialIcon";
export default function Footer() {
	return (
		<div className="grid h-fit w-full grid-rows-[60%_40%] bg-white md:h-52">
			<div className="flex h-full w-full flex-col items-center gap-8 bg-footerBlue px-4 py-10 md:flex-row md:gap-0 md:px-36 portrait:px-6">
				<div className="relative aspect-video h-60 w-[12rem] md:h-[5.25rem] md:w-[12.875rem]">
					<Link href="/">
						<Image
							src="/logo.png"
							alt="Code Citadel Logo"
							fill={true}
							className="object-contain"
						/>
					</Link>
				</div>

				<ul className="flex flex-col gap-2 text-center md:mx-auto md:flex-row md:gap-8 md:text-left">
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
			<div className="flex h-full w-full items-center justify-between bg-footerLightBlue px-4 md:px-36">
				<p className="text-center font-sans text-base font-bold">
					This website was programmed and <br /> designed by Orlando Sandi
				</p>
				<p className="text-center font-sans text-base font-bold">
					©2023 CodeCitadel
					<br />
					All Rights Reserved
				</p>
			</div>
		</div>
	);
}
