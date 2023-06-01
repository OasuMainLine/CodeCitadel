import { GetStaticPaths } from "next";
import { GetStaticProps } from "next";
import { getPostBySlug, getPostsPaths} from "../../../lib/api";
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
			<div className="relative h-full w-screen">
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
					className="fixed bottom-12 right-1/2 z-10 flex h-16 w-16 translate-x-1/2 items-center justify-center rounded-full border-4 border-white md:right-24 md:transform-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="#F3F3F3"
						className="h-10 w-10"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.5 15.75l7.5-7.5 7.5 7.5"
						/>
					</svg>
				</motion.button>
				<article
					className="prose-sm mx-5 mb-12 mt-10 max-w-3xl 
				dark:prose-invert md:prose-lg prose-headings:font-mono prose-headings:font-bold prose-p:font-medium 
				prose-a:font-semibold prose-a:text-secondary prose-a:transition-all prose-a:duration-300
				prose-a:ease-in-out hover:prose-a:brightness-125 prose-figcaption:text-center 
				prose-figcaption:italic prose-figcaption:text-gray-300 prose-code:rounded-md 
				prose-code:bg-slate-600 prose-code:px-1 prose-pre:bg-none prose-pre:p-0 prose-ol:list-decimal prose-img:mb-2 md:mx-auto md:overflow-visible"
				>
					<div className="metadata not-prose mb-2 flex flex-col gap-1">
						<Link
							className="mb-2 ms-3 mt-6 flex items-center gap-1 shadow-white transition-all duration-500 ease-in-out hover:text-shadow-md md:m-0"
							href="/blog"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
								/>
							</svg>
							Go back to blog
						</Link>
						<p className="m-0 p-0 font-mono text-lg text-iGray">
							{_formatDate(post.date)}
						</p>
						<h1 className="mb-5 p-0 text-5xl font-bold">{post.title}</h1>
						<ul className="pointer-events-none m-0 grid grid-cols-[repeat(2,minmax(50px,1fr))] gap-2 p-0 md:flex">
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
