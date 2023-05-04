---
slug: how-to-create-a-blog-with-nextjs
title: How to Create a Blog with NextJS and TailwindCSS
date: 2023-04-30
summary: Creating a blog is the milestone for a lot of developers, and there's a lot of ways to get the job done. Let's see how to it the NextJS route!
# 0 = WEB, 1 = BACKEND, 2 = OTHER
categories:
  [
    ["NextJS", 0],
    ["React", 0],
    ["TailwindCSS", 0],
    ["Design", 2],
    ["Tutorial", 2],
  ]
---

[nextjs]: https://nextjs.org/
[tailwindcss]: https://tailwindcss.com/
[tailwindcss docs]: https://tailwindcss.com/docs/installation
[elementor]: https://elementor.com/library/templates/blog/?utm_source=google&utm_medium=cpc&utm_campaign=13060922353&utm_term=&gclid=CjwKCAjwxr2iBhBJEiwAdXECw0ob-v4BZpKHv_YVkttPPAmxmWr9m_zU89WcapJFwAvlGls6WzER9RoCzUgQAvD_BwE
[wordpress]: https://wordpress.com/es/themes/blog
[dribble]: https://dribbble.com/tags/blog_template
[steal]: https://austinkleon.com/steal/
[postcss]: https://postcss.org/

## Requirements

For this tutorial you only need to have some basic understanding on React and the web (HTML, JS, CSS). I'll explain the details of NextJS and tailwindCSS as we go. If you don't know what a NextJS is or what tailwindCSS is all about, here's a brief explanation:

- [NextJS]: It's a framework built on top of react, it gives us functionalities out the box such as routing, optimization, static site generation, etc.
- [TailwindCSS]: A css framework based on utilities, it allows us to work faster without the need to write a lot of css, plus it's easily customizable.

## Introduction

Creating your own litle space on the internet is a great idea. Not only does it serve as a personal archive, but it can also serve as a means to share your prowess with developers around the world. Nowadays there's a ton of different ways and tools to go about creating one, but remember, the tools you use to build it are less significant than the actual content. Here is a rough flowchart of how producing a blog looks like:

![Blog flowchart](/images/posts/CreatingBlog/blog-flowchart.jpg "How to create a blog")
_Creating a blog is a really straighforward process, writting content is the difficult part!_

## Before the actual coding

A lot of developers make the mistake of going right into the code, and unless you want to get trapped in a loop of corrections, redos, and revaluations, it is better to start off with a design. If you're not confident on your designer skills, there's a lot of nice blog templates out there! [Elementor], [Wordpress] and [Dribble] are great choices when looking for one.

If you are in touch with your artistic side then that means you'd want to create a design of your own, how to design a blog goes beyond the scope of this article, but here are some tips to keep in mind when doing so:

- Inspiration! Look up other people's blog and think about the details you find attractive, then transform them into something new, like a good [book][steal] once said, almost everyone creates its work out someone else's.
- Make a lot of drawing about how you'd like it to look, The distribution of the layout, the general esthetic, etc.
- More often than not, a simpler design reigns, the users wouldn't want to be drowned in icons and animations when reading.

## What are we building?

I found this nice template in worpress to get us started. It incorpores all of what you'd expect for a blog, perfect for our use case.

