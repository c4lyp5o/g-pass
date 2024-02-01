import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

import Data from '../components/data';
import Loading from '../components/loading';

export default function Page() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const [toggle, setToggle] = useState(null);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'authenticated') {
    return (
      <div className='mx-auto w-1/2 h-1/2 flex flex-col justify-center items-center mt-2'>
        <div className='grid grid-cols-4 gap-2'>
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
          <button
            className={`capitalize bg-green-400 rounded-md shadow-xl p-2 hover:bg-green-600 transition-all ${
              toggle === 'kkiakd' ? 'bg-yellow-300 hover:bg-yellow-200' : ''
            }`}
            onClick={() => setToggle('kkiakd')}
          >
            KKIA / KD
          </button>
        </div>
        {toggle ? <Data key={toggle} toggle={toggle} /> : null}
      </div>
    );
  }
}
