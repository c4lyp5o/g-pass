import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { RiCloseLine } from 'react-icons/ri';

import Loading from './loading';

import { Human, NonHuman } from './inputs';
import { BusyButton, SubmitButton } from './buttons';
import styles from '../styles/Modal.module.css';

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

const Modal = ({ toggle, setOpenEditModal, entity, mutate }) => {
  const { data, error } = useSWR(
    `/api/gpass?type=individu&from=${toggle}&id=${entity.bil}`,
    fetcher
  );

  const [slate, setSlate] = useState({});
  const [editingData, setEditingData] = useState('');

  useEffect(() => {
    if (data) {
      setSlate(data);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditingData(true);
    let Data = {};
    Data = {
      updateNama: slate.nama,
      type: toggle,
      bil: entity.bil,
    };
    if (toggle === 'pegawai') {
      Data = {
        ...Data,
        updateMdcNumber: slate.mdcNumber,
      };
    }
    if (toggle === 'juruterapi') {
      Data = {
        ...Data,
        updateMdtbNumber: slate.mdtbNumber,
      };
    }
    if (toggle === 'fasiliti') {
      Data = {
        ...Data,
        updateDaerah: slate.daerah,
        updateNegeri: slate.negeri,
        updateKodFasiliti: slate.kodFasiliti,
        updatekodFasilitiGiret: slate.kodFasilitiGiret,
      };
    }
    console.log(Data);
    try {
      const res = await axios.post('/api/gpass', {
        query: 'update',
        payload: Data,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setEditingData(false);
    setOpenEditModal(false);
    mutate();
  };

  const InputProps = {
    setSlate,
    slate,
  };

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
              {toggle !== 'fasiliti' ? (
                <Human {...InputProps} />
              ) : (
                <NonHuman {...InputProps} />
              )}
            </div>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                {editingData ? <BusyButton /> : <SubmitButton func='edit' />}
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
