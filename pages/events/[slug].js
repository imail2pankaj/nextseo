import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'
import { NextSeo, DefaultSeo } from 'next-seo';
import styles from '../../styles/Home.module.css'
import useSWR from 'swr';
import { SWRConfig } from 'swr';

const apiGetPublic = async (url) => {
  try {
    const res = await axios.get(`https://marketing.genexist.com/api${url}`);
    const { data } = res;
    return data;
  } catch (err) {
    return { err };
  }
};

export async function getServerSideProps(context) {
   const { slug } = context.query;
   const data = await apiGetPublic(`/events/${slug}/`)
   return { props: { initialData: JSON.stringify(data) } }
}

export default function About({initialData}) {

  // useSWR(`/${slug}`, apiGetPublic, { initialData });
  const eventQuery = JSON.parse(initialData);

  let event = { body: '', partners: [], start_list: [] };
  if (eventQuery) {
    event = eventQuery;
  }

  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json())
      }}
    >
      <div className={styles.container}>
        <DefaultSeo
          titleTemplate="%s | Data Protection Excellence (DPEX) Network"
          defaultTitle="Data Protection Excellence (DPEX) Network"
        />
        <NextSeo
          title={event.seo_title}
          description={event.search_description}
          openGraph={{
            url: 'https://www.url.ie/a',
            title: event.seo_title,
            description: event.search_description,
            images: [
              { url: event.banner },
            ]
          }}
        />

        <main className={styles.main}>
          <h1 className={styles.title}>
            {event.title}
          </h1>

          <p className={styles.description}>
            {event.search_description}
          </p>

          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </SWRConfig>
  )
}
