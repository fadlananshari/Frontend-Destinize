import { useEffect, useState } from 'react';
import { axiosBaseUrl } from '../components/lib/axios.js';

export const useDataAllAdmins = () => {
  const [dataAdmins, setDataAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllAdmins = async () => {
    // setIsLoading(true);
    try {
      const response = await axiosBaseUrl.get(`admins`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const data = response.data;
      // console.log(data);
      setDataAdmins(data);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAdmins();
  }, []);

  return {
    dataAdmins,
    isLoading,
  };
};
