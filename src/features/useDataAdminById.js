import { useEffect, useState } from 'react';
import { axiosBaseUrl } from '../components/lib/axios.js';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const useDataAdminById = () => {
  const token = localStorage.getItem('authToken');

  const [dataAdmin, setDataAdmin] = useState([]);
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

      const idAdmin = response.data.data.userId; // Assuming response.data is an array
      //   console.log(idAdmin)
      fetchDataAdminById(idAdmin);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const fetchDataAdminById = async (id) => {
    // setIsLoading(true);
    try {
      const response = await axiosBaseUrl.get(`admin/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const userById = response.data; // Assuming response.data is an array
      setDataAdmin(userById);
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
    dataAdmin,
    isLoading,
  };
};
