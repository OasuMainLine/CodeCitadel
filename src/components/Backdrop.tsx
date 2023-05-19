import React from "react";

type BackdropProps = {
	show: boolean;
	setShow: React.Dispatch<boolean>;
};

export default function Backdrop({ show, setShow }: BackdropProps) {
	return (
		<div className="fixed left-0 top-0 h-full w-full bg-black opacity-40"></div>
	);
}
