import { useEffect, useState } from 'react';
import { axiosBaseUrl } from '../components/lib/axios.js';

export const useDataAllPesanan = () => {
  const [dataPesanan, setDataPesanan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllPesanan = async () => {
    // setIsLoading(true);
    try {
      const response = await axiosBaseUrl.get(`reservasi`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const data = response.data;
      // console.log(data);
      setDataPesanan(data);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPesanan();
  }, []);

  return {
    dataPesanan,
    isLoading,
  };
};
