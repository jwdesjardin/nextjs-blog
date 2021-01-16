import React from 'react';
import styles from './Tag.module.css';

const Tag = ({ tag, toggleTagFilter, tagFrequencyCounter, filterTags }) => {
	const selectedStyles = filterTags.includes(tag) ? styles.isSelected : '';
	return (
		<button onClick={toggleTagFilter} className={styles.tag + ' ' + selectedStyles} value={tag}>
			<p>
				{tag} <span className={styles.tagCount}> {tagFrequencyCounter[tag]}</span>
			</p>
		</button>
	);
};

export default Tag;
