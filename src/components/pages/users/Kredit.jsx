import { FaCircle } from 'react-icons/fa';
import NavbarUser from '../../materials/NavbarUser';
import Footer from '../../molecules/Footer';

const Kredit = ({ isUserLoggedIn }) => {
  return (
    <>
      <NavbarUser isUserLoggedIn={isUserLoggedIn} />
      <div className="container mx-auto px-4 mt-20 md:mt-28">
        <p className="my-auto mb-2 text-xs md:text-sm xl:text-base">
          <a href="/" className="hover:text-blue-500">
            Beranda
          </a>{' '}
          /{' '}
          <a href="/Kredit" className="hover:text-blue-500">
            Kredit
          </a>
        </p>
        {/* <PaketAllCards /> */}
        <div className="h-80 mt-5 md:mt-10">
          <div className="mb-5 md:mb-10">
            <h3 className="text-sm md:text-lg font-semibold text-blue-500">KREDIT DESAIN</h3>
            <p className="mt-4">
              Desain antarmuka pengguna untuk Destinize diambil dari{' '}
              <a href="https://www.figma.com/community/file/1210601516714970320/destinize-travel-website-landing-page" className="text-blue-500 hover:text-blue-700 hover:underline">
                Figma Community
              </a>{' '}
              dan dikembangkan oleh{' '}
              <a href="https://www.figma.com/@syaufy" className="text-blue-500 hover:text-blue-700 hover:underline">
                Syauqizaidan Khairan Khalaf
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Kredit;
