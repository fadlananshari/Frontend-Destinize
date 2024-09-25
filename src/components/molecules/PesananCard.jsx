import Swal from 'sweetalert2';
import { useDataDeletePesanan } from '../../features/useDataDeletePesanan';

const PesananCard = ({ data }) => {
  const handlePesan = (id) => {
    location.href = `/paket-wisata/${id}`;
  };

  const handleUpload = (id) => {
    location.href = `/pesanan/upload/${id}`;
  };

  const handleEdit = (id) => {
    location.href = `/pesanan/edit/${id}`;
  };

  const deleteData = useDataDeletePesanan();

  const showDeleteAlert = (id) => {
    Swal.fire({
      title: 'Apakah anda yakin ingin menghapus pesanan ini?',
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
            location.reload();
          }
        },
        onError: (error) => {
          console.error('Delete error:', error);
        },
      }
    );
  };

  return (
    <div className="max-w-md h-max rounded-xl overflow-hidden shadow-lg transform transition-all hover:shadow-xl p-6">
      <div className="flex justify-center mb-6 bg-blue-500 text-white py-2 rounded-md">
        <h2 className="font-semibold text-2xl uppercase">{data.tujuan}</h2>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-1">
        <p className="text-lg font-semibold">Nama</p>
        <p className="text-lg">: {data.nama}</p>

        <p className="text-lg font-semibold">Jumlah Peserta</p>
        <p className="text-lg">: {data.jml_peserta}</p>

        <p className="text-lg font-semibold">Waktu Perjalanan</p>
        <p className="text-lg">: {data.waktu_perjalanan} hari</p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-1">
        <p className="text-lg font-semibold">Penginapan</p>
        <p className="text-lg">: {data.penginapan === 1 ? 'Termasuk' : 'Tidak Termasuk'}</p>

        <p className="text-lg font-semibold">Transportasi</p>
        <p className="text-lg">: {data.transportasi === 1 ? 'Termasuk' : 'Tidak Termasuk'}</p>

        <p className="text-lg font-semibold">Makanan</p>
        <p className="text-lg">: {data.makanan === 1 ? 'Termasuk' : 'Tidak Termasuk'}</p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-1">
        <p className="text-lg font-semibold">Harga Paket</p>
        <p className="text-lg font-semibold">: {data.harga}</p>
        <p className="text-lg font-semibold">Jumlah Tagihan</p>
        <p className="text-lg font-semibold">: {data.jml_tagihan}</p>
        <p className="text-lg font-semibold">Status</p>
        <p>
          :{' '}
          <span className={`w-max px-3 py-1 rounded-full text-white text-sm ${data.sudah_bayar === 1 ? 'bg-green-500' : data.bukti_bayar ? 'bg-blue-500' : 'bg-red-500'}`}>
            {data.sudah_bayar === 1 ? 'Lunas' : data.bukti_bayar ? 'On Review' : 'Belum Bayar'}
          </span>
        </p>
        <p className="text-lg font-semibold">Bukti</p>
        {data.bukti_bayar ? (
          <p className="mt-2">
            :{' '}
            <a href={`https://destinize-api-04aae1968d23.herokuapp.com/assets/${data.bukti_bayar}`} className="w-max text-sm bg-blue-500 text-white p-2 rounded-md">
              Lihat
            </a>
          </p>
        ) : (
          <p>
            :{' '}
            <button onClick={() => handleUpload(data.id)} className="text-sm w-max p-2 rounded-md bg-blue-500 text-white">
              Upload
            </button>
          </p>
        )}
      </div>

      {data.sudah_bayar === 1 ? (
        <button onClick={() => handlePesan(data.id_paket)} className="bg-blue-500 px-4 py-2 rounded-lg text-white mb-5 w-full">
          Pesan lagi
        </button>
      ) : (
        <div className="grid grid-flow-col gap-2 mb-5">
          <button
            onClick={() => handleEdit(data.id)}
            disabled={data.sudah_bayar == 0 && data.bukti_bayar !== ''}
            className={`${data.sudah_bayar == 0 && data.bukti_bayar !== '' ? 'opacity-50 cursor-not-allowed' : ''} bg-green-500 px-4 py-2 rounded-lg text-white`}
          >
            Edit
          </button>
          <button onClick={() => showDeleteAlert(data.id)} className="bg-red-500 px-4 py-2 rounded-lg text-white">
            Batal
          </button>
        </div>
      )}
    </div>
  );
};

export default PesananCard;
