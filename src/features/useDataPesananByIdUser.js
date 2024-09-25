import { useEffect, useState } from 'react';
import { axiosBaseUrl } from '../components/lib/axios.js';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const useDataPesananByIdUser = () => {
  const token = localStorage.getItem('userToken');

  const [dataPesanan, setDataPesanan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //   const history = useHistory();

  const decodeToken = async (token) => {
    // setIsLoading(true);
    try {
      const response = await axiosBaseUrl.get(`decode-token/${token}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const idUser = response.data.data.userId; // Assuming response.data is an array
      //   console.log(idUser)
      fetchDataPesananByIdUser(idUser);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const fetchDataPesananByIdUser = async (id) => {
    // setIsLoading(true);
    try {
      const response = await axiosBaseUrl.get(`reservasi/user/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const pesanan = response.data; // Assuming response.data is an array
    //   console.log(pesanan)
      setDataPesanan(pesanan);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Ensure isLoading is set to false in case of error
      //   history.push('/online-kronologis');
    }
  };

  useEffect(() => {
    decodeToken(token);
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return {
    dataPesanan,
    isLoading,
  };
};
