import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../pages/Loading';
import Swal from 'sweetalert2';
import { useDataAllPaketWisata } from '../../features/useDataAllPaketWisata';
import { useDataAllGallery } from './../../features/useDataAllGallery';
import { useDataDeleteGaleriById } from './../../features/useDataDeleteGaleriById';

const GaleryTable = () => {
  const { dataPaketWisata, isLoading } = useDataAllPaketWisata();
  const [data, setData] = useState(null);

  const { dataGallery } = useDataAllGallery();
  const [dataAllGallery, setDataAllGallery] = useState(null);

  const deleteData = useDataDeleteGaleriById();

  useEffect(() => {
    if (dataGallery) {
      setDataAllGallery(dataGallery.data);
    }
  }, [dataGallery]);

  useEffect(() => {
    if (!isLoading && dataPaketWisata) {
      setData(dataPaketWisata.data);
      // console.log(dataUser.data);
      // console.log(data)
    }
  }, [isLoading, dataPaketWisata]);

  const showDeleteAlert = (id, fileName) => {
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
        handleDelete(id, fileName);
      }
    });
  };

  const handleDelete = (id, fileName) => {
    deleteData(
      { id, fileName },
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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Paket
              </th>
              <th scope="col" className="px-6 py-3">
                Galeri
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
  {data &&
    data.map((dataItem, index) => (
      <tr key={dataItem.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {index + 1}
        </th>
        <td className="px-6 py-4">{dataItem.nama}</td>
        <td className="px-6 py-4">
          <div className="grid grid-flow-row gap-3">
            {dataAllGallery &&
              dataAllGallery
                .filter((dataGallery) => dataItem.id === dataGallery.id_paket)
                .map((dataGallery) => (
                  <div key={dataGallery.id} className="md:flex gap-3">
                    <img
                      src={`https://destinize-api-04aae1968d23.herokuapp.com/assets/${dataGallery.gambar}`}
                      className="sm:h-52 w-auto object-cover"
                      alt={dataGallery.gambar}
                    />
                    <button onClick={() => showDeleteAlert(dataGallery.id, dataGallery.gambar)} className="h-max my-auto bg-red-500 text-white p-2 rounded-lg">
                      <MdDelete className="m-auto text-lg" />
                    </button>
                  </div>
                ))}
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <button className="bg-blue-500 rounded-lg py-2 px-4 text-lg text-white">
            <a href={`/admin/galeri/tambah/${dataItem.id}`}>Tambah</a>
          </button>
        </td>
      </tr>
    ))}
</tbody>

        </table>
      </div>
    </>
  );
};

export default GaleryTable;
