import Image from "next/image";
import { GetStaticProps } from "next";
import { getAbout } from "../../lib/utils";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import AsyncImage from "@/components/AsyncImage";
import MyImage from "@/assets/my_photo.webp";
export const getStaticProps: GetStaticProps = async (ctx) => {
	const about = await getAbout();
	return {
		props: {
			html: about.toString(),
		},
	};
};
type AboutProps = {
	html: string;
};

const About = ({ html }: AboutProps) => {
	return (
		<div className="w-full h-full portrait:px-2 md:px-[13.25rem] py-12 2xl:py-16">
			<div className="flex flex-col portrait:flex-col gap-10 mb-10 md:mb-0 md:gap-0 md:flex-row justify-between items-center">
				<h1 className="text-5xl text-center portrait:text-center md:text-left md:text-6xl font-mono">
					<span className="text-alt font-bold">Hello!</span> <br />
					I&apos;m&nbsp;
					<span className="text-secondary font-bold">Orlando!</span>
				</h1>
				<div className="relative w-fit h-fit scale-75 portrait:scale-75 md:transform-none">
					<Image
						alt="A photo of me! The author of the page"
						src={MyImage}
						width={421}
						height={468}
						className="rounded-tl-[80px] rounded-br-[80px] md:rounded-tl-[120px] md:rounded-br-[120px]"
					/>
					<motion.svg
						width="293"
						height="77"
						viewBox="0 0 293 77"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="absolute -bottom-4 -left-10"
					>
						<motion.path
							d="M17.5 55.5C34.3333 26.6666 75.8 -13.7 107 55.5C111 64.3 115 59.1666 116.5 55.5C129.167 26.5 161.5 -14.1001 189.5 55.5C194.7 62.7 199.667 58.5 201.5 55.5C213 29.4999 244 -6.90007 276 55.5"
							stroke="#37AA78"
							strokeWidth="33"
							strokeLinecap="round"
							transition={{
								duration: 1.2,
								delay: 0.4,
							}}
							initial={{
								pathLength: 0,
								strokeWidth: 0,
							}}
							animate={{ pathLength: 1, strokeWidth: 33 }}
						/>
					</motion.svg>

					<motion.svg
						width="170"
						height="178"
						viewBox="0 0 170 178"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						strokeLinecap="round"
						className="absolute -right-12 md:-right-16 -top-16"
					>
						<motion.path
							d="M141.976 153.696C132.424 162.097 117.542 165.109 99.2659 160.407C81.0779 155.729 61.1203 143.641 44.4166 124.647C27.7128 105.654 18.2742 84.3152 15.9576 65.6785C13.6298 46.9513 18.5187 32.5766 28.0713 24.1756C37.6239 15.7747 52.5054 12.7625 70.7817 17.464C88.9697 22.1428 108.927 34.2305 125.631 53.2241C142.335 72.2177 151.773 93.5562 154.09 112.193C156.418 130.92 151.529 145.295 141.976 153.696Z"
							stroke="#AA3737"
							strokeWidth="29"
							transition={{
								duration: 1.4,
								delay: 0.3,
								opacity: 0,
							}}
							initial={{
								pathLength: 0,
								strokeWidth: 0,
							}}
							animate={{ pathLength: 1, strokeWidth: 29 }}
						/>
					</motion.svg>
				</div>
			</div>

			<ReactMarkdown className="mx-5 md:m-0 max-w-none prose-lg prose-headings:font-mono prose-p:font-medium prose-headings:font-bold prose-headings:text-4xl prose-white">
				{html}
			</ReactMarkdown>
		</div>
	);
};
About.displayName = "About";
export default About;
