function PegawaiRow({ item }) {
  return <td className='text-sm text-gray-500'>{item.mdcNumber}</td>;
}

function JuruterapiRow({ item }) {
  return <td className='text-sm text-gray-500'>{item.mdtbNumber}</td>;
}

function FasilitiRow({ item }) {
  return (
    <>
      <td className='text-sm text-gray-500'>{item.negeri}</td>
      <td className='text-sm text-gray-500'>{item.daerah}</td>
      <td className='whitespace-nowrap text-sm text-gray-500'>
        {item.kodFasiliti}
      </td>
      <td className='text-sm text-gray-500'>{item.kodFasilitiGiret}</td>
    </>
  );
}

function KkiakdRow({ item }) {
  return (
    <>
      <td className='text-sm text-gray-500'>{item.namaHospital}</td>
      <td className='text-sm text-gray-500'>{item.negeri}</td>
      <td className='text-sm text-gray-500'>{item.daerah}</td>
      <td className='whitespace-nowrap text-sm text-gray-500'>
        {item.kodFasiliti}
      </td>
      <td className='text-sm text-gray-500'>{item.jenisFasiliti}</td>
    </>
  );
}

export default function TableBody({
  toggle,
  allItems,
  searchItems,
  usingSearch,
  searchIsRunning,
  page,
  setEntity,
  setOpenEditModal,
  setOpenDeleteModal,
}) {
  const currentItems = usingSearch ? searchItems.items : allItems.items;

  if (searchIsRunning) {
    return (
      <tbody className='divide-y divide-gray-200 bg-white'>
        <tr>
          <td className='text-sm font-medium text-gray-900 sm:pl-6' colSpan='6'>
            Loading
          </td>
        </tr>
      </tbody>
    );
  }

  if (currentItems.length === 0) {
    return (
      <tbody className='divide-y divide-gray-200 bg-white'>
        <tr>
          <td className='text-sm font-medium text-gray-900 sm:pl-6' colSpan='6'>
            No data found
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className='divide-y divide-gray-200 bg-white'>
      {currentItems.map((item, index) => (
        <tr key={index}>
          <td className='text-sm font-medium text-gray-900 sm:pl-6'>
            {page === 1 ? index + 1 : (page - 1) * 1000 + (index + 1)}
          </td>
          <td className='text-sm font-medium text-gray-900'>{item.nama}</td>
          {toggle === 'pegawai' && <PegawaiRow item={item} />}
          {toggle === 'juruterapi' && <JuruterapiRow item={item} />}
          {toggle === 'fasiliti' && <FasilitiRow item={item} />}
          {toggle === 'kkiakd' && <KkiakdRow item={item} />}
          <td className='relative py-1 text-right text-sm font-medium'>
            <button
              className='bg-indigo-600 text-white hover:bg-indigo-900 px-2 py-1 rounded'
              onClick={() => {
                setEntity(item);
                setOpenEditModal(true);
              }}
            >
              Kemaskini
              <span className='sr-only'>, {item.nama}</span>
            </button>
          </td>
          <td className='relative py-1 text-right text-sm font-medium'>
            <button
              className='bg-red-600 text-white hover:bg-red-900 px-2 py-1 rounded'
              onClick={() => {
                setEntity(item);
                setOpenDeleteModal(true);
              }}
            >
              Hapus
              <span className='sr-only'>, {item.nama}</span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
