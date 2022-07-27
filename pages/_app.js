import '../styles/globals.css'
import Link from 'next/link';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json())
      }}
    > 
      <div className='flex justify-center text-center mx-auto'><Link href="/courses">Courses</Link> | <Link href="/events">Events</Link> </div>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
