import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';

const GoogleTambahAdmin = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        await axios.post('https://destinize-api-04aae1968d23.herokuapp.com/api/v1/admin', {
          name: userInfo.data.name,
          id: userInfo.data.sub,
          email: userInfo.data.email,
          profile_pic: userInfo.data.picture,
          verified_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        });

        // const token = dataLogin.data.data;
        // localStorage.setItem('authToken', token);
        window.location.reload();
      } catch (error) {
        console.error('Error during login process:', error);
        showAlert();
      }
    },
    onError: (errorResponse) => {
      console.error('Tambah Admin error:', errorResponse);
      showAlert();
    },
  });

  const showAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Gagal Menambahkan Admin',
      customClass: {
        confirmButton: 'bg-red-400 hover:bg-red-500',
      },
    });
  };

  return (
    <button className="bg-white text-base rounded-md border-2 border-slate-200 hover:bg-slate-50 flex gap-2 px-4 py-2" onClick={() => googleLogin()}>
      <FcGoogle className="my-auto text-xl" />
      Tambah
    </button>
  );
};

export default GoogleTambahAdmin;
