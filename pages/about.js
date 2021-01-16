import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>About</h1>
				<p>
					First, to set some clear expectations about this 'blog'. The content you will
					find here has been collected primarily as a toolkit for myself as a programmer.
					This is not meant to be a complete learning resource for a beginner. This
					project is meant to produce <strong>organized</strong> information that can be
					refrenced <strong>efficiently</strong> when needed in a project.
				</p>
			</section>
		</Layout>
	);
}
