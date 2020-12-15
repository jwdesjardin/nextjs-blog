import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import ReactMarkdown from 'react-markdown';
import Codeblock from '../../components/codeblock';
import gfm from 'remark-gfm';

//sets props in Post Component - gets params from fileName
export async function getStaticProps({ params }) {
	const postData = await getPostData(params.slug);
	return {
		props: {
			postData
		}
	};
}

//creates paths
export async function getStaticPaths() {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false
	};
}

export default function Post({ postData }) {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<ReactMarkdown plugins={[ gfm ]} source={postData.contentHtml} renderers={{ code: Codeblock }} />
				{/* <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
			</article>
		</Layout>
	);
}
