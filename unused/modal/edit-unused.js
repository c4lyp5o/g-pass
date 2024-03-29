import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { RiCloseLine } from 'react-icons/ri';

import Loading from './loading';

import styles from '../styles/Modal.module.css';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Modal = ({ toggle, setOpenEditModal, entity, mutate }) => {
  const { data, error } = useSWR(
    `/gpass/api/gpass?type=individu&id=${entity.bil}`,
    fetcher
  );
  const [nama, setNama] = useState('');
  const [mdcNumber, setMdcNumber] = useState('');
  const [mdtbNumber, setMdtbNumber] = useState('');
  const [gred, setGred] = useState('');
  const [addingData, setAddingData] = useState('');

  useEffect(() => {
    if (data) {
      console.log(data);
      setNama(data.nama);
      setGred(data.gred);
      setMdcNumber(data.mdcNumber);
    }
  }, [data]);

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
        mdcNumber: mdcNumber,
      };
    }
    if (toggle === 'juruterapi') {
      Data = {
        ...Data,
        mdtbNumber: mdtbNumber,
      };
    }
    console.log(Data);
    try {
      const res = await axios.post('/gpass/api/gpass', {
        query: 'update',
        updateNama: Data.nama,
        updateGred: Data.gred,
        updateMdcNumber: Data.mdcNumber,
        forUpdating: data.bil,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setAddingData(false);
    setOpenEditModal(false);
    mutate();
  };

  function BusyButton() {
    return (
      <>
        <button
          type='button'
          className='inline-flex items-center text-center justify-center px-4 py-2 bg-admin3 text-adminWhite rounded-md shadow-xl p-2 hover:bg-admin1 transition-all ease-in-out duration-150 cursor-not-allowed'
          disabled=''
        >
          <svg
            className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
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

  if (!data) return <Loading />;
  if (error) return <div>failed to load</div>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className={styles.darkBG}
          onClick={() => setOpenEditModal(false)}
        />
        <div className={styles.centered}>
          <div className={styles.modalAdd}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>Ubah {toggle}</h5>
            </div>
            <span
              className={styles.closeBtn}
              onClick={() => setOpenEditModal(false)}
            >
              <RiCloseLine style={{ marginBottom: '-3px' }} />
            </span>
            <div className={styles.modalContent}>
              <div className='admin-pegawai-handler-container'>
                <div className='admin-pegawai-handler-input'>
                  <p>
                    Nama {toggle}{' '}
                    <span className='font-semibold text-lg text-user6'>*</span>
                  </p>
                  <div className='grid gap-1'>
                    <input
                      required
                      className='border-2'
                      value={nama}
                      type='text'
                      key='nama'
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </div>
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
                          value={mdcNumber}
                          type='text'
                          key='mdcNumber'
                          onChange={(e) => setMdcNumber(e.target.value)}
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
                          value={mdtbNumber}
                          type='text'
                          key='mdtbNumber'
                          onChange={(e) => setMdtbNumber(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <div className='grid gap-1'>
                    <p>
                      Gred{' '}
                      <span className='font-semibold text-lg text-user6'>
                        *
                      </span>
                    </p>
                    <select
                      required
                      className='border-2'
                      value={gred}
                      onChange={(e) => setGred(e.target.value)}
                    >
                      {toggle === 'pegawai' ? (
                        <>
                          <option value=''>Pilih Gred</option>
                          <option value='jusa'>JUSA</option>
                          <option value='ug56'>UG56</option>
                          <option value='ug54'>UG54</option>
                          <option value='ug52'>UG52</option>
                          <option value='ug48'>UG48</option>
                          <option value='ug44'>UG44</option>
                          <option value='ug41'>UG41</option>
                        </>
                      ) : (
                        <>
                          <option value=''>Pilih Gred</option>
                          <option value='u40'>U40</option>
                          <option value='u38'>U38</option>
                          <option value='u36'>U36</option>
                          <option value='u32'>U32</option>
                          <option value='u29'>U29</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                {addingData ? <BusyButton /> : <SubmitButtton />}
                <span
                  className={styles.cancelBtn}
                  onClick={() => setOpenEditModal(false)}
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
};

export default Modal;
