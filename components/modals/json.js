import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { toast } from 'react-toastify';

import { BusyButton, SubmitButton } from '../buttons';

const AddJson = ({ toggle, addJson, setAddJson }) => {
  const [addingData, setAddingData] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const cancelButtonRef = useRef(null);

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
      toast.success(`${res.data.added} data berjaya ditambah`);
    } catch (error) {
      console.error(error);
      toast.error(`Data gagal ditambah kerana ${error.response.data.message}`);
    } finally {
      setAddingData(false);
      setAddJson(false);
    }
  };

  return (
    <Transition.Root show={addJson} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={noWayBack}
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
                        className='text-base font-semibold leading-6 text-gray-900'
                      >
                        Tambah Maklumat{' '}
                        <span className='capitalize'>
                          {toggle === 'kkiakd' ? 'KKIA / KD' : toggle}
                        </span>{' '}
                        Menggunakan JSON
                      </Dialog.Title>
                      <div className='mt-2'>
                        <input
                          className='mb-4 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-900 placeholder-gray-500 py-3'
                          type='file'
                          id='jsonFile'
                        />
                        <label htmlFor='toggle'>
                          Tambah data tanpa menghapuskan data lama
                          <input
                            type='checkbox'
                            id='addmode'
                            className='ml-2 h-4 w-4 text-green-600'
                            name='addmode'
                            value={addMode || false}
                            onChange={(e) => {
                              setAddMode(e.target.checked);
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                    {addingData ? (
                      <BusyButton func='add' />
                    ) : (
                      <SubmitButton func='add' />
                    )}
                    <button
                      type='button'
                      className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                      onClick={() => setAddJson(false)}
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

export default AddJson;
