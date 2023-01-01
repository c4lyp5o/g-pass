export function Human(props) {
  return (
    <div className='admin-pegawai-handler-container'>
      <div className='admin-pegawai-handler-input'>
        <p>
          Nama {props.toggle}{' '}
          <span className='font-semibold text-lg text-user6'>*</span>
        </p>
        <div className='grid gap-1'>
          <input
            required
            className='border-2'
            value={props.slate.nama}
            type='text'
            key='nama'
            onChange={(e) =>
              props.setSlate({ ...props.slate, nama: e.target.value })
            }
          />
        </div>
        {props.toggle === 'pegawai' ? (
          <>
            <p>
              Nombor MDC{' '}
              <span className='font-semibold text-lg text-user6'>*</span>
            </p>
            <div className='grid gap-1'>
              <input
                required
                className='border-2'
                value={props.slate.mdcNumber}
                type='text'
                key='mdcNumber'
                onChange={(e) =>
                  props.setSlate({ ...props.slate, mdcNumber: e.target.value })
                }
              />
            </div>
          </>
        ) : (
          <>
            <p>
              Nombor MDTB{' '}
              <span className='font-semibold text-lg text-user6'>*</span>
            </p>
            <div className='grid gap-1'>
              <input
                required
                className='border-2'
                value={props.slate.mdtbNumber}
                type='text'
                key='mdtbNumber'
                onChange={(e) =>
                  props.setSlate({ ...props.slate, mdtbNumber: e.target.value })
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function NonHuman(props) {
  return (
    <div className='admin-pegawai-handler-container'>
      <div className='admin-pegawai-handler-input'>
        <p>
          Nama {props.toggle}
          <span className='font-semibold text-lg text-user6'>*</span>
        </p>
        <div className='grid gap-1'>
          <input
            required
            className='border-2'
            value={props.slate.nama}
            type='text'
            key='nama'
            onChange={(e) =>
              props.setSlate({ ...props.slate, nama: e.target.value })
            }
          />
        </div>
        {props.toggle === 'kkiakd' && (
          <>
            <p className='mt-2'>
              Nama Hospital {props.toggle}
              <span className='font-semibold text-lg text-user6'>*</span>
            </p>
            <div className='grid gap-1'>
              <input
                required
                className='border-2'
                value={props.slate.namaHospital}
                type='text'
                key='namaHospital'
                onChange={(e) =>
                  props.setSlate({
                    ...props.slate,
                    namaHospital: e.target.value,
                  })
                }
              />
            </div>
          </>
        )}
        <p className='mt-2'>
          Negeri<span className='font-semibold text-lg text-user6'>*</span>
        </p>
        <div className='grid gap-1'>
          <input
            required
            className='border-2'
            value={props.slate.negeri}
            type='text'
            key='negeri'
            onChange={(e) =>
              props.setSlate({ ...props.slate, negeri: e.target.value })
            }
          />
        </div>
        <p className='mt-2'>
          Daerah<span className='font-semibold text-lg text-user6'>*</span>
        </p>
        <div className='grid gap-1'>
          <input
            required
            className='border-2'
            value={props.slate.daerah}
            type='text'
            key='daerah'
            onChange={(e) =>
              props.setSlate({ ...props.slate, daerah: e.target.value })
            }
          />
        </div>
        {props.toggle === 'fasiliti' && (
          <>
            <p className='mt-2'>
              Kod Fasiliti PIK
              <span className='font-semibold text-lg text-user6'>*</span>
            </p>
            <div className='grid gap-1'>
              <input
                required
                className='border-2'
                value={props.slate.kodFasiliti}
                type='text'
                key='kodfasilitipik'
                onChange={(e) =>
                  props.setSlate({
                    ...props.slate,
                    kodFasiliti: e.target.value,
                  })
                }
              />
            </div>
            <p className='mt-2'>
              Kod Fasiliti GiRet
              <span className='font-semibold text-lg text-user6'>*</span>
            </p>
            <div className='grid gap-1'>
              <input
                required
                className='border-2'
                value={props.slate.kodFasilitiGiret}
                type='text'
                key='kodfasilitigiret'
                onChange={(e) =>
                  props.setSlate({
                    ...props.slate,
                    kodFasilitiGiret: e.target.value,
                  })
                }
              />
            </div>
          </>
        )}
        {props.toggle === 'kkiakd' && (
          <>
            <p className='mt-2'>
              Kod Fasiliti
              <span className='font-semibold text-lg text-user6'>*</span>
            </p>
            <div className='grid gap-1'>
              <input
                required
                className='border-2'
                value={props.slate.kodFasiliti}
                type='text'
                key='kodfasiliti'
                onChange={(e) =>
                  props.setSlate({
                    ...props.slate,
                    kodFasiliti: e.target.value,
                  })
                }
              />
            </div>
            <p className='mt-2'>
              Jenis Fasiliti
              <span className='font-semibold text-lg text-user6'>*</span>
            </p>
            <div className='grid gap-1'>
              <input
                required
                className='border-2'
                value={props.slate.jenisFasiliti}
                type='text'
                key='jenisfasiliti'
                onChange={(e) =>
                  props.setSlate({
                    ...props.slate,
                    jenisFasiliti: e.target.value,
                  })
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
