import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";
import SocialIcon, { Icon } from "./SocialIcon";

export default function Nav() {
	const [showBarBox, setShowBarBox] = useState(false);
	const [showMobile, setShowMobile] = useState(false);
	return (
		<div className="h-[9.5625rem] w-screen max-w-full shadow-nav flex px-4 md:px-[4rem] 2xl:px-24 items-center">
			<div className="w-[12.875rem] h-fit relative">
				<Link href="/home">
					<Image
						src="/logo.png"
						alt="Code Citadel Logo"
						width={206}
						height={84}
					/>
				</Link>
			</div>
			<button
				className="md:hidden w-fit h-fit ms-auto"
				onClick={() => setShowMobile(true)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-16 h-16"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
			<ul
				className={`md:ms-20 gap-4 md:gap-8 transition-transform bg-dark md:bg-none md:bg-opacity-100 bg-opacity-80 flex-col flex md:items-center md:justify-center md:flex-row pr-20 pt-20 md:p-0 w-screen h-screen md:w-fit md:h-full z-10 fixed md:static items-end top-0 left-0 ease-in-out duration-300 md:transform-none ${
					showMobile ? "translate-y-0" : "-translate-y-full"
				}`}
			>
				<button className="md:hidden" onClick={() => setShowMobile(false)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-12 h-12"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
				<NavItem
					onClick={() => setShowMobile(false)}
					to="/home"
					textSize="text-4xl md:text-2xl"
				>
					Home
				</NavItem>
				<NavItem
					onClick={() => setShowMobile(false)}
					to="/about"
					textSize="text-4xl md:text-2xl"
				>
					About
				</NavItem>
				<NavItem
					onClick={() => setShowMobile(false)}
					to="/blog"
					textSize="text-4xl md:text-2xl"
				>
					Blog
				</NavItem>

				<ul className="flex gap-2 ml-10 md:hidden mt-5">
					<li>
						<SocialIcon icon={Icon.INSTAGRAM} />
					</li>
					<li>
						<SocialIcon icon={Icon.LINKENDL} />
					</li>
					<li>
						<SocialIcon icon={Icon.GMAIL} />
					</li>
				</ul>
			</ul>

			<SearchBar
				title="Search Bar"
				setShowBox={setShowBarBox}
				showBox={showBarBox}
				placeholder="Start learning"
				containerClassName="ml-auto hidden md:flex"
				onFocus={() => setShowBarBox(true)}
			/>
			<div
				className={`overlay fixed w-screen h-screen top-0 left-0 pointer-events-none`}
				onClick={() => setShowBarBox(false)}
			></div>
			<ul className="md:flex gap-2 ml-10 hidden">
				<li>
					<SocialIcon icon={Icon.LINKENDL} />
				</li>
				<li>
					<SocialIcon icon={Icon.GMAIL} />
				</li>
			</ul>
		</div>
	);
}
