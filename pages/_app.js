import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

import Layout from '../components/layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
