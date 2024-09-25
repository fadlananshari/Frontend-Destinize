import { useEffect, useState } from 'react';
import Travelindo from '../../assets/logo.png';
import { useDataUserById } from '../../features/useDataUserById';
import Loading from '../pages/Loading';

const NavbarUser = ({ isUserLoggedIn }) => {
  const { isLoading, dataUser } = useDataUserById();
  const [data, setData] = useState(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const signOut = () => {
    localStorage.removeItem('userToken');
    location.reload();
  };

  useEffect(() => {
    if (!isLoading && dataUser) {
      setData(dataUser.data);
      // console.log(dataUser.data);
      // console.log(data)
    }
  }, [isLoading, dataUser]);

  if (isLoading && data == null) {
    <Loading />;
  }

  return (
    <>
      <nav className="fixed top-0 w-full border-gray-200 bg-slate-100 dark:bg-gray-800 dark:border-gray-700 z-20">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex gap-2 my-auto">
            <img src={Travelindo} alt="" className="h-7 lg:h-8" />
            <p className="my-auto font-bold text-xl">Destinize</p>
          </a>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li className="my-auto">
                <a
                  href="/"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Beranda
                </a>
              </li>
              <li className="my-auto">
                <a
                  href="/paket-wisata"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Paket
                </a>
              </li>
              <li className="my-auto">
                <a
                  href="/pesanan"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Pesanan
                </a>
              </li>
              <li className="my-auto">
                <a
                  href="/kredit"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Kredit
                </a>
              </li>
              <li className="my-auto">
                {/* <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </a> */}
                {isUserLoggedIn && data && data[0] ? (
                  <div className="md:flex items-center ms-3 hidden ">
                    <div>
                      <button type="button" onClick={toggleDropdown} className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" aria-expanded={isDropdownOpen}>
                        <span className="sr-only">Open user menu</span>
                        {data[0] && <img className="w-8 h-8 rounded-full" src={`${data[0].profile_pic}`} alt="user photo" />}
                      </button>
                    </div>

                    <div className={`z-50 ${isDropdownOpen ? 'fixed top-12 right-0' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow`} id="dropdown-user">
                      <div className="px-4 py-3" role="none">
                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                          {data[0].nama}
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                          {data[0].email}
                        </p>
                      </div>
                      <ul className="py-1" role="none">
                        <li>
                          <button onClick={() => signOut()} className="w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="ml-3 md:ml-0 my-5 md:my-0">
                    <a href="/login" className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg">
                      Login
                    </a>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarUser;
