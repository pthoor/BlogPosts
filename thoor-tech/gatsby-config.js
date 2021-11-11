module.exports = {
	siteMetadata: {
		bio: 'Blogging and talking about Microsoft Cloud',
		title: `Thoor.tech`,
		author: `Pierre Thoor`,
		description: `Personal blog of Pierre Thoor`,
		ogimage: 'content/assets/og-image.jpg',
		domain: 'thoor.tech',
		siteUrl: `https://thoor.tech`,
		repo: 'pthoor/blog',
		social: {
			twitter: `https://twitter.com/PierreThoor`,
			github: 'https://github.com/pthoor',
			email: 'mailto:pierre@thoor.tech',
      		linkedin: `https://www.linkedin.com/in/pierrethoor/`,
      		info: './about',
			podcast: 'https://podcasts.apple.com/se/podcast/azure-ms-365-pt-session-podcast/id1527849931',
			spotify: 'https://open.spotify.com/show/5E3fARGuhtcC3RYbarXalT'
		},
	},
	plugins: [
		`gatsby-plugin-emotion`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/blog`,
				name: `blog`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/pages`,
				name: `pages`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets`,
				name: `assets`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 590,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
					`gatsby-remark-external-links`,
				],
			},
		},
		`gatsby-plugin-image`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-robots-txt`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-feed`,
			options: {
			  query: `
				{
				  site {
					siteMetadata {
					  title
					  description
					  siteUrl
					  site_url: siteUrl
					}
				  }
				}
			  `,
			  feeds: [
				{
				  serialize: ({ query: { site, allMarkdownRemark } }) => {
					return allMarkdownRemark.nodes.map(node => {
					  return Object.assign({}, node.frontmatter, {
						description: node.excerpt,
						date: node.frontmatter.date,
						url: site.siteMetadata.siteUrl + node.fields.slug,
						guid: site.siteMetadata.siteUrl + node.fields.slug,
						custom_elements: [{ "content:encoded": node.html }],
					  })
					})
				  },
				  query: `
					{
					  allMarkdownRemark(
						sort: { order: DESC, fields: [frontmatter___date] },
					  ) {
						nodes {
						  excerpt
						  html
						  fields { 
							slug 
						  }
						  frontmatter {
							title
							date
						  }
						}
					  }
					}
				  `,
				  output: "/rss.xml",
				  title: "Your Site's RSS Feed",
				  // optional configuration to insert feed reference in pages:
				  // if `string` is used, it will be used to create RegExp and then test if pathname of
				  // current page satisfied this regular expression;
				  // if not provided or `undefined`, all pages will have feed reference inserted
				  match: "^/blog/",
				  // optional configuration to specify external rss feed, such as feedburner
				  link: "https://feeds.feedburner.com/gatsby/blog",
				},
			  ],
			},
		  },
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Thoor Tech`,
				short_name: `Thoor`,
				start_url: `/`,
				background_color: `#121212`,
				theme_color: `#1d1d1d`,
				display: `minimal-ui`,
				icon: `static/favicon.png`,
			},
		},
		`gatsby-plugin-offline`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography`,
			},
		},
		{
			resolve: `gatsby-plugin-google-gtag`,
      		options: {
        		// You can add multiple tracking ids and a pageview event will be fired for all of them.
				trackingIds: [
				"G-WZZHMWX8JQ", // Google Analytics / GA
				],
				// This object is used for configuration specific to this plugin
				pluginConfig: {
				// Puts tracking script in the head instead of the body
				head: true,
        		},
			},
		},
		{
			resolve: `gatsby-plugin-nprogress`,
			options: {
				color: `salmon`,
			},
		},
		{
			resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
			options: {
				devMode: false,
			},
		},
		'gatsby-plugin-catch-links',
	],
};
