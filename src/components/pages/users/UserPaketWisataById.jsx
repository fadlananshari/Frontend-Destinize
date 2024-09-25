import { useParams } from 'react-router-dom';
import NavbarUser from '../../materials/NavbarUser';
import { useDataPaketWisataById } from '../../../features/useDataPaketWisataById';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import Footer from '../../molecules/Footer';
import { useDataGaleriByIdPaket } from './../../../features/useDataGaleriByIdPaket';
import { useDataCreateReservasiByIdPaket } from '../../../features/useDataCreateReservasiByIdPaket';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaCircle, FaShare, FaCamera } from 'react-icons/fa';
import { BiSolidPlaneAlt } from 'react-icons/bi';
import { MdContentCopy } from 'react-icons/md';

const UserPaketWisataById = ({ isUserLoggedIn }) => {
  const { id } = useParams();
  const { dataPaketWisataById, isLoading } = useDataPaketWisataById(id);
  const [data, setData] = useState(null);
  const { dataGaleriByIdPaket } = useDataGaleriByIdPaket(id);
  const [dataGaleri, setDataGaleri] = useState(null);
  const [hidden, setHidden] = useState(true);

  const [inputValue, setInputValue] = useState({
    nama: '',
    tujuan: '',
    no_telp: '',
    jml_peserta: '',
    waktu_perjalanan: '',
    penginapan: false,
    transportasi: false,
    makanan: false,
    harga: '',
    jml_tagihan: '',
    sudah_bayar: '',
    bukti_bayar: ''
  });

  const [selectedServices, setSelectedServices] = useState({
    penginapan: false,
    transportasi: false,
    makanan: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isAtLeastOneServiceChecked, setIsAtLeastOneServiceChecked] = useState(false);

  useEffect(() => {
    const { nama, no_telp, jml_peserta, waktu_perjalanan } = inputValue;
    const isValid = nama && no_telp && jml_peserta && waktu_perjalanan;
    setIsFormValid(isValid);
  }, [inputValue]);

  useEffect(() => {
    const isAnyServiceChecked = Object.values(selectedServices).includes(true);
    setIsAtLeastOneServiceChecked(isAnyServiceChecked);
  }, [selectedServices]);

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

  const { mutate: createData } = useDataCreateReservasiByIdPaket();

  const handleChange = (e, field) => {
    setInputValue((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const showCreateAlert = () => {
    Swal.fire({
      title: 'Apakah anda yakin ingin memesan?',
      showDenyButton: true,
      confirmButtonText: 'Ya',
      denyButtonText: 'Tidak',
      customClass: {
        denyButton: 'bg-red-500 hover:bg-red-600',
        confirmButton: 'bg-blue-500 hover:bg-blue-600',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleCreate();
      }
    });
  };

  const handleCreate = () => {
    console.log(inputValue);
    createData(
      { id_paket: id, body: inputValue },
      {
        onSuccess: (response) => {
          if (response && response.status === 201) {
            setInputValue({
              nama: '',
              no_telp: '',
              jml_peserta: '',
              waktu_perjalanan: '',
              harga: '',
              jml_tagihan: '',
              sudah_bayar: '0',
            });

            location.href = '/pesanan';
          }
        },
        onError: (error) => {
          console.error('Create error:', error);
          toast.error('Pesanan gagal!');
        },
      }
    );
  };

  useEffect(() => {
    if (dataGaleriByIdPaket) {
      setDataGaleri(dataGaleriByIdPaket.data);
    }
  }, [dataGaleriByIdPaket]);

  useEffect(() => {
    if (!isLoading && dataPaketWisataById) {
      setData(dataPaketWisataById.data);
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        tujuan: dataPaketWisataById.data[0].nama,
      }));
    }
  }, [isLoading, dataPaketWisataById]);

  const [hiddenReservasi, setHiddenReservasi] = useState(false);
  const [hiddenTagihan, setHiddenTagihan] = useState(true);

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
    setHiddenReservasi((prevHiddenReservasi) => !prevHiddenReservasi);
    setHiddenTagihan((prevHiddenTagihan) => !prevHiddenTagihan);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success('Tautan telah disalin!');
      })
      .catch((error) => {
        console.error('Error copying text: ', error);
      });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Share This Page',
          text: 'Check out this awesome page!',
          url: window.location.href,
        });
        console.log('Page shared successfully');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  const reservasiHandle = () => {
    if (isUserLoggedIn) {
      setHidden((prevHidden) => !prevHidden);
    } else {
      Swal.fire({
        title: 'Login terlebih dahulu',
        showDenyButton: true,
        confirmButtonText: 'Login',
        denyButtonText: 'Batal',
        customClass: {
          denyButton: 'bg-red-500 hover:bg-red-600',
          confirmButton: 'bg-blue-500 hover:bg-blue-600',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = '/login';
        }
      });
    }
  };

  if (isLoading || data == null) {
    return <Loading />;
  }

  return (
    <>
      <NavbarUser isUserLoggedIn={isUserLoggedIn} />
      <div className="container mx-auto px-4 mt-20 md:mt-28">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        {data &&
          data.map((data, index) => (
            <>
              <div className="mt-14">
                <p className="my-auto mb-2 text-xs md:text-sm xl:text-base">
                  <a href="/" className="hover:text-blue-500">
                    Beranda
                  </a>{' '}
                  /{' '}
                  <a href="/paket-wisata" className="hover:text-blue-500">
                    Paket Wisata
                  </a>{' '}
                  /{' '}
                  <a href={`/paket-wisata/${data.id}`} className="hover:text-blue-500">
                    {data.nama}
                  </a>
                </p>
              </div>

              <h3 className="text-sm md:text-lg font-semibold text-blue-500 mt-10">DESTINASI</h3>

              <h2 className="flex text-xl md:text-4xl font-bold mt-3">
                <BiSolidPlaneAlt className="text-blue-500 my-auto" />
                <FaCircle size={7} className="my-auto mx-1" />
                Sekilas Tentang {data.nama}
              </h2>

              <div key={index} className="grid lg:grid-flow-col gap-10 mt-10 mb-20">
                <img src={`https://destinize-api-04aae1968d23.herokuapp.com/assets/${data.foto}`} className="" alt="" />
                <div>
                  <p className="text-justify">{data.deskripsi}</p>
                </div>
              </div>
            </>
          ))}
        <div className="mb-20">
          <div className="mb-5">
            <h3 className="text-sm md:text-lg font-semibold text-blue-500">GALLERY FOTO</h3>
            <h1 className="flex text-lg lg:text-4xl font-bold mt-3">
              <FaCamera className="text-blue-500 my-auto" />
              <FaCircle size={7} className="my-auto mx-2" />
              Temukan keindahan destinasi ini!
            </h1>
          </div>
          <div className="gallery mb-10">
            {dataGaleri &&
              dataGaleri.map((data, index) => (
                <div key={index} className="layout">
                  <img src={`https://destinize-api-04aae1968d23.herokuapp.com/assets/${data.gambar}`} alt="" className="" />
                </div>
              ))}
          </div>
          <div className="flex gap-3 lg:gap-5 w-max ml-auto">
            <button onClick={handleCopy} className="text-base lg:text-xl hover:text-blue-500 duration-300">
              <MdContentCopy />
            </button>
            <button onClick={handleShare} className="text-base lg:text-xl hover:text-blue-500 duration-300">
              <FaShare />
            </button>
          </div>
        </div>

        <div className="max-w-lg mx-auto mt-5">
          <div className="flex justify-center">
            <button onClick={() => reservasiHandle()} className={`w-full transition duration-300 ease-in-out transform hover:scale-105 ${hidden ? 'bg-blue-500' : 'bg-red-500'} text-white rounded-lg px-4 py-2 shadow-md`}>
              {hidden ? 'Buat Reservasi' : 'Batal'}
            </button>
          </div>

          <div id="reservasi" className={`transition-all duration-500 ease-in-out overflow-hidden ${hidden ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100'}`}>
            <div className="mt-4 p-4 border rounded-lg shadow-lg bg-white">
              <div className={hiddenReservasi ? 'hidden' : ''}>
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
              </div>

              <button
                onClick={() => jumlahTagihan()}
                className={`${hiddenTagihan == '' ? '' : 'w-full mt-5'} bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ${isFormValid && isAtLeastOneServiceChecked ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
                disabled={!isFormValid || !isAtLeastOneServiceChecked}
              >
                {hiddenTagihan == '' ? 'Kembali' : 'Lanjutkan'}
              </button>
              <div className={hiddenTagihan ? 'hidden' : 'mt-5'}>
                <div className="flex justify-between">
                  <p>harga: </p>
                  <p id="harga">{inputValue.harga}</p>
                </div>
                <div className="flex justify-between">
                  <p>jumlah tagihan: </p>
                  <p id="jml_tagihan">{inputValue.jml_tagihan}</p>
                </div>
                <button onClick={showCreateAlert} className="bg-blue-500 mt-5 text-white px-4 py-2 rounded-lg w-full shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                  Pesan
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default UserPaketWisataById;
