import { useRef, useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { Ring } from 'react-awesome-spinners';
import styles from '../Modal.module.css';

const Modal = ({ toggle }) => {
  const [nama, setNama] = useState('');
  const [mdcNumber, setMdcNumber] = useState('');
  const [mdtbNumber, setMdtbNumber] = useState('');
  const [gred, setGred] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddingData(true);
    let Data = {};
    Data = {
      nama: nama.toLowerCase(),
      gred: gred.toLowerCase(),
    };
    if (toggle === 'pegawai') {
      Data = {
        ...Data,
        mdcNumber: mdcNumber.toLowerCase(),
      };
    }
    if (toggle === 'juruterapi') {
      Data = {
        ...Data,
        mdtbNumber: mdtbNumber.toLowerCase(),
      };
    }
    const res = await fetch('/api/gpass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Data),
    });
    const data = await res.json();
  };

  function BusyButton() {
    return (
      <>
        <button
          type='button'
          class='inline-flex items-center text-center justify-center px-4 py-2 bg-admin3 text-adminWhite rounded-md shadow-xl p-2 hover:bg-admin1 transition-all ease-in-out duration-150 cursor-not-allowed'
          disabled=''
        >
          <svg
            class='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              class='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              stroke-width='4'
            ></circle>
            <path
              class='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          Menambah Data...
        </button>
      </>
    );
  }

  function SubmitButtton() {
    return (
      <button
        type='submit'
        className='capitalize bg-admin3 text-adminWhite rounded-md shadow-xl p-2 hover:bg-admin1 transition-all'
      >
        Tambah Data
      </button>
    );
  }

  function Pegawai() {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div
            className={styles.darkBG}
            onClick={() => setShowAddModal(false)}
          />
          <div className={styles.centered}>
            <div className={styles.modalAdd}>
              <div className={styles.modalHeader}>
                <h5 className={styles.heading}>TAMBAH {toggle}</h5>
              </div>
              <span
                className={styles.closeBtn}
                onClick={() => setShowAddModal(false)}
              >
                <RiCloseLine style={{ marginBottom: '-3px' }} />
              </span>
              <div className={styles.modalContent}>
                <div className='admin-pegawai-handler-container'>
                  <div className='admin-pegawai-handler-input'>
                    <p>
                      Nama {Dictionary[toggle]}{' '}
                      <span className='font-semibold text-lg text-user6'>
                        *
                      </span>
                    </p>
                    {toggle === 'pegawai' ? (
                      <>
                        <p>
                          Nombor MDC{' '}
                          <span className='font-semibold text-lg text-user6'>
                            *
                          </span>
                        </p>
                        <div className='grid gap-1'>
                          <input
                            required
                            className='border-2'
                            type='text'
                            name='mdc'
                            id='mdc'
                            onChange={(e) =>
                              (currentRegNumber.current = e.target.value)
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <p>
                          Nombor MDTB{' '}
                          <span className='font-semibold text-lg text-user6'>
                            *
                          </span>
                        </p>
                        <div className='grid gap-1'>
                          <input
                            required
                            className='border-2'
                            type='text'
                            name='mdc'
                            id='mdc'
                            onChange={(e) =>
                              (currentRegNumber.current = e.target.value)
                            }
                          />
                        </div>
                      </>
                    )}
                    <div className='grid gap-1'>
                      {toggle === 'pegawai' ? (
                        <select
                          required
                          className='border-2'
                          onChange={(e) =>
                            (currentGred.current = e.target.value)
                          }
                        >
                          <option value=''>Pilih Gred</option>
                          <option value='jusa'>JUSA</option>
                          <option value='ug56'>UG56</option>
                          <option value='ug54'>UG54</option>
                          <option value='ug52'>UG52</option>
                          <option value='ug48'>UG48</option>
                          <option value='ug44'>UG44</option>
                          <option value='ug41'>UG41</option>
                        </select>
                      ) : (
                        <>
                          <p>
                            Gred{' '}
                            <span className='font-semibold text-lg text-user6'>
                              *
                            </span>
                          </p>
                          <select
                            required
                            className='border-2'
                            onChange={(e) =>
                              (currentGred.current = e.target.value)
                            }
                          >
                            <option value=''>Pilih Gred</option>
                            <option value='u40'>U40</option>
                            <option value='u38'>U38</option>
                            <option value='u36'>U36</option>
                            <option value='u32'>U32</option>
                            <option value='u29'>U29</option>
                          </select>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                  {addingData ? <BusyButton /> : <SubmitButtton />}
                  <span
                    className={styles.cancelBtn}
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <div className={styles.darkBG} />
        <div className={styles.modalContent}>
          <div className={styles.centered}>
            <div className='flex justify-center text-center h-full w-full'>
              <div className='m-auto p-4 bg-admin4 rounded-md grid'>
                <div className='flex justify-center mb-2'>
                  <Ring color='#c44058' />
                </div>
                <span className='bg-admin3 text-kaunterWhite text-xs font-semibold px-2.5 py-0.5 rounded'>
                  Memuat..
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>{(toggle === 'pegawai' || toggle === 'juruterapi') && <Pegawai />}</>
  );
};

export default Modal;
