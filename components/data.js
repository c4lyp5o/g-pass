import { useState, useEffect } from 'react';
import useSWR from 'swr';

import AddModal from './add';
import EditModal from './edit';
import DeleteModal from './delete';

import AddExcel from './excel';
import AddJson from './json';

import Loading from './loading';

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  console.log(json);
  return json;
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
  const { data, mutate, error } = useSWR(
    `/api/gpass?type=${toggle}&page=${page}`,
    fetcher
  );

  const props = {
    mutate,
    entity,
    setEntity,
    toggle,
    setOpenAddModal,
    setOpenEditModal,
    setOpenDeleteModal,
    setAddExcel,
    setAddJson,
  };

  useEffect(() => {
    setPage(1);
  }, [toggle]);

  if (!data) return <Loading />;
  if (error) return <div>Error...</div>;

  return (
    <>
      <div className='mx-auto flex justify-center items-center mt-2'>
        <div className='grid grid-rows-2 gap-2'>
          <div>
            <input
              type='search'
              className='outline outline-1 outline-green-600 rounded-md shadow-md w-96 p-2'
              id='search'
              placeholder={
                toggle !== 'fasiliti' ? 'Cari pegawai...' : 'Cari fasiliti...'
              }
              onChange={(e) => setPhilter(e.target.value.toLowerCase())}
            />
          </div>
          <div className='flex justify-center'>
            <button
              className='bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-2'
              onClick={(e) => setAddExcel(true)}
            >
              Tambah Dengan Excel
            </button>
            <button
              className='bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded'
              onClick={(e) => setAddJson(true)}
            >
              Tambah Dengan JSON
            </button>
          </div>
        </div>
      </div>
      <button
        type='button'
        className='px-6 py-2.5 m-2 bg-green-600 hover:bg-green-400 font-medium text-xs uppercase rounded-md shadow-md transition-all'
        onClick={(e) => setOpenAddModal(true)}
      >
        Daftar {toggle} Baru
      </button>
      <div className='items-center justify-center'>
        <div className='m-auto overflow-x-auto text-xs rounded-md h-min max-w-max p-2'>
          <table className='table-auto'>
            <thead className='bg-green-600'>
              <tr>
                <th className='px-2 py-1 outline outline-1 outline-offset-1'>
                  Bil.
                </th>
                <th className='px-2 py-1 outline outline-1 outline-offset-1'>
                  {toggle !== 'fasiliti' ? 'Nama' : 'Nama Fasiliti'}
                </th>
                {toggle === 'pegawai' && (
                  <th className='px-2 py-1 outline outline-1 outline-offset-1'>
                    Nombor MDC
                  </th>
                )}
                {toggle === 'juruterapi' && (
                  <th className='px-2 py-1 outline outline-1 outline-offset-1'>
                    Nombor MDTB
                  </th>
                )}
                {toggle === 'fasiliti' && (
                  <>
                    <th className='px-2 py-1 outline outline-1 outline-offset-1'>
                      Daerah
                    </th>
                    <th className='px-2 py-1 outline outline-1 outline-offset-1'>
                      Negeri
                    </th>
                    <th className='px-2 py-1 outline outline-1 outline-offset-1'>
                      Kod Fasiliti PIK
                    </th>
                    <th className='px-2 py-1 outline outline-1 outline-offset-1'>
                      Kod Fasiliti GiRet
                    </th>
                  </>
                )}
                <th className='px-2 py-1 outline outline-1 outline-offset-1'>
                  Urus
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {data.items
                .filter((item) => {
                  if (philter === '') {
                    return item;
                  } else if (item.nama.toLowerCase().includes(philter)) {
                    return item;
                  }
                })
                .map((o, index) => (
                  <tr
                    key={
                      page === 1 ? index + 1 : (page - 1) * 1000 + (index + 1)
                    }
                  >
                    <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
                      {page === 1 ? index + 1 : (page - 1) * 1000 + (index + 1)}
                    </td>
                    <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
                      {o.nama}
                    </td>
                    {toggle === 'pegawai' && (
                      <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
                        {o.mdcNumber}
                      </td>
                    )}
                    {toggle === 'juruterapi' && (
                      <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
                        {o.mdtbNumber}
                      </td>
                    )}
                    {toggle === 'fasiliti' && (
                      <>
                        <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
                          {o.daerah}
                        </td>
                        <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
                          {o.negeri}
                        </td>
                        <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
                          {o.kodFasiliti}
                        </td>
                        <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
                          {o.kodFasilitiGiret}
                        </td>
                      </>
                    )}
                    <td className='px-2 py-1 outline outline-1 outline-yellow-300 outline-offset-1'>
                      <button
                        className='bg-green-400 relative top-0 right-0 p-1 w-20 rounded-md text-white shadow-xl m-2'
                        onClick={() => {
                          setOpenEditModal(true);
                          setEntity(o);
                        }}
                      >
                        Ubah
                      </button>
                      <button
                        className='bg-green-400 relative top-0 right-0 p-1 w-20 rounded-md text-white shadow-xl m-2'
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setEntity(o);
                        }}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className='mx-auto flex justify-center items-center mt-2'>
          <div className='grid grid-cols-2 gap-5'>
            <button
              className={`relative top-0 right-0 p-1 w-20 rounded-md text-white shadow-xl m-2 ${
                page === 1 ? 'bg-slate-700 cursor-not-allowed' : 'bg-green-400'
              }`}
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              Previous
            </button>
            <button
              className={`relative top-0 right-0 p-1 w-20 rounded-md text-white shadow-xl m-2 ${
                page === data.pages
                  ? 'bg-slate-700 cursor-not-allowed'
                  : 'bg-green-400'
              }`}
              onClick={() => {
                if (page < data.pages) {
                  setPage(page + 1);
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {openAddModal ? <AddModal {...props} /> : null}
      {openEditModal ? (
        <EditModal
          toggle={toggle}
          setOpenEditModal={setOpenEditModal}
          entity={entity}
          mutate={mutate}
        />
      ) : null}
      {openDeleteModal ? (
        <DeleteModal
          toggle={toggle}
          setOpenDeleteModal={setOpenDeleteModal}
          entity={entity}
          mutate={mutate}
        />
      ) : null}
      {addExcel ? <AddExcel {...props} /> : null}
      {addJson ? <AddJson {...props} /> : null}
    </>
  );
}
