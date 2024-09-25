import { toast, ToastContainer } from 'react-toastify';
import Loading from '../pages/Loading';
import { useDataAllAdmins } from './../../features/useDataAllAdmins';
import { useEffect, useState } from 'react';
import { useDataDeleteAdmin } from '../../features/useDataDeleteAdmin';
import Swal from 'sweetalert2';


const AdminTable = () => {
  const { dataAdmins, isLoading } = useDataAllAdmins();
  const [data, setData] = useState(null);

  const deleteData = useDataDeleteAdmin();

  useEffect(() => {
    if (!isLoading && dataAdmins) {
      setData(dataAdmins.data);
    }
  }, [isLoading, dataAdmins]);

  if (isLoading || data == null) {
    return <Loading />;
  }

  const showDeleteAlert = (id) => {
    Swal.fire({
      title: 'Apakah anda yakin ingin menghapus data ini?',
      showDenyButton: true,
      confirmButtonText: 'Ya',
      denyButtonText: 'Tidak',
      customClass: {
        confirmButton: 'bg-red-500 hover:bg-red-600',
        denyButton: 'bg-blue-500 hover:bg-blue-600',
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleDelete = (id) => {
    deleteData(
      { id },
      {
        onSuccess: (response) => {
          if (response && response.status === 200) {
            toast.success('Delete berhasil!');
            location.reload();
          }
        },
        onError: (error) => {
          console.error('Delete error:', error);
          toast.error('Delete gagal!');
        },
      }
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Nama
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Dibuat pada
            </th>
            <th scope="col" className="px-6 py-3">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((admin, index) => (
              <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <td className="px-6 py-4">{admin.id}</td>
                <td className="px-6 py-4">{admin.nama}</td>
                <td className="px-6 py-4">{admin.email}</td>
                <td className="px-6 py-4">{new Date(admin.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <button onClick={() => showDeleteAlert(admin.id)} className="text-white bg-red-500 text-sm p-2 rounded-lg">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
