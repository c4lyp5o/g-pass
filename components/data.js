import { useState, useEffect } from 'react';
import useSWR from 'swr';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

import AddModal from './modals/add';
import EditModal from './modals/edit';
import DeleteModal from './modals/delete';

import AddExcel from './modals/excel';
import AddJson from './modals/json';

import Loading from './loading';
import { toast } from 'react-toastify';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Data({ toggle }) {
  const [page, setPage] = useState(1);
  const [philter, setPhilter] = useState('');
  const [entity, setEntity] = useState({});
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [addExcel, setAddExcel] = useState(false);
  const [addJson, setAddJson] = useState(false);
  const { data, mutate, error } = useSWR(
    `/gpass/api/gpass?type=${toggle}&page=${page}`,
    fetcher
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
    entity,
    setEntity,
    toggle,
    openAddModal,
    setOpenAddModal,
    openEditModal,
    setOpenEditModal,
    openDeleteModal,
    setOpenDeleteModal,
    setAddExcel,
    setAddJson,
  };

  useEffect(() => {
    setPage(1);
  }, [toggle]);

  if (!data) return <Loading />;
  if (error) return <div>Error...</div>;

  // return (
  //   <>
  //     <div className='mx-auto flex justify-center items-center mt-2'>
  //       <div className='grid grid-rows-2 gap-2'>
  //         <div>
  //           <input
  //             type='search'
  //             className='outline outline-1 outline-green-600 rounded-md shadow-md w-96 p-2'
  //             id='search'
  //             placeholder={
  //               toggle !== 'fasiliti' && toggle !== 'kkiakd'
  //                 ? 'Cari pegawai...'
  //                 : 'Cari fasiliti...'
  //             }
  //             onChange={(e) => setPhilter(e.target.value.toLowerCase())}
  //           />
  //         </div>
  //         <div className='flex justify-center'>
  //           <button
  //             className='bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-2'
  //             onClick={(e) => setAddExcel(true)}
  //           >
  //             Tambah Dengan Excel
  //           </button>
  //           <button
  //             className='bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-2'
  //             onClick={(e) => setAddJson(true)}
  //           >
  //             Tambah Dengan JSON
  //           </button>
  //           <button
  //             className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2'
  //             onClick={(e) => getXLSX()}
  //           >
  //             Download Excel
  //           </button>
  //           <button
  //             className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2'
  //             onClick={(e) => getJSON()}
  //           >
  //             Download JSON
  //           </button>
  //           <button
  //             className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'
  //             onClick={(e) => toast('Coming Soon...')}
  //           >
  //             Restore from backup
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //     <button
  //       type='button'
  //       className='px-6 py-2.5 m-2 bg-green-600 hover:bg-green-400 font-medium text-xs uppercase rounded-md shadow-md transition-all'
  //       onClick={(e) => setOpenAddModal(true)}
  //     >
  //       Daftar {toggle} Baru
  //     </button>
  //     <div className='items-center justify-center'>
  //       <div className='m-auto overflow-x-auto text-xs rounded-md h-min max-w-max p-1'>
  //         <table className='table-auto'>
  //           <thead className='bg-green-600'>
  //             <tr>
  //               <th className='px-2 py-1 outline outline-1 outline-offset-1'>
  //                 Bil.
  //               </th>
  //               <th className='px-2 py-1 outline outline-1 outline-offset-1'>
  //                 {toggle !== 'fasiliti' ? 'Nama' : 'Nama Fasiliti'}
  //               </th>
  //               {toggle === 'pegawai' && (
  //                 <th className='px-2 py-1 outline outline-1 outline-offset-1'>
  //                   Nombor MDC
  //                 </th>
  //               )}
  //               {toggle === 'juruterapi' && (
  //                 <th className='px-2 py-1 outline outline-1 outline-offset-1'>
  //                   Nombor MDTB
  //                 </th>
  //               )}
  //               {toggle === 'fasiliti' && (
  //                 <>
  //                   <th className='px-2 py-1 outline outline-1 outline-offset-1'>
  //                     Daerah
  //                   </th>
  //                   <th className='px-2 py-1 outline outline-1 outline-offset-1'>
  //                     Negeri
  //                   </th>
  //                   <th className='px-2 py-1 outline outline-1 outline-offset-1'>
  //                     Kod Fasiliti PIK
  //                   </th>
  //                   <th className='px-2 py-1 outline outline-1 outline-offset-1'>
  //                     Kod Fasiliti GiRet
  //                   </th>
  //                 </>
  //               )}
  //               {toggle === 'kkiakd' && (
  //                 <>
  //                   <th className='px-2 py-1 outline outline-1 outline-offset-1'>
  //                     Nama Hospital
  //                   </th>
  //                   <th className='px-2 py-1 outline outline-1 outline-offset-1'>
  //                     Daerah
  //                   </th>
  //                   <th className='px-2 py-1 outline outline-1 outline-offset-1'>
  //                     Negeri
  //                   </th>
  //                   <th className='px-2 py-1 outline outline-1 outline-offset-1'>
  //                     Kod Fasiliti
  //                   </th>
  //                   <th className='px-2 py-1 outline outline-1 outline-offset-1'>
  //                     Jenis Fasiliti
  //                   </th>
  //                 </>
  //               )}
  //               <th className='px-2 py-1 outline outline-1 outline-offset-1'>
  //                 Urus
  //               </th>
  //             </tr>
  //           </thead>
  //           <tbody className='bg-white'>
  //             {data.items
  //               .filter((item) => {
  //                 if (philter === '') {
  //                   return item;
  //                 } else if (item.nama.toLowerCase().includes(philter)) {
  //                   return item;
  //                 }
  //               })
  //               .map((o, index) => (
  //                 <tr
  //                   key={
  //                     page === 1 ? index + 1 : (page - 1) * 1000 + (index + 1)
  //                   }
  //                 >
  //                   <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
  //                     {page === 1 ? index + 1 : (page - 1) * 1000 + (index + 1)}
  //                   </td>
  //                   <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
  //                     {o.nama}
  //                   </td>
  //                   {toggle === 'pegawai' && (
  //                     <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
  //                       {o.mdcNumber}
  //                     </td>
  //                   )}
  //                   {toggle === 'juruterapi' && (
  //                     <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
  //                       {o.mdtbNumber}
  //                     </td>
  //                   )}
  //                   {toggle === 'fasiliti' && (
  //                     <>
  //                       <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
  //                         {o.daerah}
  //                       </td>
  //                       <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
  //                         {o.negeri}
  //                       </td>
  //                       <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
  //                         {o.kodFasiliti}
  //                       </td>
  //                       <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
  //                         {o.kodFasilitiGiret}
  //                       </td>
  //                     </>
  //                   )}
  //                   {toggle === 'kkiakd' && (
  //                     <>
  //                       <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
  //                         {o.namaHospital}
  //                       </td>
  //                       <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
  //                         {o.daerah}
  //                       </td>
  //                       <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
  //                         {o.negeri}
  //                       </td>
  //                       <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
  //                         {o.kodFasiliti}
  //                       </td>
  //                       <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
  //                         {o.jenisFasiliti}
  //                       </td>
  //                     </>
  //                   )}
  //                   <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
  //                     <button
  //                       className='bg-green-400 relative top-0 right-0 p-1 w-20 rounded-md text-white shadow-xl m-2'
  //                       onClick={() => {
  //                         setOpenEditModal(true);
  //                         setEntity(o);
  //                       }}
  //                     >
  //                       Ubah
  //                     </button>
  //                     <button
  //                       className='bg-green-400 relative top-0 right-0 p-1 w-20 rounded-md text-white shadow-xl m-2'
  //                       onClick={() => {
  //                         setOpenDeleteModal(true);
  //                         setEntity(o);
  //                       }}
  //                     >
  //                       Hapus
  //                     </button>
  //                   </td>
  //                 </tr>
  //               ))}
  //           </tbody>
  //         </table>
  //       </div>
  //       <div className='mx-auto flex justify-center items-center mt-2'>
  //         <div className='grid grid-cols-4 gap-5'>
  //           <button
  //             className={`relative top-0 right-0 p-1 w-20 rounded-md text-white shadow-xl m-2 ${
  //               page === 1 ? 'bg-slate-700 cursor-not-allowed' : 'bg-green-400'
  //             }`}
  //             onClick={() => {
  //               if (page > 1) {
  //                 setPage(1);
  //               }
  //             }}
  //           >
  //             {'<<'}
  //           </button>
  //           <button
  //             className={`relative top-0 right-0 p-1 w-20 rounded-md text-white shadow-xl m-2 ${
  //               page === 1 ? 'bg-slate-700 cursor-not-allowed' : 'bg-green-400'
  //             }`}
  //             onClick={() => {
  //               if (page > 1) {
  //                 setPage(page - 1);
  //               }
  //             }}
  //           >
  //             Previous
  //           </button>
  //           <button
  //             className={`relative top-0 right-0 p-1 w-20 rounded-md text-white shadow-xl m-2 ${
  //               page === data.pages
  //                 ? 'bg-slate-700 cursor-not-allowed'
  //                 : 'bg-green-400'
  //             }`}
  //             onClick={() => {
  //               if (page < data.pages) {
  //                 setPage(page + 1);
  //               }
  //             }}
  //           >
  //             Next
  //           </button>
  //           <button
  //             className={`relative top-0 right-0 p-1 w-20 rounded-md text-white shadow-xl m-2 ${
  //               page === data.pages
  //                 ? 'bg-slate-700 cursor-not-allowed'
  //                 : 'bg-green-400'
  //             }`}
  //             onClick={() => setPage(data.pages)}
  //           >
  //             {'>>'}
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //     {openAddModal ? <AddModal key={toggle} {...props} /> : null}
  //     {openEditModal ? <EditModal key={toggle} {...props} /> : null}
  //     {openDeleteModal ? <DeleteModal key={toggle} {...props} /> : null}
  //     {addExcel ? <AddExcel key={toggle} {...props} /> : null}
  //     {addJson ? <AddJson key={toggle} {...props} /> : null}
  //   </>
  // );

  return (
    <>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <h1 className='text-base font-semibold leading-6 text-gray-900 uppercase'>
              {toggle}
            </h1>
          </div>
          <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
            <button
              type='button'
              onClick={() => setOpenAddModal(true)}
              className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Daftar {toggle} Baru
            </button>
          </div>
        </div>
        <div className='mt-8 flow-root'>
          <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
              <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-300'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                      >
                        Bil.
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        {toggle !== 'fasiliti' ? 'Nama' : 'Nama Fasiliti'}
                      </th>
                      {toggle === 'pegawai' && (
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Nombor MDC
                        </th>
                      )}
                      {toggle === 'juruterapi' && (
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Nombor MDTB
                        </th>
                      )}
                      {toggle === 'fasiliti' && (
                        <>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Daerah
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Negeri
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Kod Fasiliti PIK
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Kod Fasiliti GiRet
                          </th>
                        </>
                      )}
                      {toggle === 'kkiakd' && (
                        <>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Nama Hospital
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Daerah
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Negeri
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Kod Fasiliti
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Jenis Fasiliti
                          </th>
                        </>
                      )}
                      <th
                        scope='col'
                        className='relative py-3.5 pl-3 pr-4 sm:pr-6'
                      >
                        <span className='sr-only'>Kemaskini</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 bg-white'>
                    {data.items
                      .filter((item) => {
                        if (philter === '') {
                          return item;
                        } else if (item.nama.toLowerCase().includes(philter)) {
                          return item;
                        }
                      })
                      .map((o, index) => (
                        <tr key={index}>
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                            {page === 1
                              ? index + 1
                              : (page - 1) * 1000 + (index + 1)}
                          </td>
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                            {o.nama}
                          </td>
                          {toggle === 'pegawai' && (
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              {o.mdcNumber}
                            </td>
                          )}
                          {toggle === 'juruterapi' && (
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              {o.mdtbNumber}
                            </td>
                          )}
                          {toggle === 'fasiliti' && (
                            <>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {o.daerah}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {o.negeri}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {o.kodFasiliti}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {o.kodFasilitiGiret}
                              </td>
                            </>
                          )}
                          {toggle === 'kkiakd' && (
                            <>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {o.namaHospital}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {o.daerah}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {o.negeri}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {o.kodFasiliti}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {o.jenisFasiliti}
                              </td>
                            </>
                          )}
                          <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                            <button
                              className='text-indigo-600 hover:text-indigo-900'
                              onClick={() => {
                                setEntity(o);
                                setOpenEditModal(true);
                              }}
                            >
                              Kemaskini
                              <span className='sr-only'>, {o.nama}</span>
                            </button>
                          </td>
                          <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                            <button
                              className='text-indigo-600 hover:text-indigo-900'
                              onClick={() => {
                                setEntity(o);
                                setOpenDeleteModal(true);
                              }}
                            >
                              Hapus
                              <span className='sr-only'>, {o.nama}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {data.length > 0 && (
          <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
            <div className='flex flex-1 justify-between sm:hidden'>
              <button
                className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                onClick={() => {
                  if (page > 1) {
                    setPage(1);
                  }
                }}
              >
                {'<<'}
              </button>
              <button
                className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
              >
                Previous
              </button>
              <button
                className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                onClick={() => {
                  if (page < data.pages) {
                    setPage(page + 1);
                  }
                }}
              >
                Next
              </button>
              <button
                className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                onClick={() => setPage(data.pages)}
              >
                {'<<'}
              </button>
            </div>
            <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
              <div>
                <p className='text-sm text-gray-700'>
                  Showing <span className='font-medium'>1</span> to{' '}
                  <span className='font-medium'>10</span> of{' '}
                  <span className='font-medium'>97</span> results
                </p>
              </div>
              <div>
                <nav
                  className='isolate inline-flex -space-x-px rounded-md shadow-sm'
                  aria-label='Pagination'
                >
                  <a
                    href='#'
                    className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  >
                    <span className='sr-only'>Previous</span>
                    <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                  </a>
                  {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                  <a
                    href='#'
                    aria-current='page'
                    className='relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    1
                  </a>
                  <a
                    href='#'
                    className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  >
                    2
                  </a>
                  <a
                    href='#'
                    className='relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex'
                  >
                    3
                  </a>
                  <span className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'>
                    ...
                  </span>
                  <a
                    href='#'
                    className='relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex'
                  >
                    8
                  </a>
                  <a
                    href='#'
                    className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  >
                    9
                  </a>
                  <a
                    href='#'
                    className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  >
                    10
                  </a>
                  <a
                    href='#'
                    className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  >
                    <span className='sr-only'>Next</span>
                    <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
      {openAddModal ? <AddModal key={toggle} {...props} /> : null}
      {openEditModal ? <EditModal key={toggle} {...props} /> : null}
      {openDeleteModal ? <DeleteModal key={toggle} {...props} /> : null}
    </>
  );
}
