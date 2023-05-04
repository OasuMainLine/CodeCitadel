import { CategoryType, Post } from '../../lib/types'
 
import Link from 'next/link'
import React from 'react'
import { _formatDate, _slug } from '../../lib/clientUtils'
import {motion} from "framer-motion"

type PostCardProps = {
    post: Post
} 
export default function PostCard({post}: PostCardProps) {

  const {slug, title, summary, date, categories} = post

  const formattedDate = _formatDate(date);

 
  return (
    <Link href={"/" + slug}>
      <motion.div whileTap={{scale: 0.9}} className='flex flex-col w-[20rem] md:w-[45.8125rem] gap-1 postcard'>
          <h2 className='text-xl font-bold font-mono'>{title}</h2>
          <div className='grid grid-cols-[repeat(2,minmax(20px,1fr))] gap-1 md:flex md:gap-4 [word-spacing:-6px] text-base font-mono'>
              {categories.map((category, idx) => {
                let color;
                switch(category.type){
                  case CategoryType.WEB:
                    color = "text-secondary";
                    break;
                  case CategoryType.BACKEND:
                    color = "text-alt";
                    break;
                  case CategoryType.OTHER:
                    color = "text-primary";
                    break;
                }
                return <span key={idx} className={color}>{category.name}</span>
              })}
          </div>
          <p className='text-iGray text-sm font-mono'>{formattedDate}</p>
          <p className='font-bold'>{summary}</p>
      </motion.div>
    </Link>
  )
}
