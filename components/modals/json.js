import { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import axios from 'axios';

import { BusyButton, SubmitButton } from '../buttons';
import styles from '../../styles/Modal.module.css';
import { toast } from 'react-toastify';

const AddJson = ({ toggle, setAddJson }) => {
  const [addingData, setAddingData] = useState(false);
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState(0);
  const [addMode, setAddMode] = useState(false);

  const noWayBack = () => {
    if (addingData) {
      toast('No going back now!');
      return;
    } else {
      setAddJson(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddingData(true);
    if (e.target.jsonFile.value === '') {
      toast.error('Sila pilih fail');
      return;
    }
    if (e.target.jsonFile.files[0].type !== 'application/json') {
      toast.error('Fail bukan JSON');
      return;
    }
    const jsonFile = e.target.jsonFile.files[0];
    const formData = new FormData();
    formData.append('jsonFile', jsonFile);
    formData.append('toggle', toggle);
    formData.append('addmode', addMode);
    try {
      const res = await axios.post('/gpass/api/processjson', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setCount(parseInt(res.data.added));
      setSuccess(true);
      toast.success('Data berjaya ditambah');
    } catch (error) {
      console.error(error);
      toast.error(`Data gagal ditambah kerana ${error.response.data.msg}`);
    }
    setAddingData(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.darkBG} onClick={noWayBack} />
        <div className={styles.centered}>
          <div className={styles.modalAdd}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>TAMBAH DATA MENGGUNAKAN JSON</h5>
            </div>
            <button className={styles.closeBtn} onClick={noWayBack}>
              <RiCloseLine style={{ marginBottom: '-3px' }} />
            </button>
            <div className={styles.modalContent}>
              <div className='mx-auto w-1/2 h-1/2 justify-center items-center mt-2'>
                <input
                  className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                  type='file'
                  id='jsonFile'
                />
                <p className='text-gray-500 text-xs italic mt-5'>
                  {addingData ? 'Sabar...' : ''}
                </p>
                <p className='text-red-500 text-xs italic mt-5'>
                  {addingData ? 'Memproses...' : 'Pilih File JSON'}
                </p>
                <input
                  type='checkbox'
                  id='addmode'
                  className='form-checkbox h-5 w-5 text-green-600'
                  name='addmode'
                  value={true}
                  onChange={(e) => {
                    setAddMode(e.target.checked);
                  }}
                />
                <label htmlFor='toggle' className='ml-2'>
                  Tambah data tanpa menghapuskan data lama
                </label>
                {success && (
                  <p className='text-green-500 text-xs italic mt-5'>
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
                  onClick={noWayBack}
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

export default AddJson;