![The wordpress template we're building](/images/posts/CreatingBlog/WordpressTemplate.gif "The Wordpress Template")
_A nice minimalist design for a cool blog_

## Creating the project

Now let's get started, open a terminal wherever you'd like to create a next project, this can be accomplish using the `create-next-app` npx command like so:

```shell
npx create-next-app blog-example #You can replace blog-example with your blog's name
```

If it prompts you to install create-next-app, type yes and then press enter, the command will walk you through several options to customize your project. For this demo this is our configuration:

- For typescript, select **No**.
- For ESLint, select **Yes**, this will detect errors in our code so we can fix them right away.
- For TailwindCSS, select **Yes**.
- For the `src` directory option, select **Yes**.
- For the experimental `app/`, select **No**,
- Finally, press enter for the `import alias` since we want the default.

This command will create a folder with the name you set up, in this case blog-example, with all the dependencies. At first glance all the files can be intimidating, so let's break it down:

- **node_modules**: Here's where your dependencies are going to be stored.
- **public**: All the static assets (images, videos, icons, etc) that you want to serve are going to be stored here.
- **src**: The code we're going to write will be stored here.
  - **pages**: Here's is where we are going to define our page components, NextJS uses the file system to determine the routes of our pages, making our job a lot easier.
    - **api**: A folder where we can set up api routes, since we will create a static blog we can skip this one.
  - **styles**: The css that we write goes here, you probably have noticed there's some default styles here.
- **.gitignore**: This file allows us to ignore certain files when uploading to github.
- **jsconfig.json**: A config file to define the options of a javascript project.
- **package.json**: This file is where our dependencies and project commands are defined
- **postcss.config.js**: The config file for [PostCSS], we will not bother that much about this one.
- **tailwind.config.js**: The config file for tailwind, this is where we are going to set our custom values for such things as colors, sizes, fonts, shadows, etc.

Now open a terminal in the `blog-example` folder and type `npm run dev`, if you go to the url it prints you should be seeing something like this:

![Next default image](/images/posts/CreatingBlog/next-default-page.jpeg "Next default page")
_Nice welcome page, Vercel_

Since we are not going to use anything from the default page, let's delete the following:

- delete the `api` folder inside `src`
- Go to index and delete the imports, the `inter` font declaration and everything inside the `return` keyword. The file should look like this:

```javascript
//filename:index.js
export default function Home() {
  return ()
}
```

- Delete everything inside the `globals.css` file, except from the 3 first lines. The file should look like so:

```css
//filename:globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

If you did everything right, the linter should be warning us about an error in index. The problem is that our function is not returning anything at all, so let's change that! go ahead and type something like:

```jsx
//filename:index.js
export default function Home() {
	return (
		<div>
			<h1>Hello Blog</h1>
		</div>
	);
}
```

Very nice! although it doesn't look anything like our design, let's change that!.

### TailwindCSS configuration

One of the nice features of tailwind is the customization, when working with a new tailwind project always make sure of adding the colors, sizes, shadows, etc., from your original design so that we can't get custom-made classes. In this case, the only aspect that we have to change is the font, our design uses the Segoi UI font, let's apply that to our `tailwind.config.js`:

```javascript
//filename:tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: "Segoe UI",
			},
		},
	},
	plugins: [],
};
```

What we did:

- We used the `extend` property of theme, which means that we want to extend the original styles, instead of override them.
- We used the `fontFamily` property, since we want to add our own font.
- We selected `sans` since our font is sans-serif.
- And finally we specified that our font is going to be Segoe UI.

If everything is correct, we should see our font change now.

That's all for the tailwind configuration, now let's finish the homepage, it should look like this:

```jsx
//...The rest of the code
//filename:index.js
return (
	<main className="grid grid-cols-1 m-auto w-screen h-screen place-items-center font-sans">
		<div className="flex flex-col gap-5 w-1/3">
			<span className="w-40 h-40 rounded-full bg-slate-500"></span>
			<h1 className="text-5xl font-bold my-8">Hey, World</h1>
			{/* Our article link item */}
			<div className="flex justify-between w-full">
				<p className="text-gray-800 text-lg w-5/6 hover:underline hover:text-gray-600">
					Hey there, let's see how to create a blog with nextjs and tailwind!
				</p>
				<p className="text-gray-500 text-md">Apr 30</p>
			</div>
		</div>
	</main>
);
```

Which gives us the next result

![The phase 1 of our blog](/images/posts/CreatingBlog/blog-phase-1.jpeg "Our blog so far")
_Lookin' good!_

Okay hold on for a second, what did we just do? Where did those classes come from? This is where the power of tailwind really show up, as you can see, it generated all those clases automatically, the best part is that tailwind is able to detect which classes are we using, and it only ships those with our website, leaving us with a really small css size. You probably realize, the names of the clases maps to certain css properties, for instance, `grid` refers to `display: grid;`, `m-auto` maps to `margin: auto;` and classes such as `w-screen` points to `width: 100vw;`. At the end of the day, is like writting css in our code directly, without having to think about clever names, which really boosts productivity. If you have any doubts about a class, you can look up the [Tailwindcss Docs] and just type the class you want to check out.

Now, it would be nice if we could make that article item into a component, let's abstract the logic there into a react component

```jsx
//filename:src/components/ArticleCard.js
import React from "react";

export default function ArticleCard({ title, date }) {
	const day = date.toLocaleDateString("en-US", { day: "numeric" });
	const month = date.toLocaleDateString("en-US", { month: "short" });
	return (
		<div className="flex justify-between w-full">
			<p className="text-gray-800 text-lg w-5/6 hover:underline hover:text-gray-600">
				{title}
			</p>
			<p className="text-gray-500 text-md">{`${month} ${day}`}</p>
		</div>
	);
}
```

You probably have already notices, but tailwind gives us some nice modifiers to interact with pseudo-classes such as hover, which we are using to implement the underline hover effect.

And now, before updating our home page, It would be nice to have some data to test our page. If you already wrote some content you can use that, but if not, you can go ahead and copy paste the next function, which gives us a random post. I stored this function in a file called `utils.js` in a `src/lib/` folder I created.

```js
//filename:src/lib/utils.js
export function getRandomPost() {
	const INTROS = [
		"Let's",
		"How to",
		"It's time to",
		"Hey, ",
		"In my opinion we should",
	];
	const VERBS = ["make", "prepare", "watch", "enjoy"];
	const NOUNS = [
		"cake",
		"blogs",
		"videos",
		"origami",
		"apps",
		"trees",
		"water-powered cyborg suits for dogs",
	];

	const title = `${INTROS[Math.floor(Math.random() * INTROS.length)]} ${
		VERBS[Math.floor(Math.random() * VERBS.length)]
	} ${NOUNS[Math.floor(Math.random() * NOUNS.length)]}`;

	const date = new Date(Date.now() - Math.floor(Math.random() * 1000000000));

	return { title, date };
}
```

Go ahead and change the homepage so it can render our new awesome post

```jsx
//filename:index.js
export default function Home() {
	const [articles, setArticles] = useState([]);
	useEffect(() => {
		setArticles(() => {
			return Array(4).fill(null).map(getRandomPost);
		});
	}, []);

	return (
		<main className="grid grid-cols-1 m-auto w-screen h-screen place-items-center font-sans">
			<div className="flex flex-col gap-5 w-1/3">
				<span className="w-40 h-40 rounded-full bg-slate-500"></span>
				<h1 className="text-5xl font-bold my-8">Hey, World</h1>

				{articles.map((article) => (
					<ArticleCard key={article.title} {...article} />
				))}
			</div>
		</main>
	);
}
```

So, in summary, we just:

- Created an state where our articles are going to be stored.
- Used useEffect, so we can set our articles without causing any loops.
  - Inside, we create an empty array with a length of 4, fill it with nulls and then map then into randomly generated posts!
- We mapped our articles to an ArticleCard component, when doing a list of components it a good practice to always add a key, in this case the title, and then we setted the title and date using destructuring `...` assignment.
