import { writeFileSync } from "fs";
import { json } from "stream/consumers";
import { Category, CategoryType, Post, Search } from "./types";

const preview = (process.env.CF_PREVIEW || "0") == "1" ? true : false;

const _preview = () => (preview ? "true" : "false");
const GET_ALL_POSTS_QUERY = `
query {
    postCollection(preview:${_preview()}) {
      items {
        slug
        title
        date
        image
        summary
          categoriesCollection {
            items {
              ...on Category {
                name
                type
              }
            }
          }
        content
      }
    }
  }
`;

const GET_POST_BY_SLUG_QUERY = `
query {
    postCollection(where: { slug: "_slug_" }, limit: 1, preview:${_preview()}) {
      items {
        slug
        title
        date
        image
        summary
          categoriesCollection {
            items {
              ...on Category {
                name
                type
              }
            }
          }
        content
      }
    }
  }
`;

const GET_CATEGORIES_QUERY = `
query {
	categoryCollection(preview:${_preview()}){
    items{
      name
      type
    }
  }
}
`;

const GET_PATHS_QUERY = `
query postEntryQuery {
	postCollection(preview:${_preview()}) {
    items{
      slug
    }
  }
}
`;
const GET_SEARCHES_QUERY = `
query {
    postCollection(preview:${_preview()}) {
      items {
        slug,
        date,
        title
      }
    }
  }
`;

const url = `https://graphql.contentful.com/content/v1/spaces/${
	process.env.CF_SPACE_ID || ""
}/environments/master`;

async function gqFetch<T = any>(graphql: string) {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${preview ? process.env.CF_PREVIEW_TOKEN : process.env.CF_DELIVERY_TOKEN}`,
		},
		body: JSON.stringify({ query: graphql }),
	});

	const json = await response.json();

	if ("data" in json) {
		return json.data as T;
	}
	return null;
}

// slug: 'my-post',
// title: 'My post',
// date: '2023-05-14T00:00:00.000+02:00',
// summary: 'This is my awesome and cute content summary',
// categoriesCollection: [Object],
// content: 'This is my beautiful content\nholy moly how much content!\n'
type postsRes = {
	postCollection: {
		items: {
			slug: string;
			title: string;
			date: string;
			summary: string;
			image: string;
			categoriesCollection: {
				items: {
					name: string;
					type: string;
				}[];
			};
			content: string;
		}[];
	};
};

function parseCategories(categories: any[]): Category[] {
	return categories.map((category: any) => ({
		name: category.name,
		type: parseInt(category.type) as CategoryType,
	}));
}
export async function getPosts(): Promise<Post[]> {
	const data = await gqFetch<postsRes>(GET_ALL_POSTS_QUERY);
	if (data) {
		const entries = data.postCollection.items;
		const posts: Post[] = [];
		entries.forEach((entry) => {
			const {
				title,
				summary,
				date,
				slug,
				image,
				content,
				categoriesCollection,
			} = entry;

			const formattedCategories: Category[] = parseCategories(
				categoriesCollection.items
			);
			posts.push({
				slug,
				title,
				image,
				summary,
				date: new Date(date),
				categories: formattedCategories,
				content,
			});
		});
		return posts;
	}
	return [];
}

type postRes = {
	postCollection: {
		items: [
			{
				slug: string;
				title: string;
				date: string;
				summary: string;
				image: string;
				categoriesCollection: {
					items: {
						name: string;
						type: string;
					}[];
				};
				content: string;
			}
		];
	};
};
export async function getPostBySlug(slug: string): Promise<Post | null> {
	const query = GET_POST_BY_SLUG_QUERY.replace("_slug_", slug);
	const data = await gqFetch<postRes>(query);

	if (data) {
		const {
			title,
			content,
			date,
			image,
			slug,
			summary,
			categoriesCollection: { items },
		} = data.postCollection.items[0];
		const categories = parseCategories(items);
		const post: Post = {
			title,
			content,
			categories,
			date: new Date(date),
			image,
			slug,
			summary,
		};
		return post;
	}
	return null;
}

type categoriesRes = {
	categoryCollection: {
		items: {
			name: string;
			type: string;
		}[];
	};
};
export async function getCategories(): Promise<Category[]> {
	const data = await gqFetch<categoriesRes>(GET_CATEGORIES_QUERY);

	if (data) {
		return parseCategories(data.categoryCollection.items);
	}
	return [];
}

type pathsRes = {
	postCollection: {
		items: {
			slug: string;
		}[];
	};
};
export async function getPostsPaths(): Promise<string[]> {
	const data = await gqFetch<pathsRes>(GET_PATHS_QUERY);
	if (data) {
		return data.postCollection.items.map((item) => item.slug);
	}
	return [];
}

type searchRes = {
	postCollection: {
		items: {
			slug: string;
			date: string;
			title: string;
		}[];
	};
};
export async function getSearches(): Promise<Search[]> {
	const data = await gqFetch<searchRes>(GET_SEARCHES_QUERY);
	if (data) {
		return data.postCollection.items.map((item) => ({
			...item,
			date: new Date(item.date),
		}));
	}
	return [];
}

export async function writeSearches() {
	const searches = await getSearches();

	writeFileSync("./lib/searches.json", JSON.stringify(searches));
}
