import { useEffect, useState } from 'react';
import { useDataAllPesanan } from '../../features/useDataAllPesanan';
import Loading from '../pages/Loading';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import { useDataUpdateStatusPesanan } from './../../features/useDataUpdateStatusPesanan';

const PesananTable = () => {
  const { dataPesanan, isLoading } = useDataAllPesanan();
  const [data, setData] = useState(null);

  const { mutate: updateData } = useDataUpdateStatusPesanan();

  useEffect(() => {
    if (!isLoading && dataPesanan) {
      setData(dataPesanan.data);
    }
  }, [isLoading, dataPesanan]);

  const showUpdateAlert = (id) => {
    Swal.fire({
      title: 'Apakah anda yakin ingin mengubah status data ini?',
      showDenyButton: true,
      confirmButtonText: 'Ya',
      denyButtonText: 'Tidak',
      customClass: {
        confirmButton: 'bg-blue-500 hover:bg-blue-600',
        denyButton: 'bg-red-500 hover:bg-red-600',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdateStatus(id);
      }
    });
  };

  const handleUpdateStatus = (id) => {
    updateData(
      { id },
      {
        onSuccess: (response) => {
          if (response && response.status === 200) {
            toast.success('Update berhasil!');
            location.reload();
          }
        },
        onError: (error) => {
          console.error('Update error:', error);
          toast.error('Update gagal!');
        },
      }
    );
  };

  if (isLoading || data == null) {
    return <Loading />;
  }

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
              Nama
            </th>
            <th scope="col" className="px-6 py-3">
              Tujuan
            </th>
            <th scope="col" className="px-6 py-3">
              No Telepon
            </th>
            <th scope="col" className="px-6 py-3">
              Penginapan
            </th>
            <th scope="col" className="px-6 py-3">
              Transportasi
            </th>
            <th scope="col" className="px-6 py-3">
              Makanan
            </th>
            <th scope="col" className="px-6 py-3">
              Perjalanan
            </th>
            <th scope="col" className="px-6 py-3">
              Harga Paket
            </th>
            <th scope="col" className="px-6 py-3">
              Total Tagihan
            </th>
            <th scope="col" className="px-6 py-3">
              Bukti Bayar
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((data, index) => (
              <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <td className="px-6 py-4">{data.nama}</td>
                <td className="px-6 py-4">{data.tujuan}</td>
                <td className="px-6 py-4">{data.no_telp}</td>
                <td className="px-6 py-4">{data.penginapan ? 'Ya' : 'Tidak'}</td>
                <td className="px-6 py-4">{data.transportasi ? 'Ya' : 'Tidak'}</td>
                <td className="px-6 py-4">{data.makanan ? 'Ya' : 'Tidak'}</td>
                <td className="px-6 py-4">{data.waktu_perjalanan} Hari</td>
                <td className="px-6 py-4">{data.harga}</td>
                <td className="px-6 py-4">{data.jml_tagihan}</td>
                <td className="px-6 py-4">
                  {data.bukti_bayar ? (
                    <a href={`https://destinize-api-04aae1968d23.herokuapp.com/assets/${data.bukti_bayar}`} className="bg-blue-500 text-sm text-white p-2 rounded-lg">
                      Lihat
                    </a>
                  ) : (
                    'Belum Upload'
                  )}
                </td>
                <td className={`px-6 py-4 font-semibold ${data.sudah_bayar ? 'text-green-500' : 'text-red-500'}`}>{data.sudah_bayar ? 'Lunas' : 'Belum Lunas'}</td>
                <td className="px-6 py-4">
                  <button onClick={() => showUpdateAlert(data.id)} className="text-white bg-blue-500 text-sm p-2 rounded-lg">
                    Konfirmasi
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PesananTable;
