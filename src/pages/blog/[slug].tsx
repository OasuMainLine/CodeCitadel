import { GetStaticPaths } from "next";
import { GetStaticProps } from "next";
import { getPostBySlug, getPostsPaths, writeSearches } from "../../../lib/api";
import {
	_deserializePosts,
	_formatDate,
	_serializePosts,
} from "../../../lib/clientUtils";
import Pill from "@/components/Pill";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkCodeFrontmatter from "remark-code-frontmatter";
import rehypeKatex from "rehype-katex";
import "rehype-katex";
import rehypeRaw from "rehype-raw";
import {
	motion,
	useAnimation,
	useMotionValueEvent,
	useScroll,
} from "framer-motion";
import { CodeComponent } from "../../components/MarkdownComponents/CodeComponent";
import { LinkComponent } from "../../components/MarkdownComponents/LinkComponent";
import { BulletedListComponent } from "../../components/MarkdownComponents/BulletedListComponent";
import Link from "next/link";
import ImageComponent from "@/components/MarkdownComponents/ImageComponent";
import { rehypeFigure } from "../../../lib/rehypeFigure";

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const paths = await getPostsPaths();
	await writeSearches();

	const slugs = paths.map((path) => {
		return {
			params: {
				slug: path,
			},
		};
	});
	return {
		paths: slugs,
		fallback: "blocking",
	};
};
export const getStaticProps: GetStaticProps = async (ctx) => {
	const slug = ctx.params?.slug;
	let post = null;
	if (slug) {
		post = await getPostBySlug(slug as string);
	}
	if (!post) {
		return {
			notFound: true,
			props: {
				post,
			},
		};
	}
	return {
		notFound: false,
		props: {
			postJSON: _serializePosts([post]),
		},
	};
};

type EntryProps = {
	postJSON: string;
};

const Entry = ({ postJSON }: EntryProps) => {
	const post = _deserializePosts(postJSON)[0];
	const controls = useAnimation();
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (latest) => {
		if (latest > 230) {
			controls.start("visible");
		} else {
			controls.start("hidden");
		}
	});

	return (
		<>
			<Head>
				<title>{post.title}</title>

				<meta property="og:title" content={post.title} />
				<meta property="og:description" content={post.summary} />
				<meta
					content={"https://thecodecitadel.com/" + post.slug}
					property="og:url"
				/>
				<meta property="og:image" content={post.image || "/images/logo.png"} />
				<meta property="og:type" content="article" />
				<meta property="og:site_name" content="The Code Citadel" />
				<meta property="twitter:card" content={post.summary} />
				<meta property="twitter:title" content={post.title} />
				<meta property="twitter:image" content={post.image || ""} />
				<meta property="twitter:description" content={post.summary} />
				<meta
					property="twitter:url"
					content={"https://thecodecitadel.com/blog/" + post.slug}
				/>
			</Head>
			<div className="w-screen h-full relative">
				<motion.button
					initial="hidden"
					animate={controls}
					title="Go to top"
					onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })}
					transition={{
						duration: 0.2,
					}}
					variants={{
						visible: {
							pointerEvents: "auto",
							opacity: 1,
						},
						hidden: {
							opacity: 0,
							pointerEvents: "none",
						},
					}}
					className="border-4 border-white z-10 flex justify-center items-center rounded-full w-16 h-16 fixed bottom-12 right-1/2 translate-x-1/2 md:transform-none md:right-24"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="#F3F3F3"
						className="w-10 h-10"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.5 15.75l7.5-7.5 7.5 7.5"
						/>
					</svg>
				</motion.button>
				<article
					className="mx-5 md:overflow-visible md:mx-auto max-w-3xl mb-12 
				mt-10 prose-sm md:prose-lg prose-ol:list-decimal prose-headings:font-mono 
				prose-p:font-medium prose-headings:font-bold dark:prose-invert prose-pre:p-0
				prose-pre:bg-none prose-a:text-secondary prose-a:font-semibold 
				hover:prose-a:brightness-125 prose-a:transition-all prose-a:ease-in-out 
				prose-a:duration-300 prose-img:mb-2 prose-code:bg-slate-600 prose-code:px-1 prose-code:rounded-md prose-figcaption:text-center prose-figcaption:text-gray-300 prose-figcaption:italic"
				>
					<div className="metadata flex flex-col mb-2 not-prose gap-1">
						<Link
							className="mt-6 ms-3 md:m-0 items-center gap-1 mb-2 flex hover:text-shadow-md shadow-white transition-all duration-500 ease-in-out"
							href="/blog"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
								/>
							</svg>
							Go back to blog
						</Link>
						<p className="text-iGray font-mono m-0 p-0 text-lg">
							{_formatDate(post.date)}
						</p>
						<h1 className="mb-5 p-0 text-5xl font-bold">{post.title}</h1>
						<ul className="grid grid-cols-[repeat(2,minmax(50px,1fr))] md:flex pointer-events-none p-0 m-0 gap-2">
							{post.categories.map((category) => (
								<Pill
									value={category.name}
									type={category.type}
									key={category.name}
									forceActive={true}
								/>
							))}
						</ul>
					</div>

					<ReactMarkdown
						components={{
							code: CodeComponent,
							ul: BulletedListComponent,
							a: LinkComponent,
							img: ImageComponent,
						}}
						remarkPlugins={[[remarkCodeFrontmatter], remarkGfm, remarkMath]}
						rehypePlugins={[rehypeKatex, rehypeRaw, rehypeFigure]}
					>
						{post.content ?? ""}
					</ReactMarkdown>
				</article>
			</div>
		</>
	);
};

export default Entry;
