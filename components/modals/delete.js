import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import axios from 'axios';

import { toast } from 'react-toastify';
import { BusyButton, SubmitButton } from '../buttons';

const DeleteModal = ({
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
      await axios.delete(`/gpass/api/gpass?type=${toggle}&bil=${entity.bil}`);
      toast.success('Maklumat berjaya dihapus');
      mutate();
    } catch (err) {
      toast.error('Maklumat gagal dihapus');
      console.log(err);
    } finally {
      setDeletingData(false);
      setOpenDeleteModal(false);
    }
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
                  <div className='sm:flex sm:items-start'>
                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                      <ExclamationTriangleIcon
                        className='h-6 w-6 text-red-600'
                        aria-hidden='true'
                      />
                    </div>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-base font-semibold leading-6 text-gray-900'
                      >
                        Hapus {entity.nama}
                      </Dialog.Title>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-500'>
                          Anda YAKIN untuk menghapus {entity.nama}?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                    {deletingData ? (
                      <BusyButton func='del' />
                    ) : (
                      <SubmitButton func='del' />
                    )}
                    <button
                      type='button'
                      className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
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

export default DeleteModal;
