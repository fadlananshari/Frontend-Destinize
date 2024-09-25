import { useEffect, useState } from 'react';
import { axiosBaseUrl } from '../components/lib/axios.js';

export const useDataPaketWisataById = (id) => {
  const [dataPaketWisataById, setDataPaketWisataById] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPaketWisataById = async (id) => {
    // setIsLoading(true);
    try {
      const response = await axiosBaseUrl.get(`paket-wisata/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const data = response.data;
      // console.log(data);
      setDataPaketWisataById(data);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaketWisataById(id);
  }, []);

  return {
    dataPaketWisataById,
    isLoading,
  };
};
