import { useNavigate, useParams } from 'react-router-dom';
import NavbarAdmin from '../../materials/NavbarAdmin';
import { useDataPaketWisataById } from '../../../features/useDataPaketWisataById';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import ButtonCustom from '../../atoms/ButtonCustom';
import { useDataUpdatePaketWisata } from '../../../features/useDataUpdatePaketWisata';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosBaseUrl } from '../../lib/axios';

const PaketWisataById = () => {
  const { id } = useParams();
  const { dataPaketWisataById, isLoading } = useDataPaketWisataById(id);
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState({
    nama: '',
    deskripsi: '',
    lokasi: '',
    foto: '',
  });

  const navigate = useNavigate();

  const { mutate: updateData } = useDataUpdatePaketWisata();

  useEffect(() => {
    if (!isLoading && dataPaketWisataById) {
      setData(dataPaketWisataById.data);
      setInputValue({
        nama: dataPaketWisataById.data[0].nama,
        deskripsi: dataPaketWisataById.data[0].deskripsi,
        lokasi: dataPaketWisataById.data[0].lokasi,
        foto: dataPaketWisataById.data[0].foto,
      });
    }
  }, [isLoading, dataPaketWisataById]);

  const handleChange = (e, field) => {
    setInputValue({
      ...inputValue,
      [field]: e.target.value,
    });
  };

  const showUpdateAlert = () => {
    Swal.fire({
      title: 'Apakah anda yakin ingin mengubah data ini?',
      showDenyButton: true,
      confirmButtonText: 'Ya',
      denyButtonText: 'Tidak',
      customClass: {
        confirmButton: 'bg-blue-500 hover:bg-blue-600',
        denyButton: 'bg-red-500 hover:bg-red-600',
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleUpdate();
      }
    });
  };

  const showDeleteAlert = (fileName) => {
    Swal.fire({
      title: 'Apakah anda yakin ingin menghapus foto ini?',
      showDenyButton: true,
      confirmButtonText: 'Ya',
      denyButtonText: 'Tidak',
      customClass: {
        confirmButton: 'bg-blue-500 hover:bg-blue-600',
        denyButton: 'bg-red-500 hover:bg-red-600',
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteFoto(fileName);
      }
    });
  };

  const handleUpdate = () => {
    updateData(
      { id, body: inputValue },
      {
        onSuccess: (response) => {
          if (response && response.status === 200) {
            toast.success('Update berhasil!');
            navigate('/admin/paket-wisata');
          }
        },
        onError: (error) => {
          console.error('Update error:', error);
          toast.error('Update gagal!');
        },
      }
    );
  };

  const deleteFoto = async (fileName) => {
    try {
      const response = await axiosBaseUrl.delete(`paket-wisata/${id}/file/${fileName}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });
      // const data = response;
      // console.log(data);
      if (response.status == 200) {
        toast.success('Delete berhasil!');
        navigate('/admin/paket-wisata');
      } else {
        toast.error('Delete gagal!');
      }
    } catch (error) {
      console.error('Error delete file:', error);
      toast.error('Delete gagal!');
    }
  };

  if (isLoading || data == null) {
    return <Loading />;
  }

  return (
    <>
      <NavbarAdmin />
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg mt-14">
          <p className="mb-5">
            Admin /{' '}
            <a href="/admin/paket-wisata" className="hover:border-b border-blue-500 hover:text-blue-500">
              Paket Wisata{' '}
            </a>
            /{' '}
            <a href={`/admin/paket-wisata/${id}/review`} className="hover:border-b border-blue-500 hover:text-blue-500">
              Review
            </a>
          </p>
          <ButtonCustom link="/admin/paket-wisata" nama="Kembali" bgColor="blue-500" />
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
          {data && (
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
                  <th scope="col" className="px-6 py-3">
                    Foto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">
                    <input type="text" className="border-1 rounded-md" value={inputValue.nama} onChange={(e) => handleChange(e, 'nama')} />
                  </td>
                  <td className="px-6 py-4">
                    <textarea className="border-1 rounded-md w-96 h-96" value={inputValue.deskripsi} onChange={(e) => handleChange(e, 'deskripsi')} />
                  </td>
                  <td className="px-6 py-4">
                    <input type="text" className="border-1 rounded-md" value={inputValue.lokasi} onChange={(e) => handleChange(e, 'lokasi')} />
                  </td>
                  <td className="px-6 py-4">
                    {/* <input type="text" className="border-1 rounded-md" value={inputValue.foto} onChange={(e) => handleChange(e, 'foto')} /> */}
                    {inputValue.foto ? (
                      <>
                        {/* <p className="mb-2">{inputValue.foto}</p> */}
                        <img src={`http://localhost:5000/assets/${inputValue.foto}`} alt="" className='w-full'/>
                        <button onClick={() => showDeleteAlert(inputValue.foto)} className="mx-auto py-2 px-3 rounded-lg text-white bg-red-500">
                          Hapus
                        </button>
                      </>
                    ) : (
                      // <ButtonCustom link={`/admin/paket-wisata/tambah-foto/${id}`} nama="Upload Foto" bgColor="blue-500" />
                      <a href={`/admin/paket-wisata/tambah-foto/${id}`} className="mx-auto py-2 px-3 rounded-lg text-white bg-blue-500">
                        Upload
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => showUpdateAlert()} className="bg-blue-500 text-white px-3 py-2 rounded-lg">
                      Ubah
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default PaketWisataById;
