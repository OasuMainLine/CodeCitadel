import Pill from "@/components/Pill";
import PostCard from "@/components/PostCard";
import { GetStaticProps } from "next";
import { useState } from "react";
import {
	_deserializePosts,
	_generateCategory,
	_generatePost,
	_serializePosts,
	_sliceArray,
} from "../../lib/clientUtils";
import { Category, Post } from "../../lib/types";
import { getCategories, getPosts } from "../../lib/api";

export const getStaticProps: GetStaticProps = async (ctx) => {
	let posts: Post[] = await getPosts();
	let categories: Category[] = await getCategories();

	return {
		props: {
			postsJSON: _serializePosts(posts),
			categories,
		},
	};
};

type BlogProps = {
	postsJSON: string;
	categories: Category[];
};
const Blog = ({ postsJSON, categories }: BlogProps) => {
	const posts: Post[] = _deserializePosts(postsJSON);
	const [filterCategories, setFilterCategories] = useState<string[]>([]);

	function pillCallback(active: boolean, value: string) {
		if (active) {
			setFilterCategories((filterCategories) => [...filterCategories, value]);
		} else {
			setFilterCategories((filterCategories) =>
				filterCategories.filter((filter) => filter != value)
			);
		}
	}
	let filteredPosts: Post[];

	if (filterCategories.length == 0) {
		filteredPosts = posts;
	} else {
		filteredPosts = posts.filter((post) =>
			filterCategories.every((filter) =>
				post.categories.some((postCategory) => postCategory.name == filter)
			)
		);
	}
	return (
		<div className="h-full w-full py-12 md:px-56 2xl:px-60 portrait:px-5">
			<div className="flex flex-col gap-3">
				{_sliceArray(categories, 6).map((categoryRow, idx) => (
					<div
						key={idx}
						className="mx-auto grid w-3/4 grid-cols-2 gap-x-4 gap-y-3 md:mx-0 md:flex md:w-auto md:gap-3 md:portrait:mx-auto"
					>
						{categoryRow.map((category, idx) => (
							<Pill
								key={category.name + idx}
								callBack={pillCallback}
								value={category.name}
								type={category.type}
							/>
						))}
					</div>
				))}
			</div>

			<div className="mt-10 flex min-h-screen flex-col items-center gap-8 md:items-start md:portrait:items-center">
				{filteredPosts.length > 0 &&
					filteredPosts.map((post) => <PostCard key={post.slug} post={post} />)}

				{filteredPosts.length === 0 && (
					<h2 className="px-5 text-center text-2xl font-bold md:px-0 md:text-left">
						There are not blogs with these categories...
						<br />
						But if you stick around there may be some in the future! 👽
					</h2>
				)}
			</div>
		</div>
	);
};
Blog.displayName = "Blog";

export default Blog;
