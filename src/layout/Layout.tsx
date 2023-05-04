 
import Meta from "@/components/Meta";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, {ReactNode, useEffect, useState} from "react";
import Footer from "./Footer";
import Nav from "./Nav";
type LayoutProps = {
	children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {

 
	return (
      <div className="min-h-screen min-w-full overflow-x-hidden bg-dark grid grid-rows-[max-content_1fr_max-content] text-iWhite">
     
        <Nav />
            {children}
        <Footer />
      </div>

	);
}
