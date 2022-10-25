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

  if (session) {
    return (
      <div>
        <div>
          Menu Utama
          <div className='grid grid-cols-2'>
            <div>
              <button
                className='capitalize bg-green-400 rounded-md shadow-xl p-2 hover:bg-admin1 transition-all'
                onClick={() => setToggle('pegawai')}
              >
                PEGAWAI PERGIGIAN
              </button>
            </div>
            <div>
              <button
                className='capitalize bg-green-400 rounded-md shadow-xl p-2 hover:bg-admin1 transition-all'
                onClick={() => setToggle('juruterapi')}
              >
                JURUTERAPI PERGIGIAN
              </button>
            </div>
          </div>
          {toggle ? <Data toggle={toggle} /> : null}
        </div>
      </div>
    );
  } else {
    return (
      <div className='mx-auto w-1/2 h-1/2 flex flex-col justify-center items-center'>
        Sila log masuk <br />
        <button
          className='capitalize bg-green-400 rounded-md shadow-xl p-2 hover:bg-admin1 transition-all'
          onClick={() => signIn()}
        >
          log masuk
        </button>
      </div>
    );
  }
}
