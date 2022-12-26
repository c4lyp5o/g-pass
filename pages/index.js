import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

import Data from '../components/data';
import Loading from '../components/loading';

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [toggle, setToggle] = useState(null);

  if (loading) {
    return <Loading />;
  }

  if (!session) return signIn();

  if (session) {
    return (
      <div className='mx-auto w-1/2 h-1/2 flex flex-col justify-center items-center mt-2'>
        <h2 className='font-mono p-5'>Menu Utama</h2>
        <div className='grid grid-cols-3 gap-2'>
          <button
            className={`capitalize bg-green-400 rounded-md shadow-xl p-2 hover:bg-green-600 transition-all
            ${toggle === 'pegawai' ? 'bg-yellow-300 hover:bg-yellow-200' : ''}
          `}
            onClick={() => setToggle('pegawai')}
          >
            PEGAWAI PERGIGIAN
          </button>
          <button
            className={`capitalize bg-green-400 rounded-md shadow-xl p-2 hover:bg-green-600 transition-all ${
              toggle === 'juruterapi' ? 'bg-yellow-300 hover:bg-yellow-200' : ''
            }`}
            onClick={() => setToggle('juruterapi')}
          >
            JURUTERAPI PERGIGIAN
          </button>
          <button
            className={`capitalize bg-green-400 rounded-md shadow-xl p-2 hover:bg-green-600 transition-all ${
              toggle === 'fasiliti' ? 'bg-yellow-300 hover:bg-yellow-200' : ''
            }`}
            onClick={() => setToggle('fasiliti')}
          >
            KLINIK PERGIGIAN
          </button>
        </div>
        {toggle ? <Data toggle={toggle} /> : null}
      </div>
    );
  }
}
