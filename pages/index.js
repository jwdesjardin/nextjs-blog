import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Date from '../components/date';
import { Button, Card, Form } from 'react-bootstrap';

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
			<section className={`${utilStyles.headingMd} ${utilStyles.medContainer}`}>
				<div className={utilStyles.textbox}>
					<p>
						Hey, my name is Joey. I am a enginner and developer of the internet. You can
						check out my{' '}
						<a target='__blank' href='https://github.com/jwdesjardin'>
							<Button variant='outline-primary'>github profile</Button>
						</a>
					</p>
					<p>
						You can learn more about this purpose of this blog{' '}
						<Link href='/about'>here.</Link>
					</p>
				</div>
			</section>

			<div className={utilStyles.textbox}>
				<Form>
					<Form.Control type='text' placeholder='React, Redux, PostgreSQL... ' />
					<Button>Search</Button>
				</Form>
			</div>

			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ slug, date, title }) => (
						<li className={utilStyles.listItem} key={slug}>
							<Card className='bg-dark p-2'>
								<Link href={`/posts/${slug}`}>
									<a>{title}</a>
								</Link>
								<small className={utilStyles.lightText}>
									<Date dateString={date} />
								</small>
							</Card>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
