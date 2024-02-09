import { Fragment, useRef, useState, useEffect } from 'react';
import useSWR from 'swr';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Human, NonHuman } from './form-input/inputs';
import Loading from '../loading';
import { BusyButton, SubmitButton } from '../buttons';

const fetcher = (url) => fetch(url).then((res) => res.json());

const EditModal = ({
  toggle,
  openEditModal,
  setOpenEditModal,
  entity,
  mutate,
}) => {
  const { data, error } = useSWR(
    `/gpass/api/gpass?type=individu&from=${toggle}&id=${entity.bil}`,
    fetcher
  );

  const [slate, setSlate] = useState({});
  const [editingData, setEditingData] = useState('');

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (data) {
      setSlate(data);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditingData(true);

    let Data = {
      updateNama: slate.nama,
      type: toggle,
      bil: entity.bil,
    };

    switch (toggle) {
      case 'pegawai':
        if (slate.mdcNumber.toString().match(/[^0-9]/)) {
          toast.error('Nombor MDC hanya boleh mengandungi nombor');
          setEditingData(false);
          return;
        } else {
          Data = {
            ...Data,
            updateMdcNumber: slate.mdcNumber,
          };
        }
        break;
      case 'juruterapi':
        if (!slate.mdtbNumber.match(/^(MDTB|mdtb)/)) {
          toast.error('Nombor MDTB mesti diawali dengan MDTB');
          setEditingData(false);
          return;
        }
        if (slate.mdtbNumber.match(/^(mdtb)/)) {
          slate.mdtbNumber = slate.mdtbNumber.toUpperCase();
        }
        Data = {
          ...Data,
          updateMdtbNumber: slate.mdtbNumber,
        };
        break;
      case 'fasiliti':
        Data = {
          ...Data,
          updateDaerah: slate.daerah,
          updateNegeri: slate.negeri,
          updateKodFasiliti: slate.kodFasiliti,
          updateKodFasilitiGiret: slate.kodFasilitiGiret,
        };
        break;
      case 'kkiakd':
        Data = {
          ...Data,
          updateNamaHospital: slate.namaHospital,
          updateKodFasiliti: slate.kodFasiliti,
          updateJenisFasiliti: slate.jenisFasiliti,
        };
        break;
      default:
        break;
    }

    try {
      await axios.patch('/gpass/api/gpass', {
        payload: Data,
      });
      toast.success('Maklumat berjaya dikemaskini');
      mutate();
    } catch (err) {
      toast.error('Maklumat gagal dikemaskini');
      console.log(err);
    } finally {
      setEditingData(false);
      setOpenEditModal(false);
    }
  };

  const InputProps = {
    slate,
    setSlate,
    toggle,
  };

  if (!data) return <Loading />;

  if (error) return <div>failed to load</div>;

  return (
    <Transition.Root show={openEditModal} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={setOpenEditModal}
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
                    <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                      <CheckIcon
                        className='h-6 w-6 text-green-600'
                        aria-hidden='true'
                      />
                    </div>
                    <div className='mt-3 text-center sm:mt-5'>
                      <Dialog.Title
                        as='h3'
                        className='text-base font-semibold leading-6 text-gray-900 capitalize'
                      >
                        Kemaskini {toggle === 'kkiakd' ? 'KKIA / KD' : toggle}{' '}
                        Baru
                      </Dialog.Title>
                      <div className='mt-2'>
                        {toggle !== 'fasiliti' && toggle !== 'kkiakd' ? (
                          <Human {...InputProps} />
                        ) : (
                          <NonHuman {...InputProps} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                    {editingData ? (
                      <BusyButton func='edit' />
                    ) : (
                      <SubmitButton func='edit' />
                    )}
                    <button
                      type='button'
                      className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                      onClick={() => setOpenEditModal(false)}
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

export default EditModal;
