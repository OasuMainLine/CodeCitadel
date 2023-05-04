import Link from 'next/link';
import React, { ReactNode } from 'react'
import {motion} from "framer-motion"

export enum LinkPillType {
    DEFAULT,
    SECONDARY
}
type LinkPillProps = {
    type?: LinkPillType,
    to: string,
    children: ReactNode
}

export default function LinkPill({type=LinkPillType.DEFAULT, to, children}: LinkPillProps) {
  
    let border = "";
    let background = "";
    switch(type){
        case LinkPillType.DEFAULT:
            border = "border-secondary"
            background = "hover:bg-secondary";
            break;
        case LinkPillType.SECONDARY:
            border = "border-alt";
            background = "hover:bg-alt"
            break;
    }

    return (
    <motion.div whileHover={{scale: 1.2}} className={`w-[17.75rem] transition-colors h-10 flex items-center justify-center font-mono text-base underline border-2 rounded-[11px] ${border} ${background}`}>{children}</motion.div>
  )
}
