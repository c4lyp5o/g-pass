import Head from 'next/head';

import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Sistem G-PASS</title>
        <meta name='description' content='G-PASS API platform' />
        <link rel='icon' href='/gpass/favicon.ico' />
      </Head>
      <Header />
      <div className='absolute inset-0 -z-10 bg-admin5'></div>
      <div className='absolute inset-10 top-[8rem] -z-10 bg-adminWhite text-center justify-center items-center outline outline-1 outline-adminBlack rounded-md shadow-xl capitalize overflow-y-auto overflow-x-hidden pb-5 px-3'>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
