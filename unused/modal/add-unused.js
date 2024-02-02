import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import axios from 'axios';

import { Human, NonHuman } from './inputs';
import { BusyButton, SubmitButton } from './buttons';

const Modal = ({ toggle, setOpenAddModal, mutate }) => {
  const [nama, setNama] = useState('');
  const [mdcNumber, setMdcNumber] = useState('');
  const [mdtbNumber, setMdtbNumber] = useState('');

  const [slate, setSlate] = useState({});
  const [addingData, setAddingData] = useState(false);

  const cancelButtonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddingData(true);
    let Data = {};
    Data = {
      nama: slate.nama.toLowerCase(),
    };
    if (toggle === 'pegawai') {
      Data = {
        ...Data,
        mdcNumber: slate.mdcNumber.toLowerCase(),
        statusPegawai: 'pp',
      };
    }
    if (toggle === 'juruterapi') {
      Data = {
        ...Data,
        mdtbNumber: slate.mdtbNumber.toLowerCase(),
        statusPegawai: 'jp',
      };
    }
    if (toggle === 'fasiliti') {
      Data = {
        ...Data,
        daerah: slate.daerah.toLowerCase(),
        negeri: slate.negeri.toLowerCase(),
        kodFasiliti: slate.kodFasiliti.toLowerCase(),
        kodFasilitiGiret: slate.kodFasilitiGiret.toLowerCase(),
        statusPegawai: 'fs',
      };
    }
    console.log(Data);
    try {
      const res = await axios.post('/gpass/api/gpass', {
        query: 'create',
        payload: Data,
      });
      console.log(res);
    } catch (err) {
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
              <h5 className={styles.heading}>TAMBAH {toggle}</h5>
            </div>
            <span
              className={styles.closeBtn}
              onClick={() => setOpenAddModal(false)}
            >
              <RiCloseLine style={{ marginBottom: '-3px' }} />
            </span>
            <div className={styles.modalContent}>
              {toggle !== 'fs' ? (
                <Human {...InputProps} />
              ) : (
                <NonHuman {...InputProps} />
              )}
            </div>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                {addingData ? <BusyButton /> : <SubmitButton />}
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
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
