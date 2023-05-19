import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
	_formatDate,
	_generatePost,
	_getPostURL,
	_getSearches,
	_slug,
} from "../../lib/clientUtils";
import { Search } from "../../lib/types";

type SearchBarBoxProps = {
	search: string;
	visible: boolean;
	setSearchText: React.Dispatch<string>;
	setVisible: React.Dispatch<boolean>;
};
type SearchBoxItemProps = {
	search: Search;
	onClick: () => void;
};

function SearchBoxItem({ search, onClick }: SearchBoxItemProps) {
	const formattedDate = _formatDate(search.date);
	return (
		<li className="flex flex-col bg-dark px-4 font-mono" onClick={onClick}>
			<Link href={_getPostURL(search.slug)}>
				<p>{search.title}</p>
				<p className="text-iGray">{formattedDate}</p>
			</Link>
		</li>
	);
}

export default function SearchBarBox({
	search,
	visible,
	setVisible,
	setSearchText,
}: SearchBarBoxProps) {
	const [searches, setSearches] = useState<Search[]>([]);
	const [results, setResults] = useState<Search[]>([]);

	useEffect(() => {
		_getSearches().then((newSearches) => setSearches(newSearches));
	}, []);

	useEffect(() => {
		if (!search.trim()) {
			setResults([]);
			return;
		}

		const query = search.normalize().toLocaleLowerCase();
		setResults(
			searches.filter((searchItem) =>
				searchItem.title.normalize().toLowerCase().includes(query)
			)
		);
	}, [search]);
	if (!visible || results.length === 0) {
		return null;
	}
	return (
		<ul className="absolute left-0 top-[103%] z-50 flex w-full flex-col gap-4 bg-dark pb-5 pt-2 shadow-search-box">
			{results.slice(0, 3).map((searchItem) => (
				<SearchBoxItem
					key={_slug(searchItem.title) + "-Search"}
					search={searchItem}
					onClick={() => {
						setVisible(false);
						setSearchText("");
					}}
				/>
			))}
		</ul>
	);
}
