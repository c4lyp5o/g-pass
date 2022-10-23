import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Data({ toggle }) {
  const { data, error } = useSWR(`/api/${toggle}`, fetcher);
  const [philter, setPhilter] = useState('');

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <p className='font-semibold text-user6 mt-2 ml-3 lg:mr-auto'>
          Status Pegawai: {toggle}
        </p>
        <p className='font-semibold text-user6 lg:mt-2 mr-3 lg:ml-auto'>
          Tarikh: {new Date().toLocaleDateString()}
        </p>
      </div>
      <div className='flex justify-center'>
        <div className='mb-3 xl:w-96'>
          <input
            type='search'
            className='outline outline-1 outline-userBlack rounded-md p-3'
            id='carianPesakit'
            placeholder='Cari pesakit...'
            onChange={(e) => setPhilter(e.target.value.toLowerCase())}
          />
        </div>
      </div>
      <button
        type='button'
        className='px-6 py-2.5 m-1 w-52 bg-kaunter3 font-medium text-xs uppercase rounded-md shadow-md transition-all'
        onClick={(e) => setShowForm(true)}
      >
        Daftar {toggle} Baru
      </button>
      <div className='flex justify-center'>
        <div className='m-auto overflow-x-auto text-sm rounded-md h-min max-w-max'>
          <table className='table-auto'>
            <thead className='text-adminWhite bg-admin3'>
              <tr>
                <th className='px-2 py-1 outline outline-1 outline-offset-1'>
                  Bil.
                </th>
                <th className='px-2 py-1 outline outline-1 outline-offset-1'>
                  Nama
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
                <th className='px-2 py-1 outline outline-1 outline-offset-1'>
                  Gred
                </th>
                <th className='px-2 py-1 outline outline-1 outline-offset-1'>
                  Urus
                </th>
              </tr>
            </thead>
            <tbody className='bg-admin4'>
              {data
                .filter((item) => {
                  if (philter === '') {
                    return item;
                  } else if (item.nama.toLowerCase().includes(philter)) {
                    return item;
                  }
                })
                .map((o, index) => (
                  <tr key={index + 1}>
                    <td className='px-2 py-1 outline outline-1 outline-adminWhite outline-offset-1'>
                      {index + 1}
                    </td>
                    <td className='px-2 py-1 outline outline-1 outline-adminWhite outline-offset-1'>
                      {o.nama}
                    </td>
                    {toggle === 'pegawai' && (
                      <td className='px-2 py-1 outline outline-1 outline-adminWhite outline-offset-1'>
                        {o.mdcNumber}
                      </td>
                    )}
                    {toggle === 'juruterapi' && (
                      <td className='px-2 py-1 outline outline-1 outline-adminWhite outline-offset-1'>
                        {o.mdtbNumber}
                      </td>
                    )}
                    <td className='px-2 py-1 outline outline-1 outline-adminWhite outline-offset-1 uppercase'>
                      {o.gred}
                    </td>
                    <td className='px-2 py-1 outline outline-1 outline-adminWhite outline-offset-1'>
                      <button
                        className='bg-admin3 relative top-0 right-0 p-1 w-20 rounded-md text-white shadow-xl m-2'
                        onClick={() => {
                          setShowEditModal(true);
                          setId(o._id);
                        }}
                      >
                        Ubah
                      </button>
                      <button
                        className='bg-admin3 relative top-0 right-0 p-1 w-20 rounded-md text-white shadow-xl m-2'
                        id={o._id}
                        onClick={(e) => {
                          setShowDeleteModal(true);
                          setId(o._id);
                          setDeleteCandidate(o.nama);
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
      </div>
    </>
  );
}
