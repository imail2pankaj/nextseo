import axios from 'axios';
import { Fragment } from 'react';
import { DefaultSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Home.module.css'
import useSWR from 'swr';

const qs = require('qs');

const apiListPublic = async (url, query) => {
  const res = await axios.get(`https://marketing.genexist.com/api${url}?${query}`);
  const { data } = res;
  return data;
};

export default function Home() {
  const jformat = qs.stringify({
    format: 'json',
    year: '',
    month: "",
    search: ""
  });

  const eventsQuery = useSWR(['events', 'offline'], () => apiListPublic('/events/', jformat));

  return (
    <div className={styles.container}>
      <DefaultSeo
        titleTemplate="%s | Data Protection Excellence (DPEX) Network"
        defaultTitle="Data Protection Excellence (DPEX) Network"
      />

      <main className={styles.main}>
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
          {eventsQuery.data && eventsQuery.data
            .map((event) => (
              <Fragment key={event.slug}>
                <Link href={`/events/${event.slug}`}>
                  <div className="card eventCard">
                    <div className="newsImg tw-mt-2 tw-mr-2 tw-float-right cardFlag">
                      <Image
                        className=""
                        src={event.banner_thumb}
                        alt="Flag"
                        width={50}
                        height={50}
                      />
                    </div>
                    <h4>{event.title}</h4>
                    <p>{event.search_description}</p>
                    <hr />
                  </div>
                </Link>
              </Fragment>
            ))}
        </div>
      </main>
    </div>
  )
}
