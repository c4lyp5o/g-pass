import { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import axios from 'axios';

import { toast } from 'react-toastify';
import { Human, NonHuman } from './inputs';
import { BusyButton, SubmitButton } from './buttons';
import styles from '../styles/Modal.module.css';

const Modal = ({ toggle, setOpenAddModal, mutate }) => {
  const [slate, setSlate] = useState({});
  const [addingData, setAddingData] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddingData(true);
    let Data = {};
    Data = {
      type: toggle,
      nama: slate.nama,
    };
    if (toggle === 'pegawai') {
      if (slate.mdcNumber.match(/[^0-9]/)) {
        toast.error('MDC Number hanya boleh mengandungi nombor');
        setAddingData(false);
        return;
      }
      Data = {
        ...Data,
        mdcNumber: slate.mdcNumber,
        statusPegawai: 'pp',
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
        mdtbNumber: slate.mdtbNumber,
        statusPegawai: 'jp',
      };
    }
    if (toggle === 'fasiliti') {
      Data = {
        ...Data,
        daerah: slate.daerah,
        negeri: slate.negeri,
        kodFasiliti: slate.kodFasiliti,
        kodFasilitiGiret: slate.kodFasilitiGiret,
      };
    }
    if (toggle === 'kkiakd') {
      Data = {
        ...Data,
        namaHospital: slate.namaHospital,
        daerah: slate.daerah,
        negeri: slate.negeri,
        kodFasiliti: slate.kodFasiliti,
        jenisFasiliti: slate.jenisFasiliti,
      };
    }
    console.log(Data);
    try {
      const res = await axios.post('/api/gpass', {
        query: 'create',
        payload: Data,
      });
      toast.success('Data berjaya ditambah');
      console.log(res);
    } catch (err) {
      toast.error('Data gagal ditambah');
      console.log(err);
    }
    setAddingData(false);
    setOpenAddModal(false);
    mutate();
  };

  const InputProps = {
    slate,
    setSlate,
    toggle,
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.darkBG} onClick={() => setOpenAddModal(false)} />
        <div className={styles.centered}>
          <div className={styles.modalAdd}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>Tambah {toggle}</h5>
            </div>
            <span
              className={styles.closeBtn}
              onClick={() => setOpenAddModal(false)}
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
                {addingData ? <BusyButton /> : <SubmitButton func='add' />}
                <span
                  className={styles.cancelBtn}
                  onClick={() => setOpenAddModal(false)}
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
