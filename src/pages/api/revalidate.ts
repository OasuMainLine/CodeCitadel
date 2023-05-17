import type { NextApiRequest, NextApiResponse } from "next";
import { writeSearches } from "../../../lib/api";

type Data = {
	message?: string;
	revalidated?: boolean;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	let inboundRevalToken = req.headers["x-vercel-reval-key"];

	if (!inboundRevalToken) {
		return res
			.status(401)
			.json({ message: "x-vercel-reval-key header not defined" });
	} else if (inboundRevalToken !== process.env.CF_REVALIDATE_KEY) {
		return res.status(401).json({ message: "Invalid token" });
	}

	try {
		// Note: if this fails to parse you may have forget to set the
		// "content-type" header correctly as mentioned here https://github.com/vercel/next.js/blob/canary/examples/cms-contentful/README.md#step-9-try-using-on-demand-revalidation
		if (!req.body.fields.slug) {
			return res
				.status(400)
				.json({ message: "Invalid webhook call\nNo slug in request" });
		}
		let postSlug = req.body.fields.slug["en-US"];

		// revalidate the individual post and the home page

		await res.revalidate(`/blog/${postSlug}`);
		await res.revalidate("/blog");
		await res.revalidate("/");
		await writeSearches();
		return res.json({ revalidated: true });
	} catch (err) {
		// If there was an error, Next.js will continue
		// to show the last successfully generated page
		console.log(err);
		return res
			.status(500)
			.send({ message: "Error revalidating", revalidated: false });
	}
}
