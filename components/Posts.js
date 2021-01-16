import React from 'react';
import utilStyles from '../styles/utils.module.css';
import Post from './Post';

const Posts = ({ postData }) => {
	return (
		<ul className={utilStyles.list}>
			{postData.length > 0 ? (
				postData.map(({ slug, date, title, tags, description }) => (
					<li className={utilStyles.listItem} key={slug}>
						<Post
							slug={slug}
							date={date}
							title={title}
							tags={tags}
							description={description}
						/>
					</li>
				))
			) : (
				<li> No Results found. Try another query.</li>
			)}
		</ul>
	);
};

export default Posts;
