import NavbarAdmin from './../../materials/NavbarAdmin';
import { useEffect, useState } from 'react';
import { FaGlobeAmericas } from 'react-icons/fa';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { FaShoppingBag } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { useDataAllPaketWisata } from './../../../features/useDataAllPaketWisata';
import Loading from './../Loading';
import { useDataAllPesanan } from '../../../features/useDataAllPesanan';
import { useDataAllAdmins } from '../../../features/useDataAllAdmins';

const Index = () => {
  const { dataPaketWisata, isLoading } = useDataAllPaketWisata();
  const [data, setData] = useState(null);

  const { dataPesanan } = useDataAllPesanan();
  const [dataAllPesanan, setDataAllPesanan] = useState(null);

  const { dataAdmins } = useDataAllAdmins();
  const [dataAllAdmins, setDataAllAdmins] = useState(null);

  useEffect(() => {
    if (!isLoading && dataPaketWisata) {
      setData(dataPaketWisata.data);
    }
  }, [isLoading, dataPaketWisata]);

  useEffect(() => {
    if (dataPesanan) {
      setDataAllPesanan(dataPesanan.data);
    }
  }, [dataPesanan]);

  useEffect(() => {
    if (dataAdmins) {
      setDataAllAdmins(dataAdmins.data);
    }
  }, [dataAdmins]);

  if (isLoading || data == null) {
    <Loading />;
  }
  return (
    <>
      <NavbarAdmin />
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg mt-14">
          <div className=" md:flex gap-5">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex gap-5">
                <FaGlobeAmericas size={100} className="text-blue-600 w-max h-max" />
                <div>
                  <h3 className="text-lg font-extrabold">PAKET WISATA</h3>
                  {data && data.length > 0 ? <p className="text-blue-600 text-3xl font-extrabold mb-3">{data.length} PAKET</p> : <p className="text-blue-600 text-3xl font-extrabold mb-3">0 PAKET</p>}

                  <a href="/admin/paket-wisata" className="flex w-max ml-auto text-sm hover:text-blue-700 hover:-mr-5 duration-500">
                    Selengkapnya <IoIosArrowRoundForward size={25} className="my-auto" />
                  </a>
                </div>
              </div>
            </div>
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex gap-5">
                <FaShoppingBag size={100} className="text-blue-600 w-max h-max"/>
                <div>
                  <h3 className="text-lg font-extrabold">PESANAN</h3>
                  {dataAllPesanan && dataAllPesanan.length > 0 ? <p className="text-blue-600 text-3xl font-extrabold mb-3">{dataAllPesanan.length} ORDER</p> : <p className="text-blue-600 text-3xl font-extrabold mb-3">0 ORDER</p>}

                  <a href="/admin/pesanan" className="flex w-max ml-auto text-sm hover:text-blue-700 hover:-mr-5 duration-500">
                    Selengkapnya <IoIosArrowRoundForward size={25} className="my-auto" />
                  </a>
                </div>
              </div>
            </div>
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex gap-5">
                <RiAdminFill size={100} className="text-blue-600 w-max h-max" />
                <div>
                  <h3 className="text-lg font-extrabold">PESANAN</h3>
                  {dataAllAdmins && dataAllAdmins.length > 0 && <p className="text-blue-600 text-3xl font-extrabold mb-3">{dataAllAdmins.length} ADMIN</p>}

                  <a href="/admin/admin" className="flex w-max ml-auto text-sm hover:text-blue-700 hover:-mr-5 duration-500">
                    Selengkapnya <IoIosArrowRoundForward size={25} className="my-auto" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
