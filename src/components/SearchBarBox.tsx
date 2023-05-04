import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { _formatDate, _generatePost, _getSearches, _slug } from '../../lib/clientUtils'
import { Post, Search } from '../../lib/types'
import { getPosts } from '../../lib/utils'


type SearchBarBoxProps = {
    search: string,
    visible: boolean,
    setSearchText: React.Dispatch<string>,
    setVisible: React.Dispatch<boolean>,
}
type SearchBoxItemProps = {
    search: Search,
    onClick: () => void,
}

function SearchBoxItem({search, onClick}: SearchBoxItemProps){

    const formattedDate = _formatDate(search.date);
    return <li className='px-4 font-mono flex flex-col bg-dark' onClick={onClick}>
        <Link href={"/" + search.slug}>
            <p>{search.title}</p>
            <p className='text-iGray'>{formattedDate}</p>
        </Link>
    </li>
}

export default function SearchBarBox({search, visible, setVisible, setSearchText}: SearchBarBoxProps) {
    const [searches, setSearches] = useState<Search[]>([])
    const [results, setResults] = useState<Search[]>([])

    useEffect(() => {
         setSearches(_getSearches())
    }, [])

    useEffect(() => {
        if(!search.trim()) {
            setResults([]);
            return;
        };

        const query = search.normalize().toLocaleLowerCase()
        setResults(searches.filter((searchItem) => searchItem.title.normalize().toLowerCase().includes(query)))
    }, [search]) 
    if(!visible || results.length === 0){
        return null;
    }
    return (
        <ul className='absolute top-[103%] left-0 bg-dark shadow-search-box z-50 pt-2 flex flex-col gap-4 pb-5 w-full'>
            {results.slice(0, 3).map((searchItem) => <SearchBoxItem key={_slug(searchItem.title) + "-Search"} search={searchItem} onClick={() => {setVisible(false);setSearchText("")}} />)}
        </ul>
    )
}
