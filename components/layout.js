import { Fragment, useState } from 'react';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

import Loading from './loading';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const navigation = [
  {
    name: 'LAMAN UTAMA',
    href: '/',
    icon: HomeIcon,
  },
  {
    name: 'PEGAWAI PERGIGIAN',
    href: '/pegawai',
    icon: UsersIcon,
  },
  {
    name: 'JURUTERAPI PERGIGIAN',
    href: '/juruterapi',
    icon: UserGroupIcon,
  },
  {
    name: 'FASILITI',
    href: '/fasiliti',
    icon: BuildingOffice2Icon,
  },
  {
    name: 'KKIA / KD',
    href: '/kkiakd',
    icon: BuildingStorefrontIcon,
  },
  {
    name: 'LOG KELUAR',
    href: '/logkeluar',
    icon: ArrowRightStartOnRectangleIcon,
  },
];

export default function Layout({ children }) {
  const router = useRouter();
  const { status, data: sessionData } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === 'loading') return <Loading />;

  return (
    <div>
      <Head>
        <title>Sistem G-PASS</title>
        <meta name='description' content='G-PASS API platform' />
        <link rel='icon' href='/gpass/favicon.ico' />
      </Head>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50 lg:hidden'
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-900/80' />
          </Transition.Child>

          <div className='fixed inset-0 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                    <button
                      type='button'
                      className='-m-2.5 p-2.5'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className='sr-only'>Close sidebar</span>
                      <XMarkIcon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10'>
                  <div className='flex flex-col h-16 shrink-0 items-center'>
                    <div className='grid grid-rows-[50px_10px_10px] gap-1 text-center justify-end'>
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
                    <h1 className='text-2xl font-bold text-center text-white'>
                      Sistem G-PASS
                    </h1>
                  </div>
                  <nav className='flex flex-1 flex-col'>
                    <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                      <li>
                        <ul role='list' className='-mx-2 space-y-1'>
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link href={item.href}>
                                <p
                                  className={classNames(
                                    router.route === item.href
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon
                                    className='h-6 w-6 shrink-0'
                                    aria-hidden='true'
                                  />
                                  {item.name}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Static sidebar for desktop */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4'>
          <div className='flex h-16 shrink-0 items-center'>
            <div className='grid grid-rows-[50px_10px_10px] gap-1 text-center col-start-2 justify-end'>
              <Image
                className='w-full h-full'
                src='https://upload.wikimedia.org/wikipedia/commons/9/94/Jata_MalaysiaV2.svg'
                alt='missing jata negara'
                width={70}
                height={70}
              />
              <p className='uppercase text-[0.65rem] text-white'>
                kementerian kesihatan malaysia
              </p>
              <p className='uppercase text-[0.65rem] text-white'>
                program kesihatan pergigian
              </p>
              <h1 className='text-2xl font-bold text-center text-white'>
                Sistem G-PASS
              </h1>
            </div>
          </div>
          <nav className='flex flex-1 flex-col mt-10'>
            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
              <li>
                <ul role='list' className='-mx-2 space-y-1'>
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <p
                          href={item.href}
                          className={classNames(
                            router.route === item.href
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className='h-6 w-6 shrink-0'
                            aria-hidden='true'
                          />
                          {item.name}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
          <Menu as='div' className='relative'>
            <Menu.Button className='-m-1.5 flex items-center p-1.5'>
              <span className='sr-only'>Open user menu</span>
              <span className='hidden lg:flex lg:items-center'>
                <span
                  className='ml-4 text-sm font-semibold leading-6 text-white'
                  aria-hidden='true'
                >
                  {sessionData.user.email}
                </span>
              </span>
            </Menu.Button>
          </Menu>
        </div>
      </div>
      <div className='lg:pl-72'>
        <main className='py-5'>
          <div className='px-4 sm:px-6 lg:px-8'>{children}</div>
        </main>
      </div>
    </div>
  );
}
