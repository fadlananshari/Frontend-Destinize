import { useEffect, useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import NavbarUser from '../../materials/NavbarUser';
import { useDataPesananById } from '../../../features/useDataPesananById';
import Loading from '../Loading';
import Swal from 'sweetalert2';
import { useDataUpdateReservasi } from '../../../features/useDataUpdateReservasi';

const PesananEditUser = ({ isUserLoggedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const { dataPesanan, isLoading } = useDataPesananById(id);
  const [data, setData] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [hiddenTagihan, setHiddenTagihan] = useState(true);

  const { mutate: updateData } = useDataUpdateReservasi();

  const [inputValue, setInputValue] = useState({
    nama: '',
    tujuan: '',
    no_telp: '',
    jml_peserta: '',
    waktu_perjalanan: '',
    penginapan: false,
    transportasi: false,
    makanan: false,
    harga: false,
    jml_tagihan: '',
    sudah_bayar: '',
  });

  const [selectedServices, setSelectedServices] = useState({
    penginapan: false,
    transportasi: false,
    makanan: false,
  });

  useEffect(() => {
    if (!isLoading && dataPesanan) {
      setData(dataPesanan.data);
      setInputValue({
        nama: dataPesanan.data[0].nama,
        tujuan: dataPesanan.data[0].tujuan,
        no_telp: dataPesanan.data[0].no_telp,
        jml_peserta: dataPesanan.data[0].jml_peserta,
        waktu_perjalanan: dataPesanan.data[0].waktu_perjalanan,
        penginapan: dataPesanan.data[0].penginapan,
        transportasi: dataPesanan.data[0].transportasi,
        makanan: dataPesanan.data[0].makanan,
        harga: dataPesanan.data[0].harga,
        jml_tagihan: dataPesanan.data[0].jml_tagihan,
        sudah_bayar: dataPesanan.data[0].sudah_bayar,
      });
      setSelectedServices({
        penginapan: dataPesanan.data[0].penginapan,
        transportasi: dataPesanan.data[0].transportasi,
        makanan: dataPesanan.data[0].makanan,
      });
    }
  }, [isLoading, dataPesanan]);

  const handleChange = (e, field) => {
    setInputValue((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedServices((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: checked,
    }));
  };

  const jumlahTagihan = () => {
    const jmlPeserta = inputValue.jml_peserta;
    const waktuPerjalanan = inputValue.waktu_perjalanan;
    const makanan = selectedServices.makanan ? 500000 : 0;
    const penginapan = selectedServices.penginapan ? 1000000 : 0;
    const transportasi = selectedServices.transportasi ? 1200000 : 0;

    const harga = makanan + penginapan + transportasi;
    const hargaRupiah = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(harga);

    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      harga: hargaRupiah,
    }));

    const tagihan = jmlPeserta * waktuPerjalanan * harga;
    const tagihanRupiah = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(tagihan);
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      jml_tagihan: tagihanRupiah,
    }));
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      sudah_bayar: 0,
    }));
    setHidden((prev) => !prev);
    setHiddenTagihan((prevHiddenTagihan) => !prevHiddenTagihan);
  };

  const showUpdateAlert = () => {
    Swal.fire({
      title: 'Apakah anda yakin ingin mengubah pesanan ini?',
      showDenyButton: true,
      confirmButtonText: 'Ya',
      denyButtonText: 'Tidak',
      customClass: {
        confirmButton: 'bg-blue-500 hover:bg-blue-600',
        denyButton: 'bg-red-500 hover:bg-red-600',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdate();
      }
    });
  };

  const handleUpdate = () => {
    updateData(
      { id, body: inputValue },
      {
        onSuccess: (response) => {
          if (response) {
            navigate('/pesanan'); // Navigasi setelah sukses update
          }
        },
        onError: (error) => {
          console.error('Update error:', error);
        },
      }
    );
  };

  if (isLoading && data == null) {
    <Loading />;
  }

  return (
    <>
      <NavbarUser isUserLoggedIn={isUserLoggedIn} />
      <div className="container mx-auto px-4 mt-20 md:mt-28">
        <p className="my-auto mb-10 text-xs md:text-sm xl:text-base">
          <a href="/" className="hover:text-blue-500">
            Beranda
          </a>{' '}
          /{' '}
          <a href="/pesanan" className="hover:text-blue-500">
            Pesanan
          </a>{' '}
          /{' '}
          <a href={`/pesanan/edit/${id}`} className="hover:text-blue-500">
            Edit
          </a>
        </p>
        {data && (
          <>
            {/* Bagian Reservasi */}
            <div id="reservasi" className={`transition-all duration-500 ease-in-out overflow-hidden ${hidden ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100'}`}>
              <div className="max-w-3xl mx-auto bg-white shadow-lg p-5 rounded-xl">
                <input type="text" id="nama" className="border border-gray-300 rounded-md w-full p-2 mb-3" value={inputValue.nama} onChange={(e) => handleChange(e, 'nama')} placeholder="Masukkan nama Anda" />
                <input
                  type="text"
                  inputMode="numeric"
                  id="no_telp"
                  className="border border-gray-300 rounded-md w-full p-2 mb-3"
                  value={inputValue.no_telp}
                  onChange={(e) => handleChange(e, 'no_telp')}
                  placeholder="Masukkan nomor telepon Anda"
                />

                <div className="flex gap-4">
                  <input
                    type="number"
                    id="jml_peserta"
                    min="1"
                    className="border border-gray-300 rounded-md w-full p-2 mb-3"
                    value={inputValue.jml_peserta}
                    onChange={(e) => handleChange(e, 'jml_peserta')}
                    placeholder="Jumlah peserta yang ikut"
                  />
                  <p className="my-auto">Orang</p>
                </div>
                <div className="flex gap-4">
                  <input
                    type="number"
                    id="waktu_perjalanan"
                    min="1"
                    className="border border-gray-300 rounded-md w-full p-2 mb-3"
                    value={inputValue.waktu_perjalanan}
                    onChange={(e) => handleChange(e, 'waktu_perjalanan')}
                    placeholder="Berapa lama waktu perjalanan anda"
                  />
                  <p className="my-auto">Hari</p>
                </div>
                <div>
                  <h2 className="text-lg font-bold mb-4">Pilih Layanan:</h2>
                  <div className="mb-2">
                    <label className="flex items-center">
                      <input type="checkbox" name="penginapan" checked={selectedServices.penginapan} onChange={handleCheckboxChange} className="form-checkbox h-5 w-5 text-blue-600" />
                      <span className="ml-2">Penginapan</span>
                    </label>
                  </div>
                  <div className="mb-2">
                    <label className="flex items-center">
                      <input type="checkbox" name="transportasi" checked={selectedServices.transportasi} onChange={handleCheckboxChange} className="form-checkbox h-5 w-5 text-blue-600" />
                      <span className="ml-2">Transportasi</span>
                    </label>
                  </div>
                  <div className="mb-2">
                    <label className="flex items-center">
                      <input type="checkbox" name="makanan" checked={selectedServices.makanan} onChange={handleCheckboxChange} className="form-checkbox h-5 w-5 text-blue-600" />
                      <span className="ml-2">Makanan</span>
                    </label>
                  </div>
                </div>
                <button onClick={jumlahTagihan} className="w-full mt-5 bg-blue-500 text-white px-4 py-2 rounded-md">
                  Lanjutkan
                </button>
              </div>
            </div>

            {/* Bagian Tagihan */}
            <div id="tagihan" className={`transition-all duration-500 ease-in-out overflow-hidden ${hiddenTagihan ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100'}`}>
              <div className="max-w-3xl mx-auto bg-white shadow-lg p-5 rounded-xl">
                <button onClick={jumlahTagihan} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Kembali
                </button>
                <h1 className="text-center text-2xl font-bold mb-5">Total Tagihan</h1>
                <div className="grid grid-flow-col grid-cols-2">
                  <p>Harga</p>
                  <p>: {inputValue.harga}</p>
                </div>
                <div className="grid grid-flow-col grid-cols-2">
                  <p>Jumlah Tagihan</p>
                  <p>: {inputValue.jml_tagihan}</p>
                </div>
                {/* <p>Sudah Bayar: {inputValue.sudah_bayar}</p> */}
                <button onClick={showUpdateAlert} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                  Ubah
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PesananEditUser;
