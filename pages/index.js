import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Date from '../components/date';

import { getSortedPostsData } from '../lib/posts';

// sets props in Home Component
export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData
		}
	};
}

export default function Home({ allPostsData }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>
					Hey, my name is Joey. I am a enginner and developer of the internet. You can check out my{' '}
					<a target='__blank' href='https://github.com/jwdesjardin'>
						github profile.
					</a>
				</p>
				<p>
					(This is a sample website - you’ll be building a site like this on{' '}
					<a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
				</p>
			</section>

			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ slug, date, title }) => (
						<li className={utilStyles.listItem} key={slug}>
							<Link href={`/posts/${slug}`}>
								<a>{title}</a>
							</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
