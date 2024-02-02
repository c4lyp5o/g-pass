import { useState } from 'react';
import axios from 'axios';
import { RiCloseLine } from 'react-icons/ri';

import { toast } from 'react-toastify';
import { BusyButton, SubmitButton } from '../buttons';
import styles from '../../styles/Modal.module.css';

const Modal = ({ setOpenDeleteModal, toggle, entity, mutate }) => {
  const [deletingData, setDeletingData] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDeletingData(true);
    try {
      const res = await axios.post('/gpass/api/gpass', {
        query: 'delete',
        payload: { type: toggle, bil: entity.bil },
      });
      toast.success('Data berjaya dihapus');
      console.log(res);
    } catch (err) {
      toast.error('Data gagal dihapus');
      console.log(err);
    }
    setDeletingData(false);
    setOpenDeleteModal(false);
    mutate();
  };

  return (
    <>
      <div
        className={styles.darkBG}
        onClick={() => setOpenDeleteModal(false)}
      />
      <div className={styles.centered}>
        <div className={styles.modalDelete}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>AWAS!</h5>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setOpenDeleteModal(false)}
          >
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <form onSubmit={handleSubmit}>
            <div className={styles.modalContent}>
              Anda YAKIN untuk menghapus {entity.nama}?
            </div>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                {deletingData ? <BusyButton /> : <SubmitButton func='del' />}
                <button
                  className={styles.cancelBtn}
                  onClick={() => setOpenDeleteModal(false)}
                >
                  Tidak
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
