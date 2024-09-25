import GoogleTambahAdmin from '../../atoms/GoogleTambahAdmin';
import NavbarAdmin from '../../materials/NavbarAdmin';
import AdminTable from '../../organisms/AdminTable';

const Admin = () => {
  return (
    <>
      <NavbarAdmin />
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg mt-14">
          <div className="flex justify-between mb-10">
            <p>
              Admin /{' '}
              <a href="/admin/admin" className="hover:border-b border-blue-500 hover:text-blue-500">
                Admin
              </a>
            </p>
            <GoogleTambahAdmin />
            {/* <ButtonCustom link="/admin/admin/tambah" nama="Tambah" bgColor="blue-500" /> */}
          </div>
          <AdminTable />
        </div>
      </div>
    </>
  );
};

export default Admin;
