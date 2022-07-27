import axios from 'axios';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import styles from '../../styles/Home.module.css'

const apiGetPublic = async (url) => {
  try {
    const res = await axios.get(`https://marketing.genexist.com/api${url}`);
    const { data } = res;
    return data;
  } catch (err) {
    return { err };
  }
};
const apiListPublic = async (url, query) => {
  const res = await axios.get(`https://marketing.genexist.com/api${url}?${query}`);
  const { data } = res;
  return data;
};

export async function getStaticProps(context) {
  const { slug } = context.params;
  const data = await apiGetPublic(`/events/${slug}/`)
  return { props: { initialData: data } }
}

export async function getStaticPaths() {
  const events = await apiListPublic('/events/');
  return {
    paths: events.map((item) => `/events/${item.slug}`),
    fallback: true
  };
}

export default function About({ initialData }) {

  // useSWR(`/${slug}`, apiGetPublic, { initialData });
  const eventQuery = initialData;

  let event = { body: '', partners: [], start_list: [] };

  let openGraph = { images: [] };

  if (eventQuery) {
    event = eventQuery;
    openGraph = {
      ...event,
      title: event.title,
      description: event.search_description,
      images: [{ url: event.banner }]
    };
  }

  return (
    <div className={styles.container}>
      <NextSeo title={event.title} description={event.search_description} openGraph={openGraph} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          {event.title}
        </h1>

        <p className={styles.description}>
          {event.search_description}
        </p>

        <Image
          className=""
          src={event.banner}
          alt="Flag"
          width={700}
          height={300}
        />
      </main>
    </div>
  )
}
