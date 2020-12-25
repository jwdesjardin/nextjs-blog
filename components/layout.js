import Head from 'next/head';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Joey Desjardin';
export const siteTitle = `Joey Desjardin's Blog & Portfolio`;

export default function Layout({ children, home }) {
	return (
		<div className={styles.container}>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<meta
					name='description'
					content='Learn how to build a personal website using Next.js'
				/>
				<meta
					property='og:image'
					content={`https://og-image.now.sh/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name='og:title' content={siteTitle} />
				<meta name='twitter:card' content='summary_large_image' />
			</Head>
			<header className={styles.header}>
				{home ? (
					<div className={styles.headerDiv}>
						<img
							src='/images/brand.svg'
							className={`${styles.headerHomeImage}`}
							alt={name}
						/>
						<h1 className={utilStyles.heading2Xl}>JdCoding</h1>
					</div>
				) : (
					<div>
						<Link href='/'>
							<a>
								<img
									src='/images/brand.svg'
									className={`${styles.headerImage}`}
									alt={name}
								/>
							</a>
						</Link>
						<h2 className={utilStyles.headingLg}>
							<Link href='/'>
								<a className={utilStyles.colorInherit}>JdCoding</a>
							</Link>
						</h2>
					</div>
				)}
			</header>
			<main>{children}</main>
			{!home && (
				<div className={styles.backToHome}>
					<Link href='/'>
						<a>← Back to home</a>
					</Link>
				</div>
			)}
			<footer>
				<div className={`${utilStyles.lightText} ${styles.footer}`}>
					<p>Developed by Joey Desjardin</p> <p>2020</p>
				</div>
			</footer>
		</div>
	);
}
