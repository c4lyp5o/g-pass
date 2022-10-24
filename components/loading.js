import styles from '../styles/Modal.module.css';

export default function Loading() {
  return (
    <>
      <div className={styles.darkBG} />
      <div className={styles.modalContent}>
        <div className={styles.centered}>
          <div className='flex justify-center text-center h-full w-full'>
            <div className='m-auto p-4 bg-admin4 rounded-md grid'>
              <div className='flex justify-center mb-2'>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              </div>
              <span className='bg-green-400 text-xs font-semibold px-2.5 py-0.5 rounded'>
                Memuat..
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
