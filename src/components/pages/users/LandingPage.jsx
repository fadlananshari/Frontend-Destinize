import { IoIosArrowRoundForward } from 'react-icons/io';
import HeroImg from '../../../assets/Hero_Img.png';
import IconIsland from '../../../assets/icons8_island.png';
// import { Island } from 'flat-color-icons';
import { BiSolidPlaneAlt } from 'react-icons/bi';
import { FaCamera, FaCameraRetro, FaCircle, FaHeart } from 'react-icons/fa';
import NavbarUser from '../../materials/NavbarUser';
// import { GiIsland } from 'react-icons/gi';
import Marquee from 'react-fast-marquee';
import Traveloka from '../../../assets/Traveloka.png';
import Tiket from '../../../assets/tiket.png';
import PegiPegi from '../../../assets/pegipegi.png';
import AirWings from '../../../assets/airwings.png';
import { IoIosArrowForward } from 'react-icons/io';
import PaketCards from './../../organisms/PaketCards';
import PaketCard from './../../molecules/PaketCard';
import Footer from '../../molecules/Footer';
import Image from '../../../assets/Image.png';
import { LiaSearchSolid } from 'react-icons/lia';
import { SlPencil } from 'react-icons/sl';

const LandingPage = ({ isUserLoggedIn }) => {
  // console.log(isUserLoggedIn)
  return (
    <>
      <NavbarUser isUserLoggedIn={isUserLoggedIn} />
      <div className="container mx-auto px-4 mt-20 md:mt-28">
        <div className="w-full grid lg:grid-flow-col lg:grid-cols-2 xl:grid-cols-none lg:gap-5">
          <div className="">
            <img src={HeroImg} alt="" />
          </div>

          <div className="my-auto">
            <p className="rounded-full bg-blue-100 py-1 md:py-2 px-3 md:px-5 mb-5 w-max text-[#4475F2] flex">
              <BiSolidPlaneAlt size={20} /> <FaCircle size={7} className="my-auto mx-1" /> Explore the wonderful indonesia!
            </p>
            <div className="flex mb-4 lg:mb-7">
              <h1 className="text-3xl md:text-5xl xl:text-6xl font-extrabold">
                Liburan & nikmati <span className="text-[#4475F2] font-extrabold"> tempat baru</span> di{' '}
                <span className="inline-flex font-extrabold gap-2 md:gap-4">
                  indonesia <img src={IconIsland} alt="" className="h-8 md:h-12 xl:h-16" />
                </span>
              </h1>
            </div>

            <p className="">Destinize membuat kamu selalu update terkait tempat liburan baru di Indonesia dengan mengikuti perkembangan para influencer di sosial media ✨</p>
            <div className="flex gap-4 mt-5">
              <button className="flex text-white bg-blue-500 rounded-lg px-5 py-3 md:px-8 md:py-4 hover:bg-blue-600 hover:gap-3 hover:pr-5">
                Mulai sekarang <IoIosArrowRoundForward size={25} className="my-auto" />
              </button>
            </div>
          </div>
        </div>

        <Marquee className="pt-5 mt-7 md:mt-14">
          <div>
            <img src={Traveloka} alt="" className="h-8 md:h-10 lg:h-12 xl:h-16 mx-3 md:mx-8 lg:mx-10 xl:mx-12 -mt-3 md:-mt-5 lg:-mt-8" />
          </div>
          <div>
            <img src={Tiket} alt="" className="h-8 md:h-10 lg:h-12 xl:h-16 mx-3 md:mx-8 lg:mx-10 xl:mx-12" />
          </div>
          <div>
            <img src={PegiPegi} alt="" className="h-8 md:h-10 lg:h-12 xl:h-16 mx-3 md:mx-8 lg:mx-10 xl:mx-12" />
          </div>
          <div>
            <img src={AirWings} alt="" className="h-8 md:h-10 lg:h-12 xl:h-16 mx-3 md:mx-8 lg:mx-10 xl:mx-12" />
          </div>
        </Marquee>

        <div className="mt-10 md:mt-20">
          <h3 className="lg:ml-6 text-sm md:text-lg font-semibold text-blue-500">DESTINASI FAVORIT</h3>
          <div className="flex justify-between lg:mx-5">
            <h1 className="flex text-lg lg:text-4xl font-bold mt-1 lg:mt-4">
              <BiSolidPlaneAlt className="text-blue-500 my-auto" /> <FaCircle size={7} className="my-auto mx-1" />
              Temukan Destinasi Favoritmu
            </h1>
            <a href="/paket-wisata" className="md:flex hidden text-sm md:text-base h-max mt-auto text-blue-400 text-semibold hover:text-blue-600">
              Lihat Semua
              <IoIosArrowForward className="my-auto md:text-lg" />
            </a>
          </div>

          <PaketCards />
        </div>

        <div className="">
          <div className="lg:flex flex-row-reverse justify-between lg:ml-6">
            <img src={Image} alt="" className="mx-auto md:mx-0" />

            <div className="space-y-5 lg:space-y-10 my-auto">
              <div>
                <h3 className="text-sm md:text-lg font-semibold text-blue-500">RESERVASI TEMPAT</h3>
                <h1 className="text-lg lg:text-4xl font-bold mt-1 lg:mt-4">Gak mau ngantri? reservasi aja!</h1>
              </div>

              <div className="flex mt-10 lg:ml-4">
                <div className="bg-blue-500 rounded-lg p-3 mr-4 my-auto">
                  <LiaSearchSolid size={25} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">Cari tempat yang kamu mau</p>
                  <p className="font-light text-xs md:text-sm">Temukan destinasi selanjutnya yang akan kamu kunjungi dengan Destinize</p>
                </div>
              </div>
              <div className="flex lg:ml-4">
                <div className="bg-blue-500 rounded-lg p-3 mr-4 my-auto">
                  <SlPencil size={25} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">Isi data dan konfirmasi pembayaran</p>
                  <p className="font-light text-xs md:text-sm">Tulis dan lengkapi data kamu untuk keperluan data booking</p>
                </div>
              </div>
              <div className="flex lg:ml-4">
                <div className="bg-blue-500 rounded-lg p-3 mr-4 my-auto">
                  <FaHeart size={25} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">Tinggal masuk dan enjoy!</p>
                  <p className="font-light text-xs md:text-sm">Kamu bisa langsung masuk dan enjoy liburan kamu tanpa hambatan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-20">
          <div className="mb-5 md:mb-10">
            <h3 className="text-sm md:text-lg font-semibold text-blue-500">MENGENAL INDONESIA</h3>
            <h1 className="flex text-lg lg:text-4xl font-bold mt-1 lg:mt-4">
              <FaCameraRetro className="text-blue-500 my-auto" /> <FaCircle size={7} className="my-auto mx-1" /> Temukan Keindahan Indonesia
            </h1>
          </div>
          <div className="w-full h-0 pb-[56.25%] relative overflow-hidden">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/xWyZDVsFKc0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
