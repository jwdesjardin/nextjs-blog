import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import styles from '../styles/index.module.css';

import { Button, Card, Form } from 'react-bootstrap';
import Tags from '../components/Tags';
import { getSortedPostsData } from '../lib/posts';
import Posts from '../components/Posts';
import { useState, useEffect } from 'react';

// sets props in Home Component
export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	const tagFrequencyCounter = {};
	allPostsData.forEach(post => {
		if (post.tags) {
			post.tags.forEach(tag => {
				tagFrequencyCounter[tag] = (tagFrequencyCounter[tag] || 0) + 1;
			});
		}
	});

	return {
		props: {
			allPostsData,
			tagFrequencyCounter
		}
	};
}

export default function Home({ allPostsData, tagFrequencyCounter }) {
	const [ filterTags, setFilterTags ] = useState([]);
	const [ filterQuery, setFilterQuery ] = useState('');
	const [ filteredPostData, setFilteredPostData ] = useState(allPostsData);

	useEffect(
		() => {
			// find all posts that match selected tags
			const filteredData = allPostsData.filter(post => {
				const tags = post.tags || null;
				// keep if post has tags and some of tags are in filter list
				if (tags) {
					return tags.some(tag => filterTags.includes(tag));
				}
			});

			if (filterQuery !== '') {
				// data is either filtered data or all posts if no tags selected
				const data = filteredData.length > 0 ? filteredData : allPostsData;
				// keep posts that have title or desc that match query
				const queryResults = data.filter(
					post =>
						post.title.includes(filterQuery) || post.description.includes(filterQuery)
				);

				setFilteredPostData([ ...queryResults ]);
			} else {
				setFilteredPostData([ ...filteredData ]);
			}

			if (filterQuery === '') {
				setFilteredPostData([ ...allPostsData ]);
			}
		},
		[ filterTags, filterQuery ]
	);

	useEffect(
		() => {
			if (filterTags.length === 0) {
				if (filterQuery === '') {
					//case 1 - no tags or query
					setFilteredPostData([ ...allPostsData ]);
				} else {
					// case 2 - no tags / yes query
					const data = allPostsData;
					const queryResults = data.filter(
						post =>
							post.title.includes(filterQuery) ||
							post.description.includes(filterQuery)
					);
					setFilteredPostData([ ...queryResults ]);
				}
				// else we have tags
			} else {
				const filteredData = allPostsData.filter(post => {
					const tags = post.tags;
					return tags.some(tag => filterTags.includes(tag));
				});
				if (filterQuery === '') {
					//case 3 - no query / yes tags
					setFilteredPostData([ ...filteredData ]);
				} else {
					// case 4 - yes query / yes tags
					const data = filteredData;
					const queryResults = data.filter(
						post =>
							post.title.includes(filterQuery) ||
							post.description.includes(filterQuery)
					);
					setFilteredPostData([ ...queryResults ]);
				}
			}
		},
		[ filterTags, filterQuery ]
	);

	function toggleTagFilter({ currentTarget: target }) {
		setFilterTags(prevTags => {
			if (prevTags.includes(target.value)) {
				return prevTags.filter(tag => target.value !== tag);
			} else {
				return [ ...prevTags, target.value ];
			}
		});
	}

	console.log(filteredPostData);

	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={`${utilStyles.headingMd} ${utilStyles.medContainer}`}>
				<div className={utilStyles.flexCenter}>
					<p className={styles.leadText}>
						Hey, my name is Joey. I enjoy building full-stack applications for the
						internet. You can check out my latest projects on my{' '}
						<a target='__blank' href='https://github.com/jwdesjardin'>
							<button className={styles.button + ' ' + styles.primary}>
								github profile
							</button>
						</a>
						{'. '}
						You can learn more about this purpose of this blog{' '}
						<Link href='/about'>
							<button className={styles.button + ' ' + styles.secondary}>here</button>
						</Link>
					</p>
				</div>
			</section>

			<div className={utilStyles.flexCenter}>
				<form>
					<input
						style={{ margin: '1rem' }}
						type='text'
						placeholder='search... '
						value={filterQuery}
						onChange={e => setFilterQuery(e.target.value)}
						name='search'
						autoComplete='off'
						className={styles.searchInput}
					/>
				</form>
			</div>

			{/* tags */}

			{tagFrequencyCounter &&
			filterTags && (
				<Tags
					tagFrequencyCounter={tagFrequencyCounter}
					filterTags={filterTags}
					toggleTagFilter={toggleTagFilter}
				/>
			)}

			{/* posts */}
			<section
				className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${styles.postsSection}`}
			>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<Posts postData={filteredPostData} />
			</section>
		</Layout>
	);
}
