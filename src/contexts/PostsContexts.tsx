import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Post } from '../../lib/types'


type ContextProps = {
    children: ReactNode
}
const postsContext = createContext<Post[]>([]);
const setPostsContext = createContext<(posts: Post[]) => void>(() => null);
export const usePosts = () => {
    return useContext(postsContext)
}

export const useSetPosts = (posts: Post[]) => {
    const setPosts = useContext(setPostsContext);

    setPosts(posts);
}
export default function PostsContexts({children}: ContextProps) {
  
  const [posts,setPosts] = useState<Post[]>([]);
  
  return (
    <postsContext.Provider value={posts}>
        <setPostsContext.Provider value={setPosts}>
            {children}
        </setPostsContext.Provider> 
    </postsContext.Provider>  
  )
}
