import { useEffect, useState } from 'react';
import { axiosBaseUrl } from '../components/lib/axios.js';

export const useDataGaleriByIdPaket = (id) => {
  const [dataGaleriByIdPaket, setDataGaleriByIdPaket] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGaleriByIdPaket = async (id) => {
    // setIsLoading(true);
    try {
      const response = await axiosBaseUrl.get(`galeri/${id}/id-paket`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const data = response.data;
      // console.log(data);
      setDataGaleriByIdPaket(data);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGaleriByIdPaket(id);
  }, []);

  return {
    dataGaleriByIdPaket,
    isLoading,
  };
};
