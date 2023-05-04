const fs = require("fs");
const matter = require("gray-matter");
const { join } = require("path");

function _slug(text) {
	return text.replaceAll(" ", "-").toLowerCase();
}

const posts = fs.readdirSync(join(process.cwd(), "/posts"));
const searches = [];
for (let postPath of posts) {
	const fullPath = join(process.cwd(), "/posts", postPath);
	const fileContents = fs.readFileSync(fullPath, "utf-8");
	const matterRes = matter(fileContents);
	searches.push({
		slug: matterRes.data.slug ?? _slug(matterRes.data.title),
		title: matterRes.data.title,
		date: matterRes.data.date,
	});
}

fs.writeFileSync(
	join(process.cwd(), "/lib", "searches.json"),
	JSON.stringify(searches)
);
