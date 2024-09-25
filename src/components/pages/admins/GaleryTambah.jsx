import NavbarAdmin from '../../materials/NavbarAdmin';
import { toast, ToastContainer } from 'react-toastify';
import ButtonCustom from '../../atoms/ButtonCustom';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { axiosBaseUrl } from '../../lib/axios';

const GaleryTambah = () => {
  const { id } = useParams();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const showUploadAlert = () => {
    Swal.fire({
      title: 'Apakah anda yakin ingin mengunggah foto ini?',
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
        uploadFoto();
      }
    });
  };
  const uploadFoto = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('photo', selectedFile);

    try {
      const response = await axiosBaseUrl.post(`galeri/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });
      //   const data = response.data;
      console.log(response);
      if (response.status == 201) {
        toast.success('Upload berhasil!');
      } else {
        toast.error('Upload gagal!');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Upload gagal!');
    }
  };
  return (
    <>
      <NavbarAdmin />
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg mt-14">
          <div className="flex justify-between">
            <p className="mb-5">
              Admin /{' '}
              <a href="/admin/galeri" className="hover:border-b border-blue-500 hover:text-blue-500">
                Galeri
              </a>{' '}
              /{' '}
              <a href="/admin/galeri/tambah" className="hover:border-b border-blue-500 hover:text-blue-500">
                Tambah
              </a>
            </p>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <ButtonCustom link="/admin/galeri" nama="Kembali" bgColor="blue-500" />
          </div>

          <label className="block mb-2 font-medium text-gray-900 dark:text-white" htmlFor="default_size">
            Unggah Foto
          </label>
          <input className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="default_size" type="file" onChange={handleFileChange} />
          <button onClick={() => showUploadAlert()} className="py-2 px-4 rounded-lg text-white bg-blue-500 hover:bg-blue-600">
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default GaleryTambah;
