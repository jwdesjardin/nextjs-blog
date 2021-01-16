import React from 'react';
import utilStyles from '../styles/utils.module.css';
import styles from './Tags.module.css';
import Tag from './Tag';

const Tags = ({ tagFrequencyCounter, filterTags, toggleTagFilter }) => {
	return (
		<div className='container'>
			<h2 className={utilStyles.headingLg}>Tags</h2>
			<div className={styles.flexWrap}>
				{Object.keys(tagFrequencyCounter).length > 0 &&
					Object.keys(tagFrequencyCounter).map((tag, index) => (
						<Tag
							tag={tag}
							index={index}
							tagFrequencyCounter={tagFrequencyCounter}
							filterTags={filterTags}
							toggleTagFilter={toggleTagFilter}
							key={index}
						/>
					))}
			</div>
		</div>
	);
};

export default Tags;
