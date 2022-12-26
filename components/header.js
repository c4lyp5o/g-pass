import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

import Loading from './loading';

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (loading) {
    return <Loading />;
  }

  if (session) {
    return (
      <div className='absolute bg-green-400 top-0 left-0 right-0 grid grid-cols-1 lg:grid-cols-2 grid-rows-1 items-center h-28 font-sans capitalize justify-center'>
        <div className='hidden lg:grid grid-cols-2'>
          <div className='grid grid-rows-[50px_10px_10px] gap-1 text-center col-start-2 justify-end'>
            <Image
              className='w-full h-full'
              src='https://upload.wikimedia.org/wikipedia/commons/9/94/Jata_MalaysiaV2.svg'
              alt='missing jata negara'
              width={70}
              height={70}
            />
            <p className='uppercase text-[0.65rem]'>
              kementerian kesihatan malaysia
            </p>
            <p className='uppercase text-[0.65rem]'>
              program kesihatan pergigian
            </p>
          </div>
        </div>
        <div className='lg:flex'>
          <div className='grid grid-rows-2 text-2xl font-bold text-center'>
            <h1 className='row-span-2'>sistem G</h1>
            <h1>PASS</h1>
          </div>
          <div className='admin-header-logged-in-container'>
            <div className='absolute top-10 right-5 flex w-auto h-10 items-center justify-center capitalize text-userWhite text-xs'>
              <div className='m-3 space-y-1 text-right pr-2'>
                <p className='w-96 text-sm leading-3'>
                  <b>Pengguna: </b>
                  <span className='uppercase'>
                    {session.user.name ?? session.user.email}
                  </span>
                </p>
              </div>
              <button
                type='button'
                className='p-1 text-adminWhite bg-admin3 hover:bg-opacity-80 rounded-sm shadow-xl outline outline-1 outline-admin4 transition-all'
                onClick={() => signOut()}
              >
                LOG KELUAR
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='absolute bg-green-400 top-0 left-0 right-0 grid grid-cols-1 lg:grid-cols-2 grid-rows-1 items-center h-28 font-sans capitalize justify-center'>
        <div className='hidden lg:grid grid-cols-2'>
          <div className='grid grid-rows-[50px_10px_10px] gap-1 text-center col-start-2 justify-end'>
            <Image
              className='w-full h-full'
              src='https://upload.wikimedia.org/wikipedia/commons/9/94/Jata_MalaysiaV2.svg'
              alt='missing jata negara'
              width={70}
              height={70}
            />
            <p className='uppercase text-[0.65rem]'>
              kementerian kesihatan malaysia
            </p>
            <p className='uppercase text-[0.65rem]'>
              program kesihatan pergigian
            </p>
          </div>
        </div>
        <div className='lg:flex'>
          <div className='grid grid-rows-2 text-2xl font-bold text-center'>
            <h1 className='row-span-2'>sistem G</h1>
            <h1>PASS</h1>
          </div>
        </div>
      </div>
    );
  }
}
