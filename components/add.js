import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import axios from 'axios';

import { toast } from 'react-toastify';
import { Human, NonHuman } from './inputs';
import { BusyButton, SubmitButton } from './buttons';

const Modal = ({ toggle, openAddModal, setOpenAddModal, mutate }) => {
  const [slate, setSlate] = useState({});
  const [addingData, setAddingData] = useState(false);

  const cancelButtonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddingData(true);
    let Data = {};
    Data = {
      type: toggle,
      nama: slate.nama,
    };
    switch (toggle) {
      case 'pegawai':
        if (slate.mdcNumber.toString().match(/[^0-9]/)) {
          toast.error('Nombor MDC hanya boleh mengandungi nombor');
          setAddingData(false);
          return;
        }
        Data = {
          ...Data,
          mdcNumber: slate.mdcNumber,
          statusPegawai: 'pp',
        };
        break;
      case 'juruterapi':
        if (!slate.mdtbNumber.match(/^(MDTB|mdtb)/)) {
          toast.error('Nombor MDTB mesti diawali dengan MDTB');
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
        break;
      case 'fasiliti':
        Data = {
          ...Data,
          daerah: slate.daerah,
          negeri: slate.negeri,
          kodFasiliti: slate.kodFasiliti,
          kodFasilitiGiret: slate.kodFasilitiGiret,
        };
        break;
      case 'kkiakd':
        Data = {
          ...Data,
          namaHospital: slate.namaHospital,
          daerah: slate.daerah,
          negeri: slate.negeri,
          kodFasiliti: slate.kodFasiliti,
          jenisFasiliti: slate.jenisFasiliti,
        };
        break;
      default:
        break;
    }
    try {
      await axios.post('/api/gpass', {
        query: 'create',
        payload: Data,
      });
      toast.success('Data berjaya ditambah');
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
    <Transition.Root show={openAddModal} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={setOpenAddModal}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <form onSubmit={handleSubmit}>
                  <div>
                    {toggle !== 'fasiliti' && toggle !== 'kkiakd' ? (
                      <Human {...InputProps} />
                    ) : (
                      <NonHuman {...InputProps} />
                    )}
                  </div>
                  <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                    {addingData ? <BusyButton /> : <SubmitButton func='add' />}
                    <button
                      type='button'
                      className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0'
                      onClick={() => setOpenAddModal(false)}
                      ref={cancelButtonRef}
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
