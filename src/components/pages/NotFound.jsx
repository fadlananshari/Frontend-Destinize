import { PiSmileySad } from "react-icons/pi";
import { Link } from "react-router-dom"; // Jika menggunakan react-router-dom

const NotFound = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-center px-10">
      <PiSmileySad size={170} className=" text-gray-600 mb-4" />
      <h1 className="font-extrabold text-6xl text-gray-600 mb-2">404</h1>
      <h2 className="font-extrabold text-3xl text-gray-600 mb-5">Page Not Found</h2>
      <p className="text-gray-600 mb-4 font-semibold">
        Halaman yang Anda cari tidak ditemukan. Mungkin ada kesalahan dalam URL yang Anda masukkan.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Kembali ke halaman utama
      </Link>
    </div>
  );
};

export default NotFound;
