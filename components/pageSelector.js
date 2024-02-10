import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function PageSelector({
  allItems,
  searchItems,
  usingSearch,
  searchIsRunning,
  page,
  setPage,
}) {
  const currentItems = usingSearch ? searchItems : allItems;
  const totalPages = Math.ceil(currentItems.totalItems / 1000);

  if (searchIsRunning) return null;

  if (currentItems.items.length === 0) return null;

  return (
    <div className='mt-5 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || currentItems.totalItems === 0}
          className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || currentItems.totalItems === 0}
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Next
        </button>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing{' '}
            <span className='font-medium'>
              {page === 1 ? page : 1000 * (page - 1) + 1}
            </span>{' '}
            to{' '}
            <span className='font-medium'>
              {page === totalPages ? currentItems.totalItems : page * 1000}
            </span>{' '}
            of <span className='font-medium'>{currentItems.totalItems}</span>{' '}
            results
          </p>
        </div>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            {page > 1 ? (
              <button
                type='button'
                className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                <span className='sr-only'>Previous</span>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            ) : (
              <button
                type='button'
                className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300'
              >
                <span className='sr-only'>Previous</span>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (currentPage) => (
                <button
                  key={currentPage}
                  type='button'
                  onClick={() => setPage(currentPage)}
                  className={
                    page === currentPage
                      ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600'
                      : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  }
                >
                  {currentPage}
                </button>
              )
            )}
            {page < totalPages ? (
              <button
                type='button'
                className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                <span className='sr-only'>Next</span>
                <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            ) : (
              <button
                type='button'
                className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300'
              >
                <span className='sr-only'>Next</span>
                <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
