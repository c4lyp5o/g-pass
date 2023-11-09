export function Human(props) {
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <div className='space-y-6'>
          <div>
            <label
              htmlFor='nama'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Nama {props.toggle}{' '}
            </label>
            <div className='mt-2'>
              <input
                id='nama'
                name='nama'
                type='nama'
                value={props.slate.nama}
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) =>
                  props.setSlate({ ...props.slate, nama: e.target.value })
                }
              />
            </div>
          </div>

          {props.toggle === 'pegawai' ? (
            <div>
              <label
                htmlFor='nama'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Nombor MDC{' '}
                <span className='font-semibold text-lg text-user6'>*</span>
              </label>
              <div className='mt-2'>
                <input
                  id='mdcNumber'
                  name='mdcNumber'
                  type='mdcNumber'
                  value={props.slate.mdcNumber}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={(e) =>
                    props.setSlate({
                      ...props.slate,
                      mdcNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          ) : (
            <div>
              <label
                htmlFor='nama'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Nombor MDTB{' '}
                <span className='font-semibold text-lg text-user6'>*</span>
              </label>
              <div className='mt-2'>
                <input
                  id='mdtbNumber'
                  name='mdtbNumber'
                  type='mdtbNumber'
                  value={props.slate.mdtbNumber}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={(e) =>
                    props.setSlate({
                      ...props.slate,
                      mdtbNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function NonHuman(props) {
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <div className='space-y-6'>
          <div>
            <label
              htmlFor='nama'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Nama {props.toggle}{' '}
            </label>
            <div className='mt-2'>
              <input
                id='nama'
                name='nama'
                type='nama'
                value={props.slate.nama}
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) =>
                  props.setSlate({ ...props.slate, nama: e.target.value })
                }
              />
            </div>
          </div>
          {props.toggle === 'kkiakd' && (
            <div>
              <label
                htmlFor='namaHospital'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Nama Hospital {props.toggle}
              </label>
              <div className='mt-2'>
                <input
                  id='namaHospital'
                  name='namaHospital'
                  type='namaHospital'
                  value={props.slate.namaHospital}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={(e) =>
                    props.setSlate({
                      ...props.slate,
                      namaHospital: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor='negeri'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Negeri<span className='font-semibold text-lg text-user6'>*</span>
            </label>
            <div className='mt-2'>
              <input
                id='negeri'
                name='negeri'
                type='negeri'
                value={props.slate.negeri}
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) =>
                  props.setSlate({ ...props.slate, negeri: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='daerah'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Daerah<span className='font-semibold text-lg text-user6'>*</span>
            </label>
            <div className='mt-2'>
              <input
                id='daerah'
                name='daerah'
                type='daerah'
                value={props.slate.daerah}
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) =>
                  props.setSlate({ ...props.slate, daerah: e.target.value })
                }
              />
            </div>
          </div>
          {props.toggle === 'fasiliti' && (
            <>
              <div>
                <label
                  htmlFor='kodFasiliti'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Kod Fasiliti PIK
                  <span className='font-semibold text-lg text-user6'>*</span>
                </label>
                <div className='mt-2'>
                  <input
                    id='kodFasiliti'
                    name='kodFasiliti'
                    type='kodFasiliti'
                    value={props.slate.kodFasiliti}
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    onChange={(e) =>
                      props.setSlate({
                        ...props.slate,
                        kodFasiliti: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='kodFasilitiGiret'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Kod Fasiliti Gi-Ret
                  <span className='font-semibold text-lg text-user6'>*</span>
                </label>
                <div className='mt-2'>
                  <input
                    id='kodFasilitiGiret'
                    name='kodFasilitiGiret'
                    type='kodFasilitiGiret'
                    value={props.slate.kodFasilitiGiret}
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    onChange={(e) =>
                      props.setSlate({
                        ...props.slate,
                        kodFasilitiGiret: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </>
          )}
          {props.toggle === 'kkiakd' && (
            <>
              <div>
                <label
                  htmlFor='kodFasiliti'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Kod Fasiliti KKIA
                  <span className='font-semibold text-lg text-user6'>*</span>
                </label>
                <div className='mt-2'>
                  <input
                    id='kodFasiliti'
                    name='kodFasiliti'
                    type='kodFasiliti'
                    value={props.slate.kodFasiliti}
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    onChange={(e) =>
                      props.setSlate({
                        ...props.slate,
                        kodFasiliti: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='jenisFasiliti'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Jenis Fasiliti
                  <span className='font-semibold text-lg text-user6'>*</span>
                </label>
                <div className='mt-2'>
                  <input
                    id='jenisFasiliti'
                    name='jenisFasiliti'
                    type='jenisFasiliti'
                    value={props.slate.jenisFasiliti}
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    onChange={(e) =>
                      props.setSlate({
                        ...props.slate,
                        jenisFasiliti: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
