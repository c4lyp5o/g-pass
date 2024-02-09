import { useState, useEffect } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { toast } from 'react-toastify';

import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import AddModal from './modals/add';
import EditModal from './modals/edit';
import DeleteModal from './modals/delete';
import AddExcel from './modals/excel';
import AddJson from './modals/json';
import Loading from './loading';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import PageSelector from './pageSelector';

const fetcher = (url) => fetch(url).then((res) => res.json());

function RenderModal(props) {
  const { openAddModal, openEditModal, openDeleteModal, addExcel, addJson } =
    props;

  return (
    <>
      {openAddModal && <AddModal {...props} />}
      {openEditModal && <EditModal {...props} />}
      {openDeleteModal && <DeleteModal {...props} />}
      {addExcel && <AddExcel {...props} />}
      {addJson && <AddJson {...props} />}
    </>
  );
}

export default function Data({ toggle }) {
  const [page, setPage] = useState(1);
  const [philter, setPhilter] = useState('');
  const [entity, setEntity] = useState({});
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [addExcel, setAddExcel] = useState(false);
  const [addJson, setAddJson] = useState(false);

  const [usingSearch, setUsingSearching] = useState(false);
  const [searchIsRunning, setSearchIsRunning] = useState(false);

  const {
    data: allItems,
    error,
    mutate,
  } = useSWR(`/gpass/api/gpass?type=${toggle}&page=${page}`, fetcher);

  const { trigger: doSearch, data: searchItems } = useSWRMutation(
    `/gpass/api/gpass?type=search&data=${toggle}&searchParams=${philter}&page=${page}`,
    fetcher,
    {
      onError: (err) => {
        console.log(err);
      },
      onSuccess: (data) => {
        if (data) {
          setUsingSearching(true);
          setSearchIsRunning(false);
        } else {
          toast.info('No result found...');
          setUsingSearching(false);
          setSearchIsRunning(false);
        }
      },
    }
  );

  const getJSON = async () => {
    const res = await fetch(
      `/gpass/api/gpass?type=download&from=${toggle}&filetype=json`
    );
    const blob = await res.blob();
    const link = document.createElement('a');
    link.download = `${toggle}.json`;
    link.href = URL.createObjectURL(new Blob([blob]));
    link.addEventListener('click', (e) => {
      setTimeout(() => {
        URL.revokeObjectURL(link.href);
      }, 100);
    });
    link.click();
  };

  const getXLSX = async () => {
    const res = await fetch(
      `/gpass/api/gpass?type=download&from=${toggle}&filetype=xlsx`
    );
    const blob = await res.blob();
    const link = document.createElement('a');
    link.download = `${toggle}.xlsx`;
    link.href = URL.createObjectURL(new Blob([blob]));
    link.addEventListener('click', (e) => {
      setTimeout(() => {
        URL.revokeObjectURL(link.href);
      }, 100);
    });
    link.click();
  };

  const props = {
    mutate,
    toggle,
    entity,
    allItems,
    searchItems,
    usingSearch,
    searchIsRunning,
    setEntity,
    philter,
    setPhilter,
    page,
    setPage,
    openAddModal,
    setOpenAddModal,
    openEditModal,
    setOpenEditModal,
    openDeleteModal,
    setOpenDeleteModal,
    addExcel,
    setAddExcel,
    addJson,
    setAddJson,
  };

  useEffect(() => {
    setPage(1);
  }, [toggle]);

  useEffect(() => {
    let timer;

    if (philter === '') {
      setUsingSearching(false);
      setSearchIsRunning(false);
      setPage(1);
    } else {
      setSearchIsRunning(true);
      timer = setTimeout(() => {
        doSearch();
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [philter, doSearch]);

  if (!allItems) return <Loading />;

  if (error) return <div>Error...</div>;

  return (
    <>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <h1 className='text-base font-semibold leading-6 text-gray-900 uppercase'>
              {toggle === 'kkiakd' ? 'KKIA / KD' : toggle}
            </h1>
          </div>
          <div className='sm:ml-16 sm:mt-0 sm:flex-none flex space-x-3'>
            <button
              type='button'
              onClick={() => setOpenAddModal(true)}
              className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Daftar{' '}
              <span className='capitalize'>
                {toggle === 'kkiakd' ? 'KKIA / KD' : toggle}
              </span>{' '}
              Baru
            </button>
            <button
              type='button'
              className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              onClick={(e) => setAddExcel(true)}
            >
              Tambah{' '}
              <span className='capitalize'>
                {toggle === 'kkiakd' ? 'KKIA / KD' : toggle}
              </span>{' '}
              Dengan Excel
            </button>
            {/* <button
              type='button'
              className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              onClick={(e) => setAddJson(true)}
            >
              Tambah <span className='capitalize'>{toggle === 'kkiakd' ? 'KKIA / KD' : toggle}</span> Dengan JSON
            </button> */}
            <button
              type='button'
              className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              onClick={(e) => getXLSX()}
            >
              Muatturun Excel{' '}
              <span className='capitalize'>
                {toggle === 'kkiakd' ? 'KKIA / KD' : toggle}
              </span>
            </button>
            {/* <button
              type='button'
              className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              onClick={(e) => getJSON()}
            >
              Muatturun JSON <span className='capitalize'>{toggle === 'kkiakd' ? 'KKIA / KD' : toggle}</span>
            </button> */}
          </div>
        </div>
        <div>
          {/* Sticky search header */}
          <div className='sticky top-0 my-4 z-40 flex h-16 shrink-0 items-center gap-x-6 px-4 shadow-sm sm:px-6 lg:px-8'>
            <button
              type='button'
              className='-m-2.5 p-2.5 text-white xl:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <Bars3Icon className='h-5 w-5' aria-hidden='true' />
            </button>

            <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
              <form className='flex flex-1' action='#' method='GET'>
                <label htmlFor='search-field' className='sr-only'>
                  Carian {toggle === 'kkiakd' ? 'KKIA / KD' : toggle}...
                </label>
                <div className='relative w-full'>
                  <MagnifyingGlassIcon
                    className='pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500'
                    aria-hidden='true'
                  />
                  <input
                    id='search-field'
                    onChange={(e) => {
                      setPhilter(e.target.value.toLowerCase());
                    }}
                    className='block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-grey-200 focus:ring-0 sm:text-sm'
                    placeholder='Search...'
                    type='search'
                    name='search'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {searchIsRunning ? (
          <Loading />
        ) : (
          <div className='flow-root'>
            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-300'>
                    <TableHeader {...props} />
                    <TableBody {...props} />
                  </table>
                </div>
              </div>
            </div>
            <PageSelector {...props} />
          </div>
        )}
      </div>

      <RenderModal {...props} />
    </>
  );
}
