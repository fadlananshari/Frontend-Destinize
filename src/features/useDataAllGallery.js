import { useEffect, useState } from 'react';
import { axiosBaseUrl } from '../components/lib/axios.js';

export const useDataAllGallery = () => {
  const [dataGallery, setDataGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllGallery = async () => {
    // setIsLoading(true);
    try {
      const response = await axiosBaseUrl.get(`galeri`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const data = response.data;
      // console.log(data);
      setDataGallery(data);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllGallery();
  }, []);

  return {
    dataGallery,
    isLoading,
  };
};
