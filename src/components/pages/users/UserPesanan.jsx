import { FaCamera, FaCircle } from 'react-icons/fa';
import NavbarUser from '../../materials/NavbarUser';
import Footer from '../../molecules/Footer';
import PesananCards from './../../organisms/PesananCards';

const UserPesanan = ({ isUserLoggedIn }) => {
  return (
    <>
      <NavbarUser isUserLoggedIn={isUserLoggedIn} />
      <div className="container mx-auto px-4 mt-20 md:mt-28">
        <p className="my-auto mb-10 text-xs md:text-sm xl:text-base">
          <a href="/" className="hover:text-blue-500">
            Beranda
          </a>{' '}
          /{' '}
          <a href="/Pesanan" className="hover:text-blue-500">
            Pesanan
          </a>
        </p>
        <div className="mb-5">
          <h3 className="text-sm md:text-lg font-semibold text-blue-500">RESERVASI</h3>
          <h1 className="flex text-lg lg:text-4xl font-bold mt-3">
            <FaCamera className="text-blue-500 my-auto" />
            <FaCircle size={7} className="my-auto mx-2" />
            Reservasi berhasil dibuat!
          </h1>
        </div>
        <PesananCards />
      </div>
      <Footer />
    </>
  );
};

export default UserPesanan;
