function PegawaiInput(props) {
  return (
    <>
      <label
        htmlFor='nama'
        className='block text-sm font-medium leading-6 text-gray-900 flex flex-col space-y-1'
      >
        <span>
          Nama Pegawai
          <span className='font-semibold text-lg text-red-500'>*</span>
        </span>
        <input
          id='nama'
          name='nama'
          type='nama'
          value={props.slate.nama}
          required
          className='px-2 py-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          onChange={(e) =>
            props.setSlate({ ...props.slate, nama: e.target.value })
          }
        />
      </label>
      <label
        htmlFor='mdcNumber'
        className='block text-sm font-medium leading-6 text-gray-900 flex flex-col space-y-1'
      >
        <span>
          Nombor MDC
          <span className='font-semibold text-lg text-red-500'>*</span>
        </span>
        <input
          id='mdcNumber'
          name='mdcNumber'
          type='mdcNumber'
          value={props.slate.mdcNumber}
          required
          className='px-2 py-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          onChange={(e) =>
            props.setSlate({
              ...props.slate,
              mdcNumber: e.target.value,
            })
          }
        />
      </label>
    </>
  );
}

function JuruterapiInput(props) {
  return (
    <>
      <label
        htmlFor='nama'
        className='block text-sm font-medium leading-6 text-gray-900 flex flex-col space-y-1'
      >
        <span>
          Nama Juruterapi
          <span className='font-semibold text-lg text-red-500'>*</span>
        </span>
        <input
          id='nama'
          name='nama'
          type='nama'
          value={props.slate.nama}
          required
          className='px-2 py-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          onChange={(e) =>
            props.setSlate({ ...props.slate, nama: e.target.value })
          }
        />
      </label>
      <label
        htmlFor='mdtbNumber'
        className='block text-sm font-medium leading-6 text-gray-900 flex flex-col space-y-1'
      >
        <span>
          Nombor MDTB
          <span className='font-semibold text-lg text-red-500'>*</span>
        </span>
        <input
          id='mdtbNumber'
          name='mdtbNumber'
          type='mdtbNumber'
          value={props.slate.mdtbNumber}
          required
          className='px-2 py-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          onChange={(e) =>
            props.setSlate({
              ...props.slate,
              mdtbNumber: e.target.value,
            })
          }
        />
      </label>
    </>
  );
}

export function Human(props) {
  return (
    <>
      {props.toggle === 'pegawai' && <PegawaiInput {...props} />}
      {props.toggle === 'juruterapi' && <JuruterapiInput {...props} />}
    </>
  );
}

function CommonInput(props) {
  return (
    <>
      <label
        htmlFor='nama'
        className='block text-sm font-medium leading-6 text-gray-900 flex flex-col space-y-1'
      >
        <span className='capitalize'>
          Nama {props.toggle === 'kkiakd' ? 'KKIA / KD' : props.toggle}
          <span className='font-semibold text-lg text-red-500'>*</span>
        </span>
        <input
          id='nama'
          name='nama'
          type='nama'
          value={props.slate.nama}
          required
          className='px-2 py-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          onChange={(e) =>
            props.setSlate({ ...props.slate, nama: e.target.value })
          }
        />
      </label>
      <label
        htmlFor='negeri'
        className='block text-sm font-medium leading-6 text-gray-900 flex flex-col space-y-1'
      >
        <span>
          Negeri<span className='font-semibold text-lg text-red-500'>*</span>
        </span>
        <input
          id='negeri'
          name='negeri'
          type='negeri'
          value={props.slate.negeri}
          required
          className='px-2 py-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          onChange={(e) =>
            props.setSlate({ ...props.slate, negeri: e.target.value })
          }
        />
      </label>
      <label
        htmlFor='daerah'
        className='block text-sm font-medium leading-6 text-gray-900 flex flex-col space-y-1'
      >
        <span>
          Daerah<span className='font-semibold text-lg text-red-500'>*</span>
        </span>
        <input
          id='daerah'
          name='daerah'
          type='daerah'
          value={props.slate.daerah}
          required
          className='px-2 py-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          onChange={(e) =>
            props.setSlate({ ...props.slate, daerah: e.target.value })
          }
        />
      </label>
    </>
  );
}

function FasilitiInput(props) {
  return (
    <>
      <CommonInput {...props} />
      <label
        htmlFor='kodFasilitiGiret'
        className='block text-sm font-medium leading-6 text-gray-900 flex flex-col space-y-1'
      >
        <span>
          Kod Fasiliti Gi-RET
          <span className='font-semibold text-lg text-red-500'>*</span>
        </span>
        <input
          id='kodFasilitiGiret'
          name='kodFasilitiGiret'
          type='kodFasilitiGiret'
          value={props.slate.kodFasilitiGiret}
          required
          className='px-2 py-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          onChange={(e) =>
            props.setSlate({
              ...props.slate,
              kodFasilitiGiret: e.target.value,
            })
          }
        />
      </label>
    </>
  );
}

function KkiakdInput(props) {
  return (
    <>
      <CommonInput {...props} />
      <label
        htmlFor='namaHospital'
        className='block text-sm font-medium leading-6 text-gray-900 flex flex-col space-y-1'
      >
        <span>
          Nama Hospital KKIA / KD
          <span className='font-semibold text-lg text-red-500'>*</span>
        </span>
        <input
          id='namaHospital'
          name='namaHospital'
          type='namaHospital'
          value={props.slate.namaHospital}
          required
          className='px-2 py-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          onChange={(e) =>
            props.setSlate({
              ...props.slate,
              namaHospital: e.target.value,
            })
          }
        />
      </label>
      <label
        htmlFor='kodFasiliti'
        className='block text-sm font-medium leading-6 text-gray-900 flex flex-col space-y-1'
      >
        <span>
          Kod Fasiliti KKIA
          <span className='font-semibold text-lg text-red-500'>*</span>
        </span>
        <input
          id='kodFasiliti'
          name='kodFasiliti'
          type='kodFasiliti'
          value={props.slate.kodFasiliti}
          required
          className='px-2 py-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          onChange={(e) =>
            props.setSlate({
              ...props.slate,
              kodFasiliti: e.target.value,
            })
          }
        />
      </label>
      <label
        htmlFor='jenisFasiliti'
        className='block text-sm font-medium leading-6 text-gray-900 flex flex-col space-y-1'
      >
        <span>
          Jenis Fasiliti
          <span className='font-semibold text-lg text-red-500'>*</span>
        </span>
        <input
          id='jenisFasiliti'
          name='jenisFasiliti'
          type='jenisFasiliti'
          value={props.slate.jenisFasiliti}
          required
          className='px-2 py-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          onChange={(e) =>
            props.setSlate({
              ...props.slate,
              jenisFasiliti: e.target.value,
            })
          }
        />
      </label>
    </>
  );
}

export function NonHuman(props) {
  return (
    <>
      {props.toggle === 'kkiakd' && <KkiakdInput {...props} />}
      {props.toggle === 'fasiliti' && <FasilitiInput {...props} />}
    </>
  );
}
