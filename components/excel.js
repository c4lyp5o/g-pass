import { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import axios from 'axios';

import { BusyButton, SubmitButton } from './buttons';
import styles from '../styles/Modal.module.css';
import { toast } from 'react-toastify';

const AddExcel = ({ toggle, setAddExcel }) => {
  const [addingData, setAddingData] = useState(false);
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddingData(true);
    if (e.target.excelFile.value === '') {
      toast.error('Sila pilih fail');
      return;
    }
    if (
      e.target.excelFile.files[0].type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      e.target.excelFile.files[0].type !== 'application/vnd.ms-excel'
    ) {
      toast.error('Fail bukan xlsx atau xls');
      return;
    }
    const excelFile = e.target.excelFile.files[0];
    const formData = new FormData();
    formData.append('excelFile', excelFile);
    formData.append('toggle', toggle);
    try {
      const response = await toast.promise(
        axios.post('/api/processxlsx', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
        {
          loading: 'Memproses...',
          success: `Berjaya menambah ${response.data.added} data!`,
          error: 'Gagal!',
        }
      );
      setCount(parseInt(response.data.added));
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
    setAddingData(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className={styles.darkBG}
          onClick={() => {
            if (addingData) {
              toast('No going back now!');
              return;
            } else {
              setAddExcel(false);
            }
          }}
        />
        <div className={styles.centered}>
          <div className={styles.modalAdd}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>TAMBAH DATA MENGGUNAKAN XLSX</h5>
            </div>
            <span
              className={styles.closeBtn}
              onClick={() => {
                if (addingData) {
                  toast('No going back now!');
                  return;
                } else {
                  setAddExcel(false);
                }
              }}
            >
              <RiCloseLine style={{ marginBottom: '-3px' }} />
            </span>
            <div className={styles.modalContent}>
              <div className='mx-auto w-1/2 h-1/2 justify-center items-center mt-2'>
                <input
                  className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                  type='file'
                  id='excelFile'
                />
                <button
                  className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded mt-5'
                  disabled={`${addingData ? true : false}`}
                  type='submit'
                >
                  {addingData ? 'Sabar...' : 'Upload'}
                </button>
                <p className='text-red-500 text-xs italic mt-5'>
                  {addingData ? 'Memproses...' : 'Pilih File Excel'}
                </p>
                {success && (
                  <p className='text-green-500 text-xs italic'>
                    {count > 0
                      ? `Sebanyak ${count} data berhasil ditambah`
                      : null}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                {addingData ? <BusyButton /> : <SubmitButton func='add' />}
                <button
                  className='capitalize bg-red-400 rounded-md shadow-xl p-2 hover:bg-red-600 transition-all'
                  onClick={() => {
                    if (addingData) {
                      toast('No going back now!');
                      return;
                    } else {
                      setAddExcel(false);
                    }
                  }}
                >
                  {addingData ? 'Please Wait...' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddExcel;
