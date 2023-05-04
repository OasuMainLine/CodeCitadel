import Pill from "@/components/Pill";
import PostCard from "@/components/PostCard";
import { GetStaticProps } from "next";
import { useState } from "react";
import { _deserializePosts, _generateCategory, _generatePost, _serializePosts, _sliceArray } from "../../lib/clientUtils";
import { Category, Post } from "../../lib/types";
import { getCategories, getPosts } from "../../lib/utils";

export const getStaticProps: GetStaticProps = async (ctx) => {
	let posts: Post[] = await getPosts();
    let categories: Category[] = await getCategories();
    
	return {
		props: {
			postsJSON: _serializePosts(posts),
            categories,
		}
	}
}

type BlogProps = {
    postsJSON: string,
    categories: Category[],
}
const Blog = ({postsJSON, categories}: BlogProps) => {
    
    const posts: Post[] = _deserializePosts(postsJSON);
    const [filterCategories, setFilterCategories] = useState<string[]>([]);

    function pillCallback(active: boolean, value: string){
         if(active){
            setFilterCategories((filterCategories) => [...filterCategories, value]);
         } else {
            setFilterCategories((filterCategories) => filterCategories.filter(filter => filter != value));
         }
    }
    let filteredPosts: Post[];

    if(filterCategories.length == 0){
        filteredPosts = posts
    } else {
        filteredPosts = posts.filter(post => filterCategories.every(filter => post.categories.some((postCategory) => postCategory.name == filter)));
    }
	return (
		<div className="w-full h-full md:px-56 py-12 2xl:px-60">
			<div className="flex flex-col gap-3">
				{_sliceArray(categories, 6).map((categoryRow, idx) => (
					<div key={idx} className="grid grid-cols-2 w-2/3 mx-auto md:mx-0 md:w-auto md:flex gap-y-3 md:gap-3">
						{categoryRow.map((category, idx) => (
							<Pill key={category.name + idx} callBack={pillCallback} value={category.name} type={category.type} />
						))}
					</div>
				))}
			</div>

            <div className="flex flex-col gap-8 mt-10 items-center md:items-start">
                       {filteredPosts.map((post) => <PostCard key={post.slug} post={post}/>)}
            </div>
		</div>
	);
};
Blog.displayName = "Blog";

export default Blog;
