import NavbarAdmin from '../../materials/NavbarAdmin';
import PaketWisataTable from './../../organisms/PaketWisataTable';
import ButtonCustom from './../../atoms/ButtonCustom';

const PaketWisata = () => {
  return (
    <>
      <NavbarAdmin />
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg mt-14">
          <div className="flex justify-between ">
            <p>Admin / <a href="/admin/paket-wisata" className="hover:border-b border-blue-500 hover:text-blue-500">Paket Wisata</a></p>
            <ButtonCustom link="/admin/paket-wisata/tambah" nama="Tambah" bgColor="blue-500" />
          </div>
          <PaketWisataTable />
        </div>
      </div>
    </>
  );
};

export default PaketWisata;
