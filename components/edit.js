import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { RiCloseLine } from 'react-icons/ri';

import Loading from './loading';

import { toast } from 'react-toastify';
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
      if (slate.mdcNumber.match(/[^0-9]/)) {
        toast.error('MDC Number hanya boleh mengandungi nombor');
        setEditingData(false);
        return;
      }
      Data = {
        ...Data,
        updateMdcNumber: slate.mdcNumber,
      };
    }
    if (toggle === 'juruterapi') {
      if (!slate.mdtbNumber.match(/^(MDTB|mdtb)/)) {
        toast.error('MDTB Number mesti diawali dengan MDTB');
        setAddingData(false);
        return;
      }
      if (slate.mdtbNumber.match(/^(mdtb)/)) {
        slate.mdtbNumber = slate.mdtbNumber.toUpperCase();
      }
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
        updateKodFasilitiGiret: slate.kodFasilitiGiret,
      };
    }
    if (toggle === 'kkiakd') {
      Data = {
        ...Data,
        updateNamaHospital: slate.namaHospital,
        updateKodFasiliti: slate.kodFasiliti,
        updateJenisFasiliti: slate.jenisFasiliti,
      };
    }
    console.log(Data);
    try {
      const res = await axios.post('/api/gpass', {
        query: 'update',
        payload: Data,
      });
      toast.success('Data berjaya dikemaskini');
      console.log(res);
    } catch (err) {
      toast.error('Data gagal dikemaskini');
      console.log(err);
    }
    setEditingData(false);
    setOpenEditModal(false);
    mutate();
  };

  const InputProps = {
    slate,
    setSlate,
    toggle,
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
              {toggle !== 'fasiliti' && toggle !== 'kkiakd' ? (
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
