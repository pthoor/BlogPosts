import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FiTwitter, FiGithub, FiMail, FiTerminal } from 'react-icons/fi';
import { FaMicrosoft } from 'react-icons/fa';
import { GiAchievement } from 'react-icons/gi';
//import { FaStackOverflow, FaGoodreadsG } from 'react-icons/fa';
import { FaLinkedinIn, FaInfoCircle, FaPodcast, FaSpotify } from 'react-icons/fa';
import { mediaMax } from '@divyanshu013/media';
import { keyframes } from '@emotion/react';

import Button from './Button';
import { rhythm } from '../utils/typography';
import { getTheme } from '../utils/theme';
import ThemeContext from './ThemeContext';
import { BREAK } from 'graphql-compose/lib/graphql';

const SIDEBAR_QUERY = graphql`
	{
		avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
			childImageSharp {
				gatsbyImageData(layout: FIXED, width: 128, height: 128)
			}
		}
		mvp: file(absolutePath: { regex: "/MVP_Badge_H.jpg/" }) {
			childImageSharp {
				gatsbyImageData(layout: CONSTRAINED, width: 100)
			}
		}
		site {
			siteMetadata {
				author
				bio
				title
				social {
					twitter
					github
					email
					linkedin
					info
					podcast
					spotify
					microsoft
					credly
				}
			}
		}
	}
`;

const Sidebar = () => {
	const data = useStaticQuery(SIDEBAR_QUERY);
	const { avatar } = data;
	const { mvp } = data;
	const { author, bio, social } = data.site.siteMetadata;
	const siteTitle = data.site.siteMetadata.title;
	const { theme } = useContext(ThemeContext);
	const { muted } = getTheme(theme);
	const { color, background, secondary } = getTheme(theme);
	const borderStartingColor = theme === 'light' ? 'hsla(0, 0%, 0%, 0.1)' : 'hsla(0, 0%, 100%, 0.1)';
	const terminalAnimation = keyframes({
		from: {
			stroke: color,
		},
		to: {
			stroke: background,
		},
	});

	const terminalStyles = {
		marginRight: 8,
		line: {
			animation: `${terminalAnimation} 0.5s ease-in-out infinite`,
			animationDirection: 'alternate',
		},
	};
	return (
		<nav
			css={{
				borderRight: '1px solid',
				margin: '24px 0',
				padding: '16px 64px',
				alignSelf: 'start',
				borderImage: `linear-gradient(to bottom, ${borderStartingColor}, hsla(0, 0%, 0%, 0)) 1 100%`,
				[mediaMax.large]: {
					borderBottom: '1px solid',
					borderImage: `linear-gradient(to right, ${borderStartingColor}, hsla(0, 0%, 0%, 0)) 1 100%`,
					borderImageSlice: 1,
					padding: `16px 0 ${rhythm(2)} 0`,
					margin: '24px 32px',
				},
			}}
		>
			<div
				css={{
					[mediaMax.small]: {
						display: 'grid',
						gridTemplateColumns: 'auto auto',
						gridGap: 16,
						alignItems: 'center',
						justifyContent: 'start',
					},
				}}
			>
				<GatsbyImage
					alt={author}
					image={avatar.childImageSharp.gatsbyImageData}
					imgStyle={{ borderRadius: '50%' }}
					css={{
						marginBottom: rhythm(0.8),
						opacity: 0.87,
						[mediaMax.small]: {
							width: '64px !important',
							height: '64px !important',
							order: 1,
						},
					}}
				/>
				<h3
				style={{
					marginTop: 0,
				}}
			>
				<Link
					style={{
						boxShadow: `none`,
						textDecoration: `none`,
						color: `inherit`,
						display: 'inline-flex',
						alignItems: 'flex-end',
					}}
					to="/"
				>
					<FiTerminal css={terminalStyles} /> Thoor.tech
				</Link>
			</h3>
			</div>
			<p className="muted" css={{ color: muted }}>
				<h4>Pierre Thoor <br/>Product Manager writing <br/>and talking about <br/>Microsoft Cloud stuff</h4>
				<GatsbyImage
					alt={author}
					image={mvp.childImageSharp.gatsbyImageData}
					imgStyle={{ borderRadius: '0%' }}
					css={{
						marginBottom: rhythm(0.8),
						opacity: 0.87,
						[mediaMax.small]: {
							width: '64px !important',
							height: '64px !important',
							order: 1,
						},
					}}
				/>
			</p>
			<div
				css={{
					display: 'grid',
					gridGap: 10,
					gridTemplateColumns: 'repeat(3, auto)',
					justifyItems: 'center',
					justifyContent: 'start',
				}}
			>
				<Button
					title="Twitter"
					aria-label="Link to my Twitter"
					as="a"
					circular
					href={social.twitter}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiTwitter />
				</Button>
				<Button
					title="GitHub"
					aria-label="Link to my GitHub"
					as="a"
					circular
					href={social.github}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiGithub />
				</Button>
				<Button
					title="Email me"
					aria-label="Email me"
					as="a"
					circular
					href={social.email}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiMail />
				</Button>
				<Button
					title="LinkedIn"
					aria-label="Link to my LinkedIn"
					as="a"
					circular
					href={social.linkedin}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaLinkedinIn />
				</Button>
				<Button
					title="Info"
					aria-label="About me"
					as="a"
					circular
					href={social.info}
					target="_self"
					rel="noopener noreferrer"
				>
					<FaInfoCircle />
				</Button>
				<Button
					title="Apple Podcast"
					aria-label="Apple Podcast"
					as="a"
					circular
					href={social.podcast}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaPodcast />
				</Button>
				<Button
					title="Spotify"
					aria-label="Spotify"
					as="a"
					circular
					href={social.spotify}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaSpotify />
				</Button>
				<Button
					title="Microsoft MVP"
					aria-label="Microsoft MVP"
					as="a"
					circular
					href={social.microsoft}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaMicrosoft />
				</Button>
				<Button
					title="Credly"
					aria-label="Credly"
					as="a"
					circular
					href={social.credly}
					target="_blank"
					rel="noopener noreferrer"
				>
					<GiAchievement />
				</Button>
			</div>
		</nav>
	);
};

export default Sidebar;
