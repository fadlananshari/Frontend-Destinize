import { useState } from 'react';
import { useDataCreatePaketWisata } from '../../../features/useDataCreatePaketWisata';
import NavbarAdmin from '../../materials/NavbarAdmin';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import ButtonCustom from '../../atoms/ButtonCustom';

const PaketWisataTambah = () => {
  const [inputValue, setInputValue] = useState({
    nama: '',
    deskripsi: '',
    lokasi: '',
    foto: '',
  });
  const { mutate: createData } = useDataCreatePaketWisata();

  const handleChange = (e, field) => {
    setInputValue((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const showCreateAlert = () => {
    Swal.fire({
      title: 'Apakah anda yakin ingin menambahkan data ini?',
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
    createData(
      { body: inputValue },
      {
        onSuccess: (response) => {
          if (response && response.status === 201) {
            toast.success('Create berhasil!');
            setInputValue({
              nama: '',
              deskripsi: '',
              lokasi: '',
              foto: '',
            });
          }
        },
        onError: (error) => {
          console.error('Create error:', error);
          toast.error('Create gagal!');
        },
      }
    );
  };

  return (
    <>
      <NavbarAdmin />
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg mt-14">
          <p className="mb-5">
            Admin /{' '}
            <a href="/admin/paket-wisata" className="hover:border-b border-blue-500 hover:text-blue-500">
              Paket Wisata
            </a>{' '}
            /{' '}
            <a href="/admin/paket-wisata/tambah" className="hover:border-b border-blue-500 hover:text-blue-500">
              Tambah
            </a>
          </p>
          <ButtonCustom link="/admin/paket-wisata" nama="Kembali" bgColor="blue-500" />

          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nama Paket
                </th>
                <th scope="col" className="px-6 py-3">
                  Deskripsi
                </th>
                <th scope="col" className="px-6 py-3">
                  Lokasi
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Foto
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">
                  <input id="nama" type="text" className="border-1 rounded-md" value={inputValue.nama} onChange={(e) => handleChange(e, 'nama')} placeholder="Nama" />
                </td>
                <td className="px-6 py-4">
                  <input id="deskripsi" type="text" className="border-1 rounded-md" value={inputValue.deskripsi} onChange={(e) => handleChange(e, 'deskripsi')} placeholder="Deskripsi" />
                </td>
                <td className="px-6 py-4">
                  <input id="lokasi" type="text" className="border-1 rounded-md" value={inputValue.lokasi} onChange={(e) => handleChange(e, 'lokasi')} placeholder="Lokasi" />
                </td>
                {/* <td className="px-6 py-4">
                  <input
                    id="foto"
                    type="text"
                    className="border-1 rounded-md"
                    value={inputValue.foto}
                    onChange={(e) => handleChange(e, 'foto')}
                    placeholder="Foto"
                  />
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Upload file here
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </td> */}
                <td className="px-6 py-4">
                  <div className="grid grid-flow-col gap-3">
                    <button onClick={showCreateAlert} className="bg-blue-500 text-white px-1 py-2 rounded-lg">
                      Tambah
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaketWisataTambah;
