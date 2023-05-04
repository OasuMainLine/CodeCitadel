const plugin = require("tailwindcss/plugin");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			typography: ({ theme }) => ({
				white: {
					css: {
						"--tw-prose-body": theme("colors.iWhite"),
						"--tw-prose-headings": theme("colors.iWhite"),
						"--tw-prose-lead": theme("colors.iWhite"),
						"--tw-prose-links": theme("colors.iWhite"),
						"--tw-prose-bold": theme("colors.iWhite"),
						"--tw-prose-counters": theme("colors.iWhite"),
						"--tw-prose-bullets": theme("colors.iWhite"),
						"--tw-prose-hr": theme("colors.iWhite"),
						"--tw-prose-quotes": theme("colors.iWhite"),
						"--tw-prose-quote-borders": theme("colors.iWhite"),
						"--tw-prose-captions": theme("colors.iWhite"),
						"--tw-prose-code": theme("colors.iWhite"),
						"--tw-prose-pre-code": theme("colors.iWhite"),
						"--tw-prose-pre-bg": theme("colors.iWhite"),
						"--tw-prose-th-borders": theme("colors.iWhite"),
						"--tw-prose-td-borders": theme("colors.iWhite"),
						"--tw-prose-invert-body": theme("colors.iWhite"),
						"--tw-prose-invert-headings": theme("colors.iWhite"),
						"--tw-prose-invert-lead": theme("colors.iWhite"),
						"--tw-prose-invert-links": theme("colors.iWhite"),
						"--tw-prose-invert-bold": theme("colors.iWhite"),
						"--tw-prose-invert-counters": theme("colors.iWhite"),
						"--tw-prose-invert-bullets": theme("colors.iWhite"),
						"--tw-prose-invert-hr": theme("colors.iWhite"),
						"--tw-prose-invert-quotes": theme("colors.iWhite"),
						"--tw-prose-invert-quote-borders": theme("colors.iWhite"),
						"--tw-prose-invert-captions": theme("colors.iWhite"),
						"--tw-prose-invert-code": theme("colors.iWhite"),
						"--tw-prose-invert-pre-code": theme("colors.iWhite"),
						"--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
						"--tw-prose-invert-th-borders": theme("colors.iWhite"),
						"--tw-prose-invert-td-borders": theme("colors.iWhite"),
					},
				},
			}),
			fontFamily: {
				mono: ["alma-mono", ...fontFamily.mono],
				sans: ["var(--font-quicksand)", ...fontFamily.sans],
			},
			colors: {
				dark: "#272727",
				primary: "#37AA78",
				secondary: "#3B97D4",
				alt: "#AA3737",
				iWhite: "#F3F3F3",
				iGray: "#ACACAC",
				footerBlue: "#101F29",
				footerLightBlue: "#1C3648",
			},
			boxShadow: {
				nav: "0px 2px 23px -9px #3B97D4;",
				search: "0px 0px 11px 1px rgba(59, 151, 212, 0.95);",
				"search-box": "0px 0px 6px rgba(255, 255, 255, 0.25);",
			},
			fontSize: {
				xxl: "1.375rem",
			},
			"text-shadow": {
				sm: "0 1px 2px var(--tw-shadow-color)",
				md: "0 2px 4px var(--tw-shadow-color)",
				lg: "0 8px 16px var(--tw-shadow-color)",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					"text-shadow": (value) => ({ "text-shadow": value }),
				},
				{ values: theme("text-shadow") }
			);
		}),
	],
};
