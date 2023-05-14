import { readFileSync } from "fs";
import matter from "gray-matter";
import path from "path";
import { _slug } from "./clientUtils";

//LEGACY
// const POSTS_DIR = path.join(process.cwd(), "/posts");

// function transformCategories(rawCategories: [string, number][]): Category[]{

//     const categories: Category[] = rawCategories.map((rawCategory) => {
//         return {
//             name: rawCategory[0],
//             type: rawCategory[1] as CategoryType,
//         }
//     })

//     return categories;
// }
// export async function readPost(path: string): Promise<Post>{
//     const fileContents = readFileSync(path, "utf-8");
//     const matterRes = matter(fileContents);

//     let {slug, title, date, summary, categories, image} = matterRes.data

//     if(slug == undefined){
//         slug = _slug(title);
//     }
//     const formmatedDate = new Date(date);

//     const content = matterRes.content

//     const post: Post = {
//         slug,
//         title,
//         date: formmatedDate,
//         summary,
//         categories: transformCategories(categories),
//         image,
//         content: content.toString(),

//     }

//     return post;
// }

export async function getAbout() {
	const fullPath = path.join(process.cwd(), "lib/about.md");
	const fileContents = readFileSync(fullPath, "utf-8");
	const matterRes = matter(fileContents);
	const content = matterRes.content;
	return content;
}

// export async function getPosts(): Promise<Post[]>{
//     const paths = readdirSync(POSTS_DIR);
//     const posts: Post[] = []
//     for (let postPath of paths) {
//         const fullPath =  path.join(POSTS_DIR, postPath);
//         let post = await readPost(fullPath);
//         posts.push(post);
//     }

//     posts.sort((a, b) => b.date.getTime() - a.date.getTime())
//     return posts;
// }

// export async function getPostBySlug(slug: string): Promise<Post | null>{
//     const paths = readdirSync(POSTS_DIR);

//     for (let postPath of paths) {
//         const fullPath = path.join(POSTS_DIR, postPath)
//         const post = await readPost(fullPath);
//         if (post.slug == slug){
//             return post;
//         }
//     }
//     return null;
// }

// export async function getPostsPaths(): Promise<string[]>{
//     const posts = await getPosts();
//     return posts.map((post) => post.slug);
// }

// export async function getCategories(): Promise<Category[]>{
//     const posts = await getPosts();

//     let seenCategories: Set<String> = new Set();
//     let categories:Category[] = [];
//     posts.forEach((post) => {
//         categories = [...categories, ...post.categories];
//     });

//     categories = categories.filter((category) => {
//         return seenCategories.size !== seenCategories.add(category.name).size;
//     })
//     return categories;

// }
