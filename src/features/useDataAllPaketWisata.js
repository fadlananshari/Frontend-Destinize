import { useEffect, useState } from 'react';
import { axiosBaseUrl } from '../components/lib/axios.js';

export const useDataAllPaketWisata = () => {
  const [dataPaketWisata, setDataPaketWisata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllPaketWisata = async () => {
    // setIsLoading(true);
    try {
      const response = await axiosBaseUrl.get(`paket-wisata`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const data = response.data;
      // console.log(data);
      setDataPaketWisata(data);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPaketWisata();
  }, []);

  return {
    dataPaketWisata,
    isLoading,
  };
};
