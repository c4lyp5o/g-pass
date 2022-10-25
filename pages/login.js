import { useState } from 'react';
import Link from 'next/link';
import useUser from '../lib/useUser';
import fetchJson from '../lib/fetchJson';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

function userIDBox({ setUserName, showUserIDBox }) {
  if (showUserIDBox === true) {
    return (
      <div className='flex justify-center items-center'>
        <div className='relative'>
          <input
            className='mt-5 appearance-none leading-7 px-3 py-1 ring-2 ring-admin4 focus:ring-2 focus:ring-admin1 focus:outline-none rounded-md peer'
            type='text'
            placeholder='ID Pengguna'
            name='usernameAdmin'
            id='usernameAdmin'
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label
            htmlFor='usernameAdmin'
            className='absolute left-3 bottom-8 text-xs text-admin1 bg-userWhite peer-placeholder-shown:text-admin4 peer-placeholder-shown:bottom-1.5 peer-placeholder-shown:text-base peer-focus:bottom-8 peer-focus:text-xs transition-all'
          >
            ID Pengguna
          </label>
        </div>
      </div>
    );
  }
}

function passwordBox({ setPassword, showPasswordBox, showPassword, hilang }) {
  if (showPasswordBox === true) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <h3 className='text-xl font-semibold mt-5'>
          sila masukkan Key verifikasi
        </h3>
        <div className='relative'>
          <input
            className='mt-5 appearance-none leading-7 px-3 py-1 ring-2 ring-admin4 focus:ring-2 focus:ring-admin1 focus:outline-none rounded-md peer'
            type={showPassword ? 'text' : 'password'}
            name='passwordAdmin'
            id='passwordAdmin'
            placeholder='Kata Laluan'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label
            htmlFor='passwordAdmin'
            className='absolute left-3 bottom-8 text-xs text-admin1 bg-userWhite peer-placeholder-shown:text-admin1 peer-placeholder-shown:bottom-1.5 peer-placeholder-shown:text-base peer-focus:bottom-8 peer-focus:text-xs transition-all'
          >
            Kata Laluan
          </label>
          <div className='absolute top-7 right-3 text-xl text-admin1'>
            {showPassword ? (
              <AiFillEye onClick={hilang} />
            ) : (
              <AiFillEyeInvisible onClick={hilang} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default function Login() {
  const [username, setUserName] = useState();
  const [showUserIDBox, setShowUserIDBox] = useState(true);
  const [password, setPassword] = useState();
  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [kicker, setKicker] = useState(null);

  const { mutateUser } = useUser({
    redirectTo: '/profile-sg',
    redirectIfFound: false,
  });

  const hilang = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showPasswordBox === false) {
      try {
        // const response = await checkUser(username);
        // toast.info(
        //   `Key Verifikasi telah dihantar ke ${response.data.email}. Sila isi di ruang Key Verifikasi. Mohon untuk memeriksa folder spam dan tandakan email dari Key Master sebagai bukan spam.`
        // );
        const numkicker = setTimeout(() => {
          //   toast.error(
          //     'Masa untuk login telah habis. Sila masukkan ID semula untuk login!'
          //   );
          setUserName('');
          setShowPasswordBox(false);
          //   navigate('/pentadbir');
        }, 1000 * 60 * 5);
        setKicker(numkicker);
      } catch (error) {
        toast.error(error.response.data.message);
        return;
      }
      setShowPasswordBox(true);
    }

    if (showPasswordBox === true) {
      setLoggingIn(true);
      //   setTimeout(async () => {
      //     try {
      //       const response = await loginUser({
      //         username,
      //         password,
      //       });
      //       setToken(response.data.adminToken);
      //       setLoggingIn(false);
      //       clearTimeout(kicker);
      //       navigate('/pentadbir/landing');
      //     } catch (error) {
      //       toast.error(error.response.data.message);
      //       setLoggingIn(false);
      //     }
      //   }, 1000);
      mutateUser(
        await fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(password),
        })
      );
    }
  };

  return (
    <>
      <div className='absolute inset-0 -z-10 flex bg-green-400 text-center justify-center items-center capitalize'>
        <div className='w-1/2 h-[25rem] mt-20 mb-5 bg-white outline outline-1 outline-black rounded-md shadow-xl'>
          <div className='login-wrapper'>
            <h3 className='text-xl font-semibold mt-10'>
              sila masukkan ID pentadbir
            </h3>
            <form onSubmit={handleSubmit}>
              {userIDBox({ setUserName, showUserIDBox })}
              {passwordBox({
                setPassword,
                showPasswordBox,
                showPassword,
                hilang,
              })}
              <div className='grid grid-cols-2 gap-2 mt-5 ml-20 mr-20'>
                <Link
                  href='/'
                  className='capitalize bg-green-400 text-white rounded-md shadow-xl p-2 hover:bg-admin1 transition-all'
                >
                  kembali ke halaman utama
                </Link>
                {loggingIn ? (
                  <button
                    type='button'
                    className='inline-flex items-center text-center justify-center px-4 py-2 bg-green-400 text-white rounded-md shadow-xl p-2 hover:bg-green-200 transition-all ease-in-out duration-150 cursor-not-allowed'
                    disabled=''
                  >
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
                    Sedang Log Masuk...
                  </button>
                ) : (
                  <button
                    type='submit'
                    className='capitalize bg-green-500 text-white rounded-md shadow-xl p-2 hover:bg-admin1 transition-all'
                  >
                    log masuk
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
