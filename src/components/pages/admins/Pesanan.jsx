import NavbarAdmin from '../../materials/NavbarAdmin';
import PesananTable from '../../organisms/PesananTable';

const Pesanan = () => {
  return (
    <>
      <NavbarAdmin />
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg mt-14">
          <div className="flex justify-between mb-10">
            <p>
              Admin /{' '}
              <a href="/admin/pesanan" className="hover:border-b border-blue-500 hover:text-blue-500">
                Pesanan
              </a>
            </p>
          </div>
          <PesananTable />
        </div>
      </div>
    </>
  );
};

export default Pesanan;
