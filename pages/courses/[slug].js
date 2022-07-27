import axios from 'axios';
import Image from 'next/image'
import { NextSeo } from 'next-seo';
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

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const data = await apiGetPublic(`/courses/${slug}/`)
  return { props: { initialData: JSON.stringify(data) } }
}

export default function About({ initialData }) {

  const courseQuery = JSON.parse(initialData);

  let course = {
    partners: [],
    sessions: [],
    value: {
      ideal_for: [], overview: '', details: '', fees: '', registration: '', included: [], testimonials: []
    }
  };

  let openGraph = { images: [] };

  if (courseQuery) {
    course = courseQuery;
    const [nbody] = JSON.parse(course.body);
    course.value = nbody.value;

    openGraph = {
      ...course,
      title: course.seo_title,
      description: course.search_description,
      images: [{ url: course.banner }]
    };
  }

  return (
    <div className={styles.container}>
      <NextSeo
        title={course.title}
        description={course.description}
        openGraph={openGraph}
      />

      <main className={styles.main}>
        <h1 className={styles.title}>
          {course.title}
        </h1>

        <p className={styles.description}>
          {course.description}
        </p>

        <div className={styles.grid}>
          <Image
            className=""
            src={course.banner}
            alt="Flag"
            width={180}
            height={180}
          />
        </div>
      </main>
    </div>
  )
}
