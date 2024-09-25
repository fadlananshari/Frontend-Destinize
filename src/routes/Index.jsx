import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { axiosBaseUrl } from '../components/lib/axios';
import Loading from '../components/pages/Loading';
import LandingPage from '../components/pages/users/LandingPage';
import Login from '../components/pages/Login';
import Admins from '../components/pages/admins/Index';
import NotFound from '../components/pages/NotFound';
import PaketWisata from '../components/pages/admins/PaketWisata';
import PaketWisataById from '../components/pages/admins/PaketWisataById';
import PaketWisataTambah from '../components/pages/admins/PaketWisataTambah';
import Galery from '../components/pages/admins/Galery';
import PaketWisataTambahFoto from '../components/pages/admins/PaketWisataTambahFoto';
import UserPaketWisataById from '../components/pages/users/UserPaketWisataById';
import GaleryTambah from '../components/pages/admins/GaleryTambah';
import UserAllPaketWisata from '../components/pages/users/UserAllPaketWisata';
import LoginUser from '../components/pages/users/LoginUser';
import UserPesanan from '../components/pages/users/UserPesanan';
import UploadBuktiUser from './../components/pages/users/UploadBuktiUser';
import PesananEditUser from '../components/pages/users/PesananEditUser';
import Pesanan from '../components/pages/admins/Pesanan';
import Admin from '../components/pages/admins/Admin';
import AdminTambah from './../components/pages/admins/AdminTambah';
import Kredit from '../components/pages/users/Kredit';

function Routing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // localStorage.setItem('userToken', '');
  // localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMTA4NDU0ODU1MTQ1NzUwOTM0MDAiLCJpYXQiOjE3MjM2MjgwOTEsImV4cCI6MTcyNjIyMDA5MX0.rkT5vd3fFUCZkSfEGRCXo_XByapUxdIwIJkmLHWoQkg');


  useEffect(() => {
    // console.log('useEffect berjalan');
    const token = localStorage.getItem('authToken');
    if (token && token.trim() !== '') {
      // console.log('Token ditemukan:', token);
      adminValidate(token);
    } else {
      // console.log('Token tidak ditemukan atau kosong');
      setIsLoggedIn(false);
      setIsLoadingAdmin(false);
    }
  }, []);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');

    if (userToken && userToken.trim() !== '') {
      userValidate(userToken);
    } else {
      // console.log('Token tidak ditemukan atau kosong');
      setIsUserLoggedIn(false);
      setIsLoadingUser(false);
    }
  }, []);

  const userValidate = async (userToken) => {
    try {
      // console.log('Memvalidasi token:', token);
      const response = await axiosBaseUrl.post('/user/token-check', {
        token: userToken,
      });
      // console.log('Respons validasi:', response);
      setIsUserLoggedIn(response.data.data ? true : false);
      // console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsUserLoggedIn(false);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const adminValidate = async (token) => {
    try {
      // console.log('Memvalidasi token:', token);
      const response = await axiosBaseUrl.post('/admin/token-check', {
        token: token,
      });
      // console.log('Respons validasi:', response);
      setIsLoggedIn(response.data.data ? true : false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoadingAdmin(false);
    }
  };

  if (isLoadingAdmin || isLoadingUser) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="" element={<PublicRoutes isLoggedIn={isLoggedIn} />}>
        <Route path="" element={<LandingPage isUserLoggedIn={isUserLoggedIn} />} />
        <Route path="/paket-wisata" element={<UserAllPaketWisata isUserLoggedIn={isUserLoggedIn} />} />
        <Route path="/paket-wisata/:id" element={<UserPaketWisataById isUserLoggedIn={isUserLoggedIn} />} />
        <Route path="/pesanan" element={<UserPesanan isUserLoggedIn={isUserLoggedIn} />} />
        <Route path="/pesanan/edit/:id" element={<PesananEditUser isUserLoggedIn={isUserLoggedIn} />} />
        <Route path="/pesanan/upload/:id" element={<UploadBuktiUser isUserLoggedIn={isUserLoggedIn} />} />
        <Route path="/kredit" element={<Kredit isUserLoggedIn={isUserLoggedIn} />} />
        <Route path="/login" element={<LoginUser isUserLoggedIn={isUserLoggedIn} />} />
        <Route path="/admin/login" element={<Login isUserLoggedIn={isUserLoggedIn} />} />
      </Route>

      <Route path="" element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
        <Route path="/admin/dashboard" element={<Admins />} />
        <Route path="/admin/paket-wisata" element={<PaketWisata />} />
        <Route path="/admin/paket-wisata/tambah" element={<PaketWisataTambah />} />
        <Route path="/admin/paket-wisata/tambah-foto/:id" element={<PaketWisataTambahFoto />} />
        <Route path="/admin/paket-wisata/:id/review" element={<PaketWisataById />} />
        <Route path="/admin/galeri" element={<Galery />} />
        <Route path="/admin/galeri/tambah/:id" element={<GaleryTambah />} />
        <Route path="/admin/pesanan" element={<Pesanan />} />
        <Route path="/admin/admin" element={<Admin />} />
        {/* <Route path="/admin/admin/tambah" element={<AdminTambah />} /> */}
      </Route>

      <Route path="*" element={<NotFound />} />

      {/* Tambahkan route lain sesuai kebutuhan */}
    </Routes>
  );
}

export default Routing;
