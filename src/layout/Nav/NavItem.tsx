import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'

type NavItemProps = {
    to: string, 
    onClick?: () => void,
    textSize?: string,
    children: ReactNode,
}

export default function NavItem({children, onClick, textSize="text-2xl", to}: NavItemProps) {

  const router = useRouter();
  const active = router.pathname == to;
  return (
    <li onClick={onClick}>
        <Link className={`link ${active ? 'active-link' : ''} ${textSize}`} href={to}>{children}</Link>
    </li>
  )
}
