import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import axios from 'axios';

import { toast } from 'react-toastify';
import { BusyButton, SubmitButton } from './buttons';

const Modal = ({
  toggle,
  openDeleteModal,
  setOpenDeleteModal,
  entity,
  mutate,
}) => {
  const [deletingData, setDeletingData] = useState(false);

  const cancelButtonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDeletingData(true);
    try {
      await axios.post('/api/gpass', {
        query: 'delete',
        payload: { type: toggle, bil: entity.bil },
      });
      toast.success('Data berjaya dihapus');
    } catch (err) {
      toast.error('Data gagal dihapus');
      console.log(err);
    }
    setDeletingData(false);
    setOpenDeleteModal(false);
    mutate();
  };

  return (
    <Transition.Root show={openDeleteModal} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={setOpenDeleteModal}
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
                    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                        <div className='space-y-6'>
                          Anda YAKIN untuk menghapus {entity.nama}?
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                    {deletingData ? (
                      <BusyButton />
                    ) : (
                      <SubmitButton func='del' />
                    )}
                    <button
                      type='button'
                      className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0'
                      onClick={() => setOpenDeleteModal(false)}
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
