import Image from "next/image";
import React, { ReactElement } from "react";

const ICONS = {
	javascript:
		"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
	js: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
	css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
	java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
	bash: "/icons/bash.png",
	python:
		"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
	jsx: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
	react:
		"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
	default:
		"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
};

export type ICON_KEY = keyof typeof ICONS;

type LanguageIconProps = {
	language: ICON_KEY;
};

export default function LanguageIcon({ language }: LanguageIconProps) {
	let src = "";
	if (language in ICONS) {
		src = ICONS[language];
	} else {
		src = ICONS["default"];
	}
	return <Image alt={`${language} icon`} src={src} width={16} height={16} />;
}
