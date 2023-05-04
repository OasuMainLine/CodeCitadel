import Image from 'next/image'
import React, { useState } from 'react'
import SearchBarBox from './SearchBarBox';

type SearchBarProps = {
    containerClassName?: string,
    width?: number,
    height?: number,
    showBox: boolean,
    setShowBox: React.Dispatch<boolean>,
} &  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function SearchBar({containerClassName, setShowBox, width=261, height=41, showBox, ...props}: SearchBarProps) {
  const [text, setText] = useState("");
  
  const formattedWidth = (width / 16) + "rem";
  const formmatedHeight = (height / 16) + "rem";

  return (
    <div style={{height: formmatedHeight, width: formattedWidth}} className={`flex border-white border rounded-md items-center pl-5 hover:shadow-search transition-shadow ease-in-out duration-200 relative z-10` + " " + containerClassName }>
     <Image alt="Search Icon" src="/icons/icon=search.png" width={40} height={12} className="w-5 h-[2rem] object-contain"/>
     <input value={text} onChange={(e) => setText(e.target.value)} className='bg-transparent focus-visible:border-none focus-visible:outline-none font-mono text-sm absolute left-0 top-0 w-full h-full pl-12' {...props}/>
        <SearchBarBox setVisible={setShowBox} setSearchText={setText} search={text} visible={showBox} />
    </div>
  )
}
