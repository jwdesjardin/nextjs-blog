import React from 'react';
import utilStyles from '../styles/utils.module.css';
import Date from '../components/date';

import Link from 'next/link';
import styles from './Post.module.css';

const Post = ({ slug, title, date, description, tags }) => {
	return (
		<div className={styles.card}>
			<Link href={`/posts/${slug}`}>
				<a>{title}</a>
			</Link>
			<small className={utilStyles.lightText + ' ' + styles.date}>
				<Date dateString={date} />
			</small>
			<p>{description && description}</p>
			<div className={styles.tagDiv}>
				{tags &&
					tags.map((tag, index) => (
						<span key={index} className={styles.tag}>
							{tag}{' '}
						</span>
					))}
			</div>
		</div>
	);
};

export default Post;
