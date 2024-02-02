import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

import Layout from '../components/layout';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider
      session={pageProps.session}
      refetchInterval={5 * 60}
      basePath='/gpass/api/auth'
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </SessionProvider>
  );
}
