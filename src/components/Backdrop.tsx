import React from 'react'

type BackdropProps = {
    show: boolean,
    setShow: React.Dispatch<boolean>
}

export default function Backdrop({show,setShow}: BackdropProps) {
  return (
    <div className='bg-black opacity-40 fixed top-0 left-0 w-full h-full'></div>
  )
}
