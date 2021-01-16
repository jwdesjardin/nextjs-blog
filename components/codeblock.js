import Highlight from 'react-highlight';
import '../node_modules/highlight.js/styles/nord.css';

const Codeblock = ({ value }) => {
	return (
		<div>
			<Highlight>{value}</Highlight>
			<br />
		</div>
	);
};

export default Codeblock;
