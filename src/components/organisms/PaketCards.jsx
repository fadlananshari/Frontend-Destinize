import { useEffect, useState } from 'react';
import { useDataAllPaketWisata } from '../../features/useDataAllPaketWisata';
import Loading from '../pages/Loading';
import PaketCard from '../molecules/PaketCard';


const PaketCards = () => {
  const { dataPaketWisata, isLoading } = useDataAllPaketWisata();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!isLoading && dataPaketWisata) {
      setData(dataPaketWisata.data);
      // console.log(dataUser.data);
      // console.log(data)
    }
  }, [isLoading, dataPaketWisata]);

  if (isLoading || data == null) {
    <Loading />;
  }

  return (
    <>
      <div className="overflow-x-auto no-scrollbar">
        {/* <h3 className="ml-6 text-sm md:text-lg font-semibold text-blue-500">DESTINASI FAVORIT</h3>
        <div className="flex justify-between mx-5">
          <h1 className="flex text-lg lg:text-4xl font-semibold mt-3">
            <BiSolidPlaneAlt className="text-blue-500 my-auto" /> <FaCircle size={7} className="my-auto mx-1" />
            Temukan Destinasi Favoritmu
          </h1>
          <a href="#" className="flex text-sm md:text-base h-max mt-auto text-blue-400 text-semibold hover:text-blue-600">
            Lihat Semua
            <IoIosArrowForward className="my-auto md:text-lg" />
          </a>
        </div> */}
        <div className="flex space-x-5 md:space-x-10 p-4 md:p-6 mx-auto md:mt-5" style={{ maxWidth: 'fit-content' }}>
          {data && data.slice(0, 5).map((item, index) => <PaketCard key={index} id={item.id} nama={item.nama} deskripsi={item.deskripsi} foto={item.foto} lokasi={item.lokasi} />)}
        </div>
      </div>

      {/* <div className="flex gap-7 mt-10 px-5">{data && data.slice(0, 5).map((item, index) => <PaketCard key={index} id={item.id} nama={item.nama} deskripsi={item.deskripsi} foto={item.foto} lokasi={item.lokasi} />)}</div> */}
    </>
  );
};

export default PaketCards;
