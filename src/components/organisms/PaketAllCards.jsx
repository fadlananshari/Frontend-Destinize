import { useEffect, useState } from 'react';
import { useDataAllPaketWisata } from '../../features/useDataAllPaketWisata';
import Loading from '../pages/Loading';
import PaketCard from '../molecules/PaketCard';
import { BiSolidPlaneAlt } from 'react-icons/bi';
import { FaCircle } from 'react-icons/fa';

const PaketAllCards = () => {
  const { dataPaketWisata, isLoading } = useDataAllPaketWisata();
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (!isLoading && dataPaketWisata) {
      setData(dataPaketWisata.data);
    }
  }, [isLoading, dataPaketWisata]);

  useEffect(() => {
    if (data) {
      setFilteredItems(data.filter((item) => item.nama.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }, [data, searchTerm]);

  if (isLoading || data == null) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between mt-5 lg:mt-14">
        <div>
          <h3 className="text-sm md:text-lg font-semibold text-blue-500">PAKET WISATA</h3>

          <h2 className="flex text-lg lg:text-4xl font-bold mt-2 lg:mt-4">
            <BiSolidPlaneAlt className="text-blue-500 my-auto" />
            <FaCircle size={7} className="my-auto mx-1" />
            Lihat semua destinasi wisata
          </h2>
        </div>
        <input type="text" className="hidden lg:block w-96 h-max mt-auto p-2 border border-gray-300 rounded-md hover:shadow-lg" placeholder="Cari paket wisata..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <input type="text" className="block lg:hidden text-xs ml-auto w-36 h-max mt-5 p-2 border border-gray-300 rounded-md hover:shadow-lg" placeholder="Cari paket wisata..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <div className="">
        {/* Display Filtered Items */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-10 p-4 md:p-6 mx-auto md:mt-5" style={{ maxWidth: 'fit-content' }}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => <PaketCard key={index} id={item.id} nama={item.nama} deskripsi={item.deskripsi} foto={item.foto} lokasi={item.lokasi} />)
          ) : (
            <p className="col-span-5 text-center text-gray-500 my-32">Tidak ada paket wisata yang ditemukan.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PaketAllCards;
