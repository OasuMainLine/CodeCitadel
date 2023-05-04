import LinkPill, { LinkPillType } from "@/components/LinkPill";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import { CategoryType, Post } from "../../lib/types";
import Image from "next/image";
import {
	_deserializePosts,
	_generatePost,
	_serializePosts,
} from "../../lib/clientUtils";

import { GetStaticProps } from "next";
import { getPosts } from "../../lib/utils";

export const getStaticProps: GetStaticProps = async (ctx) => {
	let posts: Post[] = await getPosts();

	return {
		props: {
			postsJSON: _serializePosts(posts),
		},
	};
};

type HomeProps = {
	postsJSON: string;
};
const Home = ({ postsJSON }: HomeProps) => {
	const posts = _deserializePosts(postsJSON);
	return (
		<div className="md:px-[4.0625rem] 2xl:px-24 py-12">
			<div className="flex flex-col md:flex-row mb-12">
				<h1 className="text-center md:text-left text-5xl md:text-6xl font-mono tracking-wide">
					A whole <br />
					<span className="text-alt font-bold">journey</span> <br />
					right at your <br />
					<span className="text-secondary font-bold">fingertips</span>
				</h1>
				<div className="flex flex-col md:ml-auto md:items-center">

					<h2 className="font-mono text-xxl mb-3 text-center md:text-left px-2 md:px-0 mt-3 md:mt-0">A glimpse of what I write about</h2>
					<div className="grid md:grid-cols-2 mt-5 gap-x-10 gap-y-5 place-content-center md:place-content-start">
						<LinkPill to="">Javascript</LinkPill>
						<LinkPill to="" type={LinkPillType.SECONDARY}>
							Backend
						</LinkPill>
						<LinkPill to="">HTML</LinkPill>
						<LinkPill to="" type={LinkPillType.SECONDARY}>
							DevOps
						</LinkPill>
						<LinkPill to="">CSS</LinkPill>
						<LinkPill to="" type={LinkPillType.SECONDARY}>
							Cloud
						</LinkPill>
					</div>
				</div>
			</div>
			<span className="h-[.2px] w-full bg-iWhite block" />
			<div className="flex flex-col pt-10 items-center md:items-start gap-2 md:gap-0">
				<h2 className="text-2xl mb-7 font-mono">Recent posts</h2>
				<div className="flex flex-col gap-10 md:gap-8">
					{posts.slice(0, 4).map((post) => (
						<PostCard key={post.slug} post={post} />
					))}
				</div>
			</div>
		</div>
	);
};

Home.displayName = "Home";

export default Home;
