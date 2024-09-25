import NavbarUser from '../../materials/NavbarUser';
import Footer from '../../molecules/Footer';
import PaketAllCards from './../../organisms/PaketAllCards';

const UserAllPaketWisata = ({isUserLoggedIn}) => {
  return (
    <>
      <NavbarUser isUserLoggedIn={isUserLoggedIn}/>
      <div className="container mx-auto px-4 mt-20 md:mt-28">
        <p className="my-auto mb-2 text-xs md:text-sm xl:text-base">
          <a href="/" className="hover:text-blue-500">
            Beranda
          </a>{' '}
          /{' '}
          <a href="/paket-wisata" className="hover:text-blue-500">
            Paket Wisata
          </a>
        </p>
        <PaketAllCards />
      </div>
      <Footer />
    </>
  );
};

export default UserAllPaketWisata;
