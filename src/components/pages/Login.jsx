import GoogleLogin from './../atoms/GoogleLogin';
import Logo from '../../assets/logo.png';

const LoginUser = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="max-w-md w-full shadow-lg rounded-lg pt-14 pb-10 bg-white">
        <h2 className="text-center text-blue-500 text-4xl mb-5">Admin</h2>

        <div className="mx-5">
          <div className="flex justify-center mb-7 px-16">
            <img src={Logo} alt="Logo" className="" />
          </div>
          <h2 className="text-center text-2xl mb-5">
            Selamat Datang di <span className="text-blue-500">Destinize</span>
          </h2>
          <div className="w-full flex justify-center">
            <GoogleLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
