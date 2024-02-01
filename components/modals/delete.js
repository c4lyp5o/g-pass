import { useState } from 'react';
import axios from 'axios';
import { RiCloseLine } from 'react-icons/ri';

import { BusyButton, SubmitButton } from './buttons';
import styles from '../styles/Modal.module.css';

const Modal = ({ setOpenDeleteModal, entity, mutate }) => {
  const [deletingData, setDeletingData] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDeletingData(true);
    try {
      const res = await axios.post('/gpass/api/gpass', {
        query: 'delete',
        payload: { statusPegawai: entity.statusPegawai, bil: entity.bil },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setDeletingData(false);
    setOpenDeleteModal(false);
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
          Menghapus Jejakmu...
        </button>
      </>
    );
  }

  function SubmitButton() {
    return (
      <button
        type='submit'
        onClick={handleSubmit}
        className='capitalize bg-admin3 text-adminWhite rounded-md shadow-xl p-2 hover:bg-admin1 transition-all'
      >
        HAPUS
      </button>
    );
  }

  return (
    <>
      <div
        className={styles.darkBG}
        onClick={() => setOpenDeleteModal(false)}
      />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>AWAS!</h5>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setOpenDeleteModal(false)}
          >
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className={styles.modalContent}>
            Anda YAKIN untuk menghapus {entity.nama}?
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              {deletingData ? <BusyButton /> : <SubmitButton />}
              <button
                className={styles.cancelBtn}
                onClick={() => setOpenDeleteModal(false)}
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
