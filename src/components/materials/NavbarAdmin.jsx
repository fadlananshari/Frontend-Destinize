import { useEffect, useState } from 'react';
import { useDataAdminById } from '../../features/useDataAdminById';
import Loading from '../pages/Loading';
import { FaGlobeAmericas, FaChartPie, FaCamera, FaShoppingBag  } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import Swal from 'sweetalert2';

const NavbarAdmin = () => {
  const { isLoading, dataAdmin } = useDataAdminById();
  const [data, setData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const showLogoutAlert = () => {
    Swal.fire({
      title: 'Apakah anda yakin ingin keluar?',
      showDenyButton: true,
      confirmButtonText: 'Ya',
      denyButtonText: 'Tidak',
      customClass: {
        confirmButton: 'bg-red-500 hover:bg-red-600',
        denyButton: 'bg-blue-500 hover:bg-blue-600',
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    location.reload();
  };

  useEffect(() => {
    if (!isLoading && dataAdmin) {
      setData(dataAdmin.data);
      // console.log(dataAdmin.data);
      // console.log(data)
    }
  }, [isLoading, dataAdmin]);

  return (
    <>
      {isLoading || data == null ? (
        <Loading />
      ) : (
        data &&
        data[0] && (
          <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start rtl:justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      onClick={toggleSidebar}
                    >
                      <span className="sr-only">Open sidebar</span>
                      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        ></path>
                      </svg>
                    </button>
                    <a href="#" className="flex ms-2 md:me-24">
                      <img src="/logo.png" className="h-8 me-3" alt="FlowBite Logo" />
                      <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Destinize</span>
                    </a>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center ms-3">
                      <div>
                        <button type="button" onClick={toggleDropdown} className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" aria-expanded={isDropdownOpen}>
                          <span className="sr-only">Open user menu</span>
                          {data[0] && <img className="w-8 h-8 rounded-full" src={`${data[0].profile_pic}`} alt="user photo" />}
                        </button>
                      </div>

                      <div className={`z-50 ${isDropdownOpen ? 'fixed right-0 top-10' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow`} id="dropdown-user">
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
                            <a href="dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                              Dashboard
                            </a>
                          </li>
                          <li>
                            <button onClick={() => showLogoutAlert()} className="w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <aside
              id="logo-sidebar"
              className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
              aria-label="Sidebar"
            >
              <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                  <li>
                    <a href="/admin/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg hover:text-blue-500 dark:hover:bg-gray-700 group">
                      <FaChartPie size={20} />
                      <span className="ms-3">Dashboard</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/paket-wisata" className="flex items-center p-2 text-gray-900 rounded-lg hover:text-blue-500 dark:hover:bg-gray-700 group">
                      <FaGlobeAmericas size={20} />
                      <span className="flex-1 ms-3 whitespace-nowrap">Paket Wisata</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/galeri" className="flex items-center p-2 text-gray-900 rounded-lg hover:text-blue-500 dark:hover:bg-gray-700 group">
                      <FaCamera size={20} />
                      <span className="flex-1 ms-3 whitespace-nowrap">Galeri</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/pesanan" className="flex items-center p-2 text-gray-900 rounded-lg hover:text-blue-500 group">
                      <FaShoppingBag size={20}/>
                      <span className="flex-1 ms-3 whitespace-nowrap">Pesanan</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/admin" className="flex items-center p-2 text-gray-900 rounded-lg hover:text-blue-500 dark:hover:bg-gray-700 group">
                      <RiAdminFill size={20} />
                      <span className="flex-1 ms-3 whitespace-nowrap">Admin</span>
                    </a>
                  </li>
                  {/* <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:text-blue-500 dark:hover:bg-gray-700 group">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                        <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                        <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                    </a>
                  </li> */}
                </ul>
              </div>
            </aside>
          </>
        )
      )}
    </>
  );
};

export default NavbarAdmin;
