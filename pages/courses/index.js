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
    cert: '',
    location: "",
    search: "",
    ctype: 'offline'
  });

  const coursesQuery = useSWR(['courses', 'offline'], () => apiListPublic('/courses/', jformat));

  return (
    <div className={styles.container}>
      <DefaultSeo
        titleTemplate="%s | Data Protection Excellence (DPEX) Network"
        defaultTitle="Data Protection Excellence (DPEX) Network"
      />

      <main className={styles.main}>
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
          {coursesQuery.data && coursesQuery.data.sort((a, b) => a.session[4].toString().localeCompare(b.session[4].toString()))
            .map((course) => (
              <Fragment key={course.slug}>
                <Link href={`/courses/${course.slug}`}>
                  <div className="card courseCard">
                    <div className="newsImg tw-mt-2 tw-mr-2 tw-float-right cardFlag">
                      <Image
                        className=""
                        src={course.banner_thumb}
                        alt="Flag"
                        width={35}
                        height={35}
                      />
                    </div>
                    <h4>{course.title}</h4>
                    <p>{course.desc_short}</p>
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
