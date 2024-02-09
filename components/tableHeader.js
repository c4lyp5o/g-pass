function PegawaiHeader() {
  return (
    <th scope='col' className='text-left text-sm font-semibold text-gray-900'>
      Nombor MDC
    </th>
  );
}

function JuruterapiHeader() {
  return (
    <th scope='col' className='text-left text-sm font-semibold text-gray-900'>
      Nombor MDTB
    </th>
  );
}

function FasilitiHeader() {
  return (
    <>
      <th scope='col' className='text-left text-sm font-semibold text-gray-900'>
        Negeri
      </th>
      <th scope='col' className='text-left text-sm font-semibold text-gray-900'>
        Daerah
      </th>
      <th scope='col' className='text-left text-sm font-semibold text-gray-900'>
        Kod Fasiliti PIK
      </th>
      <th scope='col' className='text-left text-sm font-semibold text-gray-900'>
        Kod Fasiliti GiRet
      </th>
    </>
  );
}

function KkiakdHeader() {
  return (
    <>
      <th scope='col' className='text-left text-sm font-semibold text-gray-900'>
        Nama Hospital
      </th>
      <th scope='col' className='text-left text-sm font-semibold text-gray-900'>
        Negeri
      </th>
      <th scope='col' className='text-left text-sm font-semibold text-gray-900'>
        Daerah
      </th>
      <th scope='col' className='text-left text-sm font-semibold text-gray-900'>
        Kod Fasiliti
      </th>
      <th scope='col' className='text-left text-sm font-semibold text-gray-900'>
        Jenis Fasiliti
      </th>
    </>
  );
}

export default function TableHeader({ toggle }) {
  return (
    <thead className='bg-gray-50'>
      <tr>
        <th
          scope='col'
          className='text-left text-sm font-semibold text-gray-900 sm:pl-6 py-2'
        >
          Bil.
        </th>
        <th
          scope='col'
          className='text-left text-sm font-semibold text-gray-900'
        >
          {toggle !== 'fasiliti' ? 'Nama' : 'Nama Fasiliti'}
        </th>
        {toggle === 'pegawai' && <PegawaiHeader />}
        {toggle === 'juruterapi' && <JuruterapiHeader />}
        {toggle === 'fasiliti' && <FasilitiHeader />}
        {toggle === 'kkiakd' && <KkiakdHeader />}
        <th scope='col' className='relative py-1 sm:pr-6'>
          <span className='sr-only'>Kemaskini</span>
        </th>
        <th scope='col' className='relative py-1 sm:pr-6'>
          <span className='sr-only'>Hapus</span>
        </th>
      </tr>
    </thead>
  );
}
