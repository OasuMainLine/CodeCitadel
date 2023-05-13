import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
type LayoutProps = {
	children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="min-h-screen max-w-full bg-dark grid grid-rows-[max-content_1fr_max-content] text-iWhite overflow-hidden">
			<Nav />
		  {children}
			<Footer />
		</div>
	);
}
