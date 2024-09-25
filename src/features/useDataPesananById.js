import { useEffect, useState } from 'react';
import { axiosBaseUrl } from '../components/lib/axios';

export const useDataPesananById = (id) => {
  const [dataPesanan, setDataPesanan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchDataPesananById = async (id) => {
    // setIsLoading(true);
    try {
      const response = await axiosBaseUrl.get(`reservasi/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const pesanan = response.data; // Assuming response.data is an array
        // console.log(pesanan)
      setDataPesanan(pesanan);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Ensure isLoading is set to false in case of error
      //   history.push('/online-kronologis');
    }
  };

  useEffect(() => {
    fetchDataPesananById(id);
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return {
    dataPesanan,
    isLoading,
  };
};
