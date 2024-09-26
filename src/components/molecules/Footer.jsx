import Travelindo from '../../assets/logo.png';

const Footer = () => {
  return (
    <>
      <footer className="bg-slate-100 rounded-lg shadow dark:bg-gray-900 m-4 mt-20">
        <div className="w-full max-w-screen-2xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
              <img src={Travelindo} alt="" className="h-7 lg:h-8" />
              <p className="my-auto font-bold text-xl">Destinize</p>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="/" className="hover:underline me-4 md:me-6">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/paket-wisata" className="hover:underline me-4 md:me-6">
                  Paket
                </a>
              </li>
              <li>
                <a href="/pesanan" className="hover:underline me-4 md:me-6">
                  Pesanan
                </a>
              </li>
              <li>
                <a href="/kredit" className="hover:underline">
                  Kredit
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{' '}
            <a href="/" className="hover:underline">
              Destinize™
            </a>
            . All Rights Reserved.
          </span>
          {/* <h2>Kredit</h2>
          <p>
            Desain oleh <a href="https://www.figma.com/@syaufy">Syauqizaidan Khairan Khalaf</a> dari Figma Community
          </p> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
