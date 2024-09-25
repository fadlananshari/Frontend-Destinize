import { useMutation, useQueryClient } from 'react-query';
import { axiosBaseUrl } from './../components/lib/axios';

export const useDataCreateReservasiByIdPaket = () => {
  const queryClient = useQueryClient();

  const decodeToken = async (token) => {
    try {
      const response = await axiosBaseUrl.get(`decode-token/${token}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const idUser = response.data.data.userId;
      return idUser;
    } catch (error) {
      console.error('Error decoding token:', error);
      throw error; // Lempar error agar dapat di-handle oleh onError pada useMutation
    }
  };
  const token = localStorage.getItem('userToken');
  const mutation = useMutation(
    async ({ id_paket, body }) => {
      const idUser = await decodeToken(token); // Dekode token terlebih dahulu
      const response = await axiosBaseUrl.post(`reservasi/${idUser}/${id_paket}`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('dataReservasiByIdPaket');
      },
      onError: (error) => {
        console.error('Error creating reservation:', error);
      },
    }
  );

  return mutation;
};
