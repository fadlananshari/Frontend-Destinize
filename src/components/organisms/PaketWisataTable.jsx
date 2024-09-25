import { useEffect, useState } from 'react';
import { useDataAllPaketWisata } from '../../features/useDataAllPaketWisata';
import Loading from '../pages/Loading';
import { MdDelete, MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import { useDataDeletePaketWisata } from '../../features/useDataDeletePaketWisata';
import TruncatedText from '../molecules/TruncatedText';

const PaketWisataTable = () => {
  const { dataPaketWisata, isLoading } = useDataAllPaketWisata();
  const [data, setData] = useState(null);

  const deleteData = useDataDeletePaketWisata();

  useEffect(() => {
    if (!isLoading && dataPaketWisata) {
      setData(dataPaketWisata.data);
    }
  }, [isLoading, dataPaketWisata]);

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

  if (isLoading || data == null) {
    <Loading />;
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <table className="w-full text-sm text-justify rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Paket
              </th>
              <th scope="col" className="px-6 py-3">
                Deskripsi
              </th>
              <th scope="col" className="px-6 py-3">
                Lokasi
              </th>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((data, index) => (
                <>
                  <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{data.nama}</td>
                    <td className="px-6 py-4 w-96 overflow-hidden">
                      <TruncatedText text={data.deskripsi} maxLength={100} />
                    </td>
                    <td className="px-6 py-4">{data.lokasi}</td>
                    <td className="px-6 py-4">
                      {data.foto ? (
                        <img src={`https://destinize-api-04aae1968d23.herokuapp.com/assets/${data.foto}`} alt="" className="w-36 h-auto object-cover" />
                      ) : (
                        <button>
                          <a href={`/admin/paket-wisata/tambah-foto/${data.id}`} className="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                            Upload
                          </a>
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button className="bg-green-500 rounded-lg p-2 text-lg text-white">
                          <a href={`/admin/paket-wisata/${data.id}/review`}>
                            <MdEdit className="m-auto" />
                          </a>
                        </button>
                        <button onClick={() => showDeleteAlert(data.id)} className="bg-red-500 text-white p-2 rounded-lg">
                          <MdDelete className="m-auto text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaketWisataTable;
