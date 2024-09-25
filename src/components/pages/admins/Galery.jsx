import { useEffect, useState } from 'react';
import { useDataGaleriByIdPaket } from '../../../features/useDataGaleriByIdPaket';
import NavbarAdmin from '../../materials/NavbarAdmin';
import GaleryTable from '../../organisms/GaleryTable';
import Loading from '../Loading';
// import ButtonCustom from './../../atoms/ButtonCustom';

const Galery = () => {
  const { dataGaleriByIdPaket, isLoading } = useDataGaleriByIdPaket(666);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!isLoading && dataGaleriByIdPaket) {
      setData(dataGaleriByIdPaket.data);
    }
    console.log(dataGaleriByIdPaket);
  }, [isLoading, dataGaleriByIdPaket]);

  if (isLoading || data == null) {
    <Loading />;
  }
  return (
    <>
      <NavbarAdmin />
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg mt-14">
          <div className="flex justify-between mb-10">
            <p>
              Admin /{' '}
              <a href="/admin/galeri" className="hover:border-b border-blue-500 hover:text-blue-500">
                Galeri
              </a>
            </p>
          </div>
          <GaleryTable />
          {/* <img src="http://localhost:5000/assets/1722078448637-furniro.png" alt="Description" /> */}
        </div>
      </div>
    </>
  );
};

export default Galery;
